"use client";
import { Billboard, Product } from "@/type";

interface Billboards {
  slide: Billboard[];
}

const Ads: React.FC<Billboards> = ({ slide }) => {
  const random = Math.floor(Math.random() * slide.length);
  return (
    <div className="w-[900px] h-[550px] bg-center bg-cover duration-500"
    style={{ backgroundImage: `url(${slide[random].imageUrl})` }}>
    </div>
  );
};

export default Ads;
