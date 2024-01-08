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
    <div className="w-[800px] h-[600px] bg-center bg-cover duration-500"
    style={{ backgroundImage: `url(${slide[random].imageUrl})` }}>
    </div>
  );
};

export default Ads;
