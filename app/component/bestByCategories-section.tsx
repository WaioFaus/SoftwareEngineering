"use client";
import { Button } from "@/components/ui/button";
import SectionHeader from "./section_header";

import ProductCard from "./ui/product-card";
import { Product } from "@/type";

interface products {
  data: Product[];
}

const FeaturedSection: React.FC<products> = ({ data }) => {
  return (
    <div className="flex-col mt-[140px] mx-[100px]">
      {/* ... (existing code) */}
      <div className="flex justify-between  mt-[60px]">
        {data.map((item) => (
          <ProductCard key={item.id} data={item} />
        ))}
      </div>
    </div>
  );
};
export default FeaturedSection;
