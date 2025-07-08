import { useRef, useEffect, useState } from "react";
import "../style/Animate.css";
import ActiveBtn from "./ActiveBtn";

const MAX_SHIFT = 30; // максимальное смещение в px

const Animate = ({ revealSite, hideIntro }) => {
  const videoRef = useRef(null);
  const [slide, setSlide] = useState(false);
  const revealed = useRef(false);
  const [showBtn, setShowBtn] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  /* ---------- запуск видео ---------- */
  const handleClick = () => {
    const video = videoRef.current;
    if (video) {
      video.play();
      setShowBtn(false);
      setIsPlaying(true);
    }
  };

  /* ---------- курсорный параллакс ---------- */
  useEffect(() => {
    if (!isPlaying) return;

    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      // нормируем координаты: -1 .. 1
      const normX = (e.clientX - innerWidth / 2) / (innerWidth / 2);
      const normY = (e.clientY - innerHeight / 2) / (innerHeight / 2);
      setOffset({
        x: normX * MAX_SHIFT,
        y: normY * MAX_SHIFT,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isPlaying]);

  /* ---------- «показать сайт» за 2 с до конца ---------- */
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      if (!revealed.current && video.duration - video.currentTime <= 2) {
        revealed.current = true;
        revealSite();
      }
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    return () => video.removeEventListener("timeupdate", handleTimeUpdate);
  }, [revealSite]);

  /* ---------- конец видео → шторка уезжает ---------- */
  const handleEnded = () => {
    setSlide(true);
    setIsPlaying(false); // чтобы убрать обработчик мыши
  };

  /* ---------- размонтируем интро после анимации уезда ---------- */
  useEffect(() => {
    if (!slide) return;
    const timer = setTimeout(() => hideIntro(), 800);
    return () => clearTimeout(timer);
  }, [slide, hideIntro]);

  return (
    <div
      className={`animate-video ${slide ? "slide-down" : ""}`}
      onClick={handleClick}
    >
      <video
        ref={videoRef}
        className="fullscreen-video"
        src="/video/Key.mp4"
        muted
        playsInline
        onEnded={handleEnded}
        /* применяем смещение + лёгкое увеличение, чтобы края не были видны */
        style={{
          transform: `translate(${offset.x}px, ${offset.y}px) scale(1.05)`,
          transition: "transform 0.1s linear", // быстро, но без дёрганий
        }}
      />
      {showBtn && <ActiveBtn />}
    </div>
  );
};

export default Animate;
