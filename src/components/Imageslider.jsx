import { useState } from "react";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";
import Imagedata from "./Imagedata";

function Imageslider() {
  const [current, setCurrent] = useState(0);
  const length = Imagedata.length;

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const goToSlide = (index) => {
    setCurrent(index);
  };

  return (
    <div className="relative max-w- mx-auto mt-10 rounded-2xl shadow-2xl overflow-hidden group">
      {/* Image with overlay */}
      <div className="relative">
        <img
          src={Imagedata[current].image}
          alt={`Slide ${current + 1}`}
          className={`h-[350px] object-cover transition-all duration-700 ease-in-out scale-100 group-hover:scale-105 ${current === 0 ? "w-fit" : "w-full"}`}
        />
        {/* Overlay gradient for text or logo if needed */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent pointer-events-none" />
      </div>

      {/* Left Arrow */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 -translate-y-1/2 text-4xl text-white bg-black/40 hover:bg-blue-600/80 shadow-lg rounded-full p-2 transition z-10"
        aria-label="Previous Slide"
      >
        <BsArrowLeftCircleFill />
      </button>

      {/* Right Arrow */}
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 -translate-y-1/2 text-4xl text-white bg-black/40 hover:bg-blue-600/80 shadow-lg rounded-full p-2 transition z-10"
        aria-label="Next Slide"
      >
        <BsArrowRightCircleFill />
      </button>

      {/* Slide indicators */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex space-x-3 z-10">
        {Imagedata.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-4 h-4 rounded-full border-2 border-white shadow ${
              current === index
                ? "bg-yellow-400 border-yellow-400 scale-110"
                : "bg-white/40 hover:bg-yellow-200"
            } transition`}
            aria-label={`Go to slide ${index + 1}`}
          ></button>
        ))}
      </div>
    </div>
  );
}

export default Imageslider;