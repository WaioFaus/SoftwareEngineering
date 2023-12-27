"use client";
import { Billboard, Product } from "@/type";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeftIcon,
  Divide,
} from "lucide-react";
import { SetStateAction, useState } from "react";

interface Billboards {
  slide: Billboard[];
}

const Ads: React.FC<Billboards> = ({ slide }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slide.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === slide.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    console.log(currentIndex);
    setCurrentIndex(newIndex);
  };
  const goToSlide = (slideIndex: SetStateAction<number>) => {
    setCurrentIndex(slideIndex);
  };

  return (
    <div className="w-[1200px] h-[600px]  mr-[100px] relative group">
      <div
        style={{ backgroundImage: `url(${slide[currentIndex].imageUrl})` }}
        className="w-full h-full  bg-center bg-cover duration-500"
      ></div>
    </div>
  );
};

export default Ads;
