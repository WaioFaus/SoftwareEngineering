"use client";
import { Button } from "@/components/ui/button";

import ProductCard from "./ui/product-card";
import { Product } from "@/type";

interface products {
    data: Product[];
  }

  const RecentlyAddedSection: React.FC<products> = ({ data }) => {
    const sortedData = data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    const recentlyAddedProducts = sortedData.slice(0, 4);

    return (
      <div className="flex-col mt-[140px] mx-[100px]">
        <div className="flex justify-between  items-center pt-5">
          <p className="text-3xl">Recently added</p>
          <Button className="bg-[#DB4444] w-[159px] h-[56px] ">View All</Button>
        </div>
        <div className="flex justify-between  mt-[60px]">
          {recentlyAddedProducts.map((item) => (
            <ProductCard key={item.id} data={item} />
          ))}
        </div>
      </div>
    );
  };

  export default RecentlyAddedSection;