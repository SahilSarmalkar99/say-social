import { useEffect, useRef, useState } from "react";

import PortfolioAPI from "../../api/portfolio.api";

import CategoryTabs from "./CategoryTabs";
import SubCategoryTabs from "./SubCategoryTabs";
import WorkGrid from "./WorkGrid";

export default function WorkShowcase() {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);

  const [category, setCategory] = useState({
    _id: "all",
    name: "All",
  });

  const [subCategory, setSubCategory] = useState({
    _id: "all",
    name: "All",
  });

  /*
   * ------------------------------------------------------
   * AUDIO STATE
   * ------------------------------------------------------
   */

  // ID of the video that currently owns the audio
  const [activeVideoId, setActiveVideoId] = useState(null);

  // Store video DOM elements
  const videoRefs = useRef({});

  /*
   * ------------------------------------------------------
   * LOAD PORTFOLIO
   * ------------------------------------------------------
   */

  useEffect(() => {
    loadPortfolio();
  }, []);

  async function loadPortfolio() {
    try {
      setLoading(true);

      const res = await PortfolioAPI.getAll();

      setItems(res.data.data || []);
    } catch (err) {
      console.error("Failed to load portfolio:", err);
      setItems([]);
    } finally {
      setLoading(false);
    }
  }

  /*
   * ------------------------------------------------------
   * REGISTER VIDEO
   *
   * WorkGrid will call this for every video.
   * ------------------------------------------------------
   */

  const registerVideo = (id, video) => {
    if (video) {
      videoRefs.current[id] = video;
    } else {
      delete videoRefs.current[id];
    }
  };

  /*
   * ------------------------------------------------------
   * ACTIVATE VIDEO AUDIO
   *
   * Clicking a video makes it the only video with audio.
   *
   * IMPORTANT:
   * We DON'T pause the video.
   * We only change its muted state.
   * ------------------------------------------------------
   */

  const activateVideo = (id) => {
    const clickedVideo = videoRefs.current[id];

    if (!clickedVideo) return;

    /*
     * Mute every other video
     */

    Object.entries(videoRefs.current).forEach(
      ([videoId, video]) => {
        if (!video) return;

        if (String(videoId) !== String(id)) {
          video.muted = true;
        }
      }
    );

    /*
     * Activate clicked video
     */

    clickedVideo.muted = false;

    setActiveVideoId(id);
  };

  /*
   * ------------------------------------------------------
   * STOP AUDIO
   *
   * IMPORTANT:
   * Video keeps playing.
   * Only audio is stopped.
   * ------------------------------------------------------
   */

  const stopAudio = () => {
    Object.values(videoRefs.current).forEach((video) => {
      if (!video) return;

      video.muted = true;
    });

    setActiveVideoId(null);
  };

  /*
   * ------------------------------------------------------
   * CLICK OUTSIDE VIDEO
   *
   * If user clicks anywhere outside a video,
   * audio stops but video continues playing.
   * ------------------------------------------------------
   */

  useEffect(() => {
    const handleOutsideClick = (event) => {
      const clickedInsideVideo = event.target.closest(
        "[data-portfolio-video]"
      );

      if (!clickedInsideVideo) {
        stopAudio();
      }
    };

    document.addEventListener(
      "click",
      handleOutsideClick
    );

    return () => {
      document.removeEventListener(
        "click",
        handleOutsideClick
      );
    };
  }, []);

  /*
   * ------------------------------------------------------
   * CATEGORY CHANGE
   *
   * Stop current audio when changing category.
   * ------------------------------------------------------
   */

  const handleCategoryChange = (cat) => {
    stopAudio();

    setCategory(cat);

    setSubCategory({
      _id: "all",
      name: "All",
    });
  };

  /*
   * ------------------------------------------------------
   * SUB CATEGORY CHANGE
   * ------------------------------------------------------
   */

  const handleSubCategoryChange = (subCat) => {
    stopAudio();

    setSubCategory(subCat);
  };

  /*
   * ------------------------------------------------------
   * FILTER
   * ------------------------------------------------------
   */

  const filteredItems = items.filter((item) => {
    const categoryId =
      typeof item.category === "object"
        ? item.category?._id
        : item.category;

    const subCategoryId =
      typeof item.subCategory === "object"
        ? item.subCategory?._id
        : item.subCategory;

    const categoryMatch =
      category._id === "all" ||
      categoryId === category._id;

    const subCategoryMatch =
      subCategory._id === "all" ||
      subCategoryId === subCategory._id;

    return categoryMatch && subCategoryMatch;
  });

  /*
   * ------------------------------------------------------
   * RENDER
   * ------------------------------------------------------
   */

  return (
    <section className="w-full overflow-hidden py-20 md:py-28">
      {/* CATEGORY */}

      <CategoryTabs
        value={category}
        onChange={handleCategoryChange}
      />

      {/* SUB CATEGORY */}

      <SubCategoryTabs
        category={category}
        value={subCategory}
        onChange={handleSubCategoryChange}
      />

      {/* WORK GRID */}

      <WorkGrid
        loading={loading}
        items={filteredItems}
        activeVideoId={activeVideoId}
        onVideoActivate={activateVideo}
        onRegisterVideo={registerVideo}
      />
    </section>
  );
}