import { useEffect, useRef, useState } from "react";

export default function CategoryMedia({ category, nextVideo, prevVideo }) {
  const [displayedSrc, setDisplayedSrc] = useState(null);
  const [opacity, setOpacity] = useState(1);
  const timeoutRef = useRef(null);
  const [imageOpacity, setImageOpacity] = useState(1);

  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);

  const nextSrc = isDesktop ? category.video_desktop : category.video_mobile;
  const fallbackImage = category.poster || category.image;
  
  const preloadRef = useRef([]);

    // preload videoer
   useEffect(() => {
  const preload = (src) => {
    if (!src) return;

    const video = document.createElement("video");
    video.src = src;
    video.preload = "auto";

    preloadRef.current.push(video);
  };

  preloadRef.current = []; // reset

  preload(nextVideo);
  preload(prevVideo);
}, [nextVideo, prevVideo]); 

    // Resize useffect
    useEffect(() => {
  const onResize = () => setIsDesktop(window.innerWidth >= 768);
  window.addEventListener("resize", onResize);
  return () => window.removeEventListener("resize", onResize);
}, []);

    useEffect(() => {
    setImageOpacity(0);

    const t = setTimeout(() => {
        setImageOpacity(1);
    }, 50);

    return () => clearTimeout(t);
    }, [fallbackImage]);

  useEffect(() => {
    // Ryd igangværende timeout
    clearTimeout(timeoutRef.current);

    if (!nextSrc) {
      // Ingen video, bare vis fallback billede uden fade-logik
      setDisplayedSrc(null);
      setOpacity(1);
      return;
    }

    if (nextSrc === displayedSrc) return; // Samme src 

    // Fade ud
    setOpacity(0);

    // Skift src midt i fade, fade ind igen
    timeoutRef.current = setTimeout(() => {
      setDisplayedSrc(nextSrc);
      setOpacity(1);
    }, 250); // matcher transition-duration

    return () => clearTimeout(timeoutRef.current);
  }, [nextSrc]);

  return (
    <div className="sticky top-0 h-[80vh] w-full overflow-hidden rounded-[5px] bg-black">

      {/* Fallback billede — altid synligt i baggrunden */}
      <img
        src={fallbackImage}
        alt={category.name}
        className="absolute inset-0 w-full h-full object-cover"
        style={{
            opacity: imageOpacity,
            transition: "opacity 300ms ease-in-out",
        }}
        />

      {/* Video — ingen key-prop, så react ikke remounter den */}
      {displayedSrc && (
        <video
          src={displayedSrc}
          autoPlay
          muted
          preload="auto"
          loop
          playsInline
          style={{
            opacity,
            transition: "opacity 250ms ease-in-out",
          }}
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}

      <div className="absolute inset-0 bg-black/20" />
    </div>
  );
}