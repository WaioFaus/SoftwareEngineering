"use client";
import { Button } from "@/components/ui/button";
import SectionHeader from "./section_header";

import getProducts from "@/actions/get-products";
import ProductCard from "./ui/product-card";
import { Product } from "@/type";

interface products {
  data: Product[];
}

const ThisMonthSection: React.FC<products> = ({ data }) => {
  return (
    <div className="flex-col mt-[140px] mx-[100px]">
      <SectionHeader data="This Month" />
      <div className="flex justify-between  items-center pt-5">
        <p className="text-3xl">Best selling products</p>
        <Button className="bg-[#DB4444] w-[159px] h-[56px] ">View All</Button>
      </div>
      <div className="flex justify-between  mt-[60px]">
        {data.map((item) => (
          <ProductCard data={item} />
        ))}
      </div>
    </div>
  );
};
export default ThisMonthSection;
