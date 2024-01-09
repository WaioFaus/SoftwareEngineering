"use client";
import { Button } from "@/components/ui/button";
import SectionHeader from "./section_header";

import ProductCard from "./ui/product-card";
import { Product } from "@/type";

interface products {
  data: Product[];
}

const FeaturedSection: React.FC<products> = ({ data }) => {
  const limitedData = data.slice(0, 5);
  return (
    <div className="flex-col mt-[40px] mx-[100px]">
      <SectionHeader data="Featured" />
      <div className="flex justify-between  items-center pt-5">
        <p className="text-3xl">Best selling products</p>
      </div>
      <div className="flex justify-between  mt-[40px]">
        {limitedData.map((item) => (
          <ProductCard data={item} />
        ))}
      </div>
    </div>
  );
};
export default FeaturedSection;
