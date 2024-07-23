import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

export default function CategoriesNavbar({ categories, selectedCategory }) {
  const [isRight, setIsRight] = useState(true);
  const [isLeft, setIsLeft] = useState(false);
  const containerRef = useRef(null);
//   console.log(categories);

  const handleScroll = (e) => {
    const container = e.target;

    if (
      Math.ceil(container.scrollLeft) >=
      container.scrollWidth - container.clientWidth
    ) {
      setIsRight(false);
    } else {
      setIsRight(true);
    }

    if (container.scrollLeft === 0) {
      setIsLeft(false);
    } else {
      setIsLeft(true);
    }
  };

  const handleRight = () => {
    const container = containerRef.current;
    const scrollLeft = container.scrollLeft;

    container.scrollTo({
      left: scrollLeft + 400,
      behavior: "smooth",
    });
  };

  const handleLeft = () => {
    const container = containerRef.current;
    const scrollLeft = container.scrollLeft;

    container.scrollTo({
      left: scrollLeft - 400,
      behavior: "smooth",
    });
  };


  useEffect(() => {
    let ignore = false;
    const container = containerRef.current;
    if (container.scrollWidth === container.clientWidth) {
      !ignore && setIsRight(false);
    } else {
      !ignore && setIsRight(true);
    }
    return () => {
      ignore = true;
    };
  }, [categories]);

  return (
    <div className="relative mx-auto categories-nav w-100 md:w-[90%] capitalize">
      <ul
        ref={containerRef}
        className="flex border-b-[2px] border-black/25 text-center items-center mx-10 overflow-y-hidden my-5 pb-3 text-nowrap"
        onScroll={handleScroll}
      >
        {categories?.map((category, index) => (
          <li key={index} className="mr-10 text-lg text-black mb-2">
            <Link
              to={`?category=${category}`}
              className={`${
                selectedCategory === category && "font-extrabold"
              }`}
            >
              {category}
            </Link>
          </li>
        ))}
      </ul>
      <span
        className="absolute text-2xl top-0 right-0 -translate-y-1/4 pr-2 h-full flex items-center bg-transparent px-5 cursor-pointer"
        onClick={handleRight}
      >
        {isRight && ">"}
      </span>
      <span
        className="absolute text-2xl -translate-y-1/4 top-0 left-0 pl-2 h-full flex items-center cursor-pointer"
        onClick={handleLeft}
      >
        {isLeft && "<"}
      </span>
    </div>
  );
}