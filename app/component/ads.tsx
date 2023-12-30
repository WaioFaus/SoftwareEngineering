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
  const random = Math.floor(Math.random() * slide.length);
  return (
    <div className="w-[1200px] h-[600px]  mr-[100px] relative group">
      <div
        style={{ backgroundImage: `url(${slide[random].imageUrl})` }}
        className="w-full h-full  bg-center bg-cover duration-500"
      ></div>
    </div>
  );
};

export default Ads;
