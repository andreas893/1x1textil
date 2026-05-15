import { useEffect, useRef, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import supabase from "../lib/Supabase";
import CategoryMedia from "./CategoryMedia";
import ProgressRing from "./ProgressRing";

function CategorySection() {
  const [categories, setCategories] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);
  const [progress, setProgress] = useState(0);

  const lastIndex = useRef(0);
  const refs = useRef([]);
  const { nextVideo, prevVideo } = useMemo(() => {
  if (!categories.length) return {};

  const nextIndex = (activeIndex + 1) % categories.length;
  const prevIndex =
    (activeIndex - 1 + categories.length) % categories.length;

  return {
    nextVideo: isDesktop
      ? categories[nextIndex]?.video_desktop
      : categories[nextIndex]?.video_mobile,
    prevVideo: isDesktop
      ? categories[prevIndex]?.video_desktop
      : categories[prevIndex]?.video_mobile,
  };
}, [activeIndex, categories]);

  // Fetch
  useEffect(() => {
    const fetchCategories = async () => {
      const { data } = await supabase
        .from("categories")
        .select("*")
        .is("parent_id", null)
        .order("sort_order", { ascending: true });

      setCategories(data);
    };

    fetchCategories();
  }, []);

    // Useeffect til desktop breakpoint state
  useEffect(() => {
  const onResize = () => setIsDesktop(window.innerWidth >= 1024);
  window.addEventListener("resize", onResize);
  return () => window.removeEventListener("resize", onResize);
  }, []);


  // IntersectionObserver
  useEffect(() => {
  if (!categories.length || isDesktop) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const newIndex = Number(entry.target.dataset.index);
        if (newIndex !== lastIndex.current) {
          lastIndex.current = newIndex;
          setActiveIndex(newIndex);
        }
      });
    },
    {
      // Trigger når toppen af næste sektion krydser 50% ned på skærmen
      rootMargin: "-50% 0px -50% 0px",
      threshold: 0,
    }
  );

  refs.current.forEach((el) => el && observer.observe(el));
  return () => observer.disconnect();
}, [categories, isDesktop]);


    // progress animation til desktop 
    useEffect(() => {
    if (!isDesktop) return;

    setProgress(0);

    const duration = 5000; // 5 sek
    const start = Date.now();

    const interval = setInterval(() => {
      const elapsed = Date.now() - start;
      const p = Math.min(elapsed / duration, 1);
      setProgress(p);

      if (p === 1) {
        setActiveIndex((prev) => (prev + 1) % categories.length);
      }
    }, 16);

    return () => clearInterval(interval);
  }, [activeIndex, isDesktop]);


// SCroll progress til mobil/tablet, samme state
  useEffect(() => {
  if (isDesktop) return;

 const handleScroll = () => {
  const scrollY = window.scrollY;
  const viewportHeight = window.innerHeight;

  const containerTop = refs.current[0]?.offsetParent?.offsetTop || 0;

  const relativeScroll = scrollY - containerTop;

  const sectionHeight = viewportHeight; // vi definerer det selv

  const start = activeIndex * sectionHeight;
  const end = (activeIndex + 1) * sectionHeight;

  let p = (relativeScroll - start) / (end - start);

  p = Math.max(0, Math.min(1, p));

  setProgress(p);
};

  window.addEventListener("scroll", handleScroll);
  handleScroll(); // initial

  return () => window.removeEventListener("scroll", handleScroll);
}, [activeIndex, isDesktop]);


  if (!categories.length) return null;

  return (
    <section className="py-16 px-4 border-b md:px-12">
      <div className="relative">

        {/* Scroll container */}
        <div className="relative" 
        style={
          isDesktop
            ? { height: "auto" }
            : { height: `${categories.length * 100}vh` }
        }>

          {/* Sticky panel */}
          <div className={`${isDesktop ? "relative" : "sticky top-10"} flex flex-col gap-4`}>
            <h2 className="text-3xl font-serif">Udforsk vores universer</h2>

            <div className="relative">
              <CategoryMedia
                category={categories[activeIndex]}
                nextVideo={nextVideo}
                prevVideo={prevVideo}
              />

              {/* Overlay med kategoriliste */}
              <div className="absolute inset-0 flex flex-col justify-end p-6 text-white z-10 lg:items-end ">
                <div className="space-y-2 mb-4 lg:w-[30%]">
                  <h2 className="h2 mb-2">Vores kategorier</h2>
                  {categories.map((cat, index) => {
                    const isActive = index === activeIndex;

                    return (
                      <Link
                        key={cat.id}
                        to={`/shop/${cat.slug}`}
                        onMouseEnter={() => setActiveIndex(index)}
                        onClick={() => setActiveIndex(index)}
                        className="group relative flex items-center w-fit"
                      >
                         <ProgressRing
                            progress={progress}
                            isActive={index === activeIndex}
                          />
                        {/* TEXT */}
                        <span
                          className={`
                            transition-all duration-300
                            ${isActive
                              ? "opacity-100 font-semibold translate-x-0"
                              : "opacity-60 translate-x-1"}
                          `}
                        >
                          {cat.name}
                        </span>

                        {/* ARROW */}
                        <ArrowRight
                          size={16}
                          className={`
                            ml-2 transition-all duration-300
                            ${isActive
                              ? "opacity-100 translate-x-1"
                              : "opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-1"}
                          `}
                        />

                        {/* UNDERLINE */}
                        <span
                          className={`
                            absolute left-0 -bottom-1 h-[1px] bg-white transition-all duration-300
                            ${isActive
                              ? "w-full"
                              : "w-0 group-hover:w-full"}
                          `}
                        />
                      </Link>
                    );
                  })}
                </div>

                <div className="flex items-center border-t border-white/80 pt-4 lg:w-[30%]">
                  <Link
                    to="/shop"
                    className="font-sans text-lg w-full flex items-center justify-between"
                  >
                    Shop alt <ArrowRight />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Scroll triggers, skjult på desktop */}
          {!isDesktop && (
            <div className="absolute inset-0 pointer-events-none">
              {categories.map((_, index) => (
                <div
                  key={index}
                  data-index={index}
                  ref={(el) => (refs.current[index] = el)}
                  style={{ height: `${100 / categories.length}%` }}
                  // Proportional højde i stedet for h-screen
                  // Hver trigger fylder præcis sin andel af containeren
                />
              ))}
            </div>
          )}

        </div>
      </div>
    </section>
  );
}

export default CategorySection;