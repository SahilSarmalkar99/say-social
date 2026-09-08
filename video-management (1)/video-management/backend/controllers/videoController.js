import MainVideo from '../models/MainVideo.js';
import CarouselVideo from '../models/CarouselVideo.js';

const isValidHttpUrl = (value) => {
  try {
    const url = new URL(value);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
};

export async function getMainVideo(req, res) {
  try {
    const video = await MainVideo.findOne({ isActive: true }).sort({ updatedAt: -1 });
    res.json({ video });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch main video', error: error.message });
  }
}

export async function upsertMainVideo(req, res) {
  try {
    const { videoUrl, thumbnailUrl = '' } = req.body;

    if (!videoUrl || !isValidHttpUrl(videoUrl)) {
      return res.status(400).json({ message: 'A valid HTTP/HTTPS main video URL is required' });
    }

    if (thumbnailUrl && !isValidHttpUrl(thumbnailUrl)) {
      return res.status(400).json({ message: 'Thumbnail URL must be a valid HTTP/HTTPS URL' });
    }

    await MainVideo.updateMany({}, { isActive: false });
    const video = await MainVideo.create({ videoUrl, thumbnailUrl, isActive: true });

    res.status(201).json({ message: 'Main video updated successfully', video });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update main video', error: error.message });
  }
}

export async function getCarouselVideos(req, res) {
  try {
    const filter = req.query.admin === 'true' ? {} : { isActive: true };
    const videos = await CarouselVideo.find(filter).sort({ order: 1, createdAt: 1 });
    res.json({ videos });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch carousel videos', error: error.message });
  }
}

export async function createCarouselVideo(req, res) {
  try {
    const {
      title,
      description = '',
      videoUrl,
      thumbnailUrl = '',
      order,
      isActive = true,
    } = req.body;

    if (!title?.trim()) return res.status(400).json({ message: 'Title is required' });
    if (!videoUrl || !isValidHttpUrl(videoUrl)) {
      return res.status(400).json({ message: 'A valid HTTP/HTTPS video URL is required' });
    }
    if (thumbnailUrl && !isValidHttpUrl(thumbnailUrl)) {
      return res.status(400).json({ message: 'Thumbnail URL must be a valid HTTP/HTTPS URL' });
    }

    const last = await CarouselVideo.findOne().sort({ order: -1 });
    const parsedOrder = Number(order);

    const video = await CarouselVideo.create({
      title: title.trim(),
      description: description.trim(),
      videoUrl,
      thumbnailUrl,
      order: Number.isFinite(parsedOrder) ? parsedOrder : ((last?.order ?? -1) + 1),
      isActive: isActive === true || isActive === 'true',
    });

    res.status(201).json({ message: 'Carousel video added successfully', video });
  } catch (error) {
    res.status(500).json({ message: 'Failed to add carousel video', error: error.message });
  }
}

export async function updateCarouselVideo(req, res) {
  try {
    const video = await CarouselVideo.findById(req.params.id);
    if (!video) return res.status(404).json({ message: 'Video not found' });

    if (req.body.title !== undefined) {
      if (!req.body.title.trim()) return res.status(400).json({ message: 'Title cannot be empty' });
      video.title = req.body.title.trim();
    }
    if (req.body.description !== undefined) video.description = req.body.description.trim();
    if (req.body.thumbnailUrl !== undefined) {
      if (req.body.thumbnailUrl && !isValidHttpUrl(req.body.thumbnailUrl)) {
        return res.status(400).json({ message: 'Thumbnail URL must be a valid HTTP/HTTPS URL' });
      }
      video.thumbnailUrl = req.body.thumbnailUrl;
    }
    if (req.body.videoUrl !== undefined) {
      if (!isValidHttpUrl(req.body.videoUrl)) {
        return res.status(400).json({ message: 'Video URL must be a valid HTTP/HTTPS URL' });
      }
      video.videoUrl = req.body.videoUrl;
    }
    if (req.body.order !== undefined) {
      const parsedOrder = Number(req.body.order);
      if (!Number.isFinite(parsedOrder)) return res.status(400).json({ message: 'Order must be a number' });
      video.order = parsedOrder;
    }
    if (req.body.isActive !== undefined) {
      video.isActive = req.body.isActive === true || req.body.isActive === 'true';
    }

    await video.save();
    res.json({ message: 'Carousel video updated successfully', video });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update carousel video', error: error.message });
  }
}

export async function deleteCarouselVideo(req, res) {
  try {
    const video = await CarouselVideo.findByIdAndDelete(req.params.id);
    if (!video) return res.status(404).json({ message: 'Video not found' });
    res.json({ message: 'Carousel video deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete carousel video', error: error.message });
  }
}

export async function setCarouselStatus(req, res) {
  try {
    const isActive = req.body.isActive === true || req.body.isActive === 'true';
    const video = await CarouselVideo.findByIdAndUpdate(req.params.id, { isActive }, { new: true });
    if (!video) return res.status(404).json({ message: 'Video not found' });
    res.json({ message: 'Status updated successfully', video });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update status', error: error.message });
  }
}

export async function reorderCarousel(req, res) {
  try {
    const { items } = req.body;
    if (!Array.isArray(items)) return res.status(400).json({ message: 'items must be an array' });

    await Promise.all(
      items.map((item, index) => CarouselVideo.findByIdAndUpdate(item.id, { order: index }))
    );

    res.json({ message: 'Carousel order updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to reorder carousel', error: error.message });
  }
}
