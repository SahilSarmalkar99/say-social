import MainVideo from "../models/MainVideo.js";
import CarouselVideo from "../models/CarouselVideo.js";

const isValidHttpUrl = (value) => {
  try {
    const url = new URL(value);

    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
};

// =====================================================
// MAIN LANDING VIDEO
// =====================================================

export async function getMainVideo(req, res) {
  try {
    const video = await MainVideo.findOne({
      isActive: true,
    }).sort({
      updatedAt: -1,
    });

    res.json({
      video,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch main video",
      error: error.message,
    });
  }
}

export async function upsertMainVideo(req, res) {
  try {
    const { desktopVideoUrl, mobileVideoUrl, thumbnailUrl = "" } = req.body;

    // ---------------------------------------------
    // Validate desktop video
    // ---------------------------------------------

    if (!desktopVideoUrl || !isValidHttpUrl(desktopVideoUrl)) {
      return res.status(400).json({
        message: "A valid HTTP/HTTPS desktop video URL is required",
      });
    }

    // ---------------------------------------------
    // Validate mobile video
    // ---------------------------------------------

    if (!mobileVideoUrl || !isValidHttpUrl(mobileVideoUrl)) {
      return res.status(400).json({
        message: "A valid HTTP/HTTPS mobile video URL is required",
      });
    }

    // ---------------------------------------------
    // Validate thumbnail
    // ---------------------------------------------

    if (thumbnailUrl && !isValidHttpUrl(thumbnailUrl)) {
      return res.status(400).json({
        message: "Thumbnail URL must be a valid HTTP/HTTPS URL",
      });
    }

    // ---------------------------------------------
    // Disable previous main videos
    // ---------------------------------------------

    await MainVideo.updateMany(
      {},
      {
        isActive: false,
      },
    );

    // ---------------------------------------------
    // Create new main video
    // ---------------------------------------------

    const video = await MainVideo.create({
      desktopVideoUrl,
      mobileVideoUrl,
      thumbnailUrl,
      isActive: true,
    });

    res.status(201).json({
      message: "Main video updated successfully",
      video,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update main video",
      error: error.message,
    });
  }
}

// =====================================================
// CAROUSEL VIDEOS
// =====================================================

export async function getCarouselVideos(req, res) {
  try {
    const filter =
      req.query.admin === "true"
        ? {}
        : {
            isActive: true,
          };

    const videos = await CarouselVideo.find(filter).sort({
      order: 1,
      createdAt: 1,
    });

    res.json({
      videos,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch carousel videos",
      error: error.message,
    });
  }
}

export async function createCarouselVideo(req, res) {
  try {
    const {
      title,
      description = "",
      videoUrl,
      thumbnailUrl = "",
      order,
      isActive = true,
    } = req.body;

    // ---------------------------------------------
    // Validate video URL
    // ---------------------------------------------

    if (!videoUrl || !isValidHttpUrl(videoUrl)) {
      return res.status(400).json({
        message: "A valid HTTP/HTTPS video URL is required",
      });
    }

    // ---------------------------------------------
    // Validate thumbnail
    // ---------------------------------------------

    if (thumbnailUrl && !isValidHttpUrl(thumbnailUrl)) {
      return res.status(400).json({
        message: "Thumbnail URL must be a valid HTTP/HTTPS URL",
      });
    }

    const last = await CarouselVideo.findOne().sort({
      order: -1,
    });

    const parsedOrder = Number(order);

    const video = await CarouselVideo.create({
      title: title.trim(),

      description: description.trim(),

      videoUrl,

      thumbnailUrl,

      order: Number.isFinite(parsedOrder)
        ? parsedOrder
        : (last?.order ?? -1) + 1,

      isActive: isActive === true || isActive === "true",
    });

    res.status(201).json({
      message: "Carousel video added successfully",
      video,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to add carousel video",
      error: error.message,
    });
  }
}

export async function updateCarouselVideo(req, res) {
  try {
    const video = await CarouselVideo.findById(req.params.id);

    if (!video) {
      return res.status(404).json({
        message: "Video not found",
      });
    }

    // ---------------------------------------------
    // Title
    // ---------------------------------------------

    if (req.body.title !== undefined) {
      video.title = req.body.title.trim();
    }

    // ---------------------------------------------
    // Description
    // ---------------------------------------------

    if (req.body.description !== undefined) {
      video.description = req.body.description.trim();
    }

    // ---------------------------------------------
    // Thumbnail
    // ---------------------------------------------

    if (req.body.thumbnailUrl !== undefined) {
      if (req.body.thumbnailUrl && !isValidHttpUrl(req.body.thumbnailUrl)) {
        return res.status(400).json({
          message: "Thumbnail URL must be a valid HTTP/HTTPS URL",
        });
      }

      video.thumbnailUrl = req.body.thumbnailUrl;
    }

    // ---------------------------------------------
    // Video URL
    // ---------------------------------------------

    if (req.body.videoUrl !== undefined) {
      if (!isValidHttpUrl(req.body.videoUrl)) {
        return res.status(400).json({
          message: "Video URL must be a valid HTTP/HTTPS URL",
        });
      }

      video.videoUrl = req.body.videoUrl;
    }

    // ---------------------------------------------
    // Order
    // ---------------------------------------------

    if (req.body.order !== undefined) {
      const parsedOrder = Number(req.body.order);

      if (!Number.isFinite(parsedOrder)) {
        return res.status(400).json({
          message: "Order must be a number",
        });
      }

      video.order = parsedOrder;
    }

    // ---------------------------------------------
    // Active status
    // ---------------------------------------------

    if (req.body.isActive !== undefined) {
      video.isActive =
        req.body.isActive === true || req.body.isActive === "true";
    }

    await video.save();

    res.json({
      message: "Carousel video updated successfully",
      video,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update carousel video",
      error: error.message,
    });
  }
}

export async function deleteCarouselVideo(req, res) {
  try {
    const video = await CarouselVideo.findByIdAndDelete(req.params.id);

    if (!video) {
      return res.status(404).json({
        message: "Video not found",
      });
    }

    res.json({
      message: "Carousel video deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete carousel video",
      error: error.message,
    });
  }
}

export async function setCarouselStatus(req, res) {
  try {
    const isActive = req.body.isActive === true || req.body.isActive === "true";

    const video = await CarouselVideo.findByIdAndUpdate(
      req.params.id,
      {
        isActive,
      },
      {
        new: true,
      },
    );

    if (!video) {
      return res.status(404).json({
        message: "Video not found",
      });
    }

    res.json({
      message: "Status updated successfully",
      video,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update status",
      error: error.message,
    });
  }
}

export async function reorderCarousel(req, res) {
  try {
    const { items } = req.body;

    if (!Array.isArray(items)) {
      return res.status(400).json({
        message: "items must be an array",
      });
    }

    await Promise.all(
      items.map((item, index) =>
        CarouselVideo.findByIdAndUpdate(item.id, {
          order: index,
        }),
      ),
    );

    res.json({
      message: "Carousel order updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to reorder carousel",
      error: error.message,
    });
  }
}
