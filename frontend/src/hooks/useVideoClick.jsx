import { useRef, useState } from "react";

const videoRef = useRef(null);
const [isMuted, setIsMuted] = useState(true);

const useVideoClick = () => {
  const video = videoRef.current;

  if (!video) return;

  video.muted = !video.muted;
  setIsMuted(video.muted);

  if (video.paused) {
    video.play();
  }
};

export default useVideoClick;