"use client";
import { Button } from "@/components/ui/button";

import ProductCard from "./ui/product-card";
import { Product } from "@/type";
import SectionHeader from "./section_header";

interface products {
    data: Product[];
  }

  const RecentlyAddedSection: React.FC<products> = ({ data }) => {
    const sortedData = data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    const recentlyAddedProducts = sortedData.slice(0, 5);

    return (
      <div className="flex-col my-10 mx-[100px]">
        <SectionHeader data="Newly added" />
        <div className="flex justify-between  items-center pt-5">
          <p className="text-3xl">Recently added</p>
        </div>
        <div className="flex justify-between  mt-[40px]">
          {recentlyAddedProducts.map((item) => (
            <ProductCard key={item.id} data={item} />
          ))}
        </div>
      </div>
    );
  };

  export default RecentlyAddedSection;