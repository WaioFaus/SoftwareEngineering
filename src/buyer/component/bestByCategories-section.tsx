"use client";
import { Button } from "@/components/ui/button";

import ProductCard from "./ui/product-card";
import { Product } from "@/type";

interface products {
  data: Product[];
}

const FeaturedSection: React.FC<products> = ({ data }) => {
  const productsPerCategoryMap: Map<string, Product[]> = new Map();

  data.forEach((item) => {
    const categoryId = item.category.id;
    if (!productsPerCategoryMap.has(categoryId)) {
      productsPerCategoryMap.set(categoryId, [item]);
    } else {
      const existingProducts = productsPerCategoryMap.get(categoryId) || [];
      if (existingProducts.length < 4) {
        existingProducts.push(item);
        productsPerCategoryMap.set(categoryId, existingProducts);
      }
    }
  });

  return (
    <div className="flex-col mt-[140px] mx-[100px]">
      <div className="flex justify-between items-center pt-5">
        <p className="text-3xl">Best products by category</p>
        <Button className="bg-[#DB4444] w-[159px] h-[56px] ">View All</Button>
      </div>
      <div className="flex-col mt-4">
        {Array.from(productsPerCategoryMap).map(([categoryId, products]) => (
          <div key={categoryId} className="mb-8">
            <p className="text-xl font-semibold mb-4">{products[0].category.name}</p>
            <div className="flex justify-between flex-wrap">
              {products.map((item) => (
                <div key={item.id} className="mr-4">
                  <ProductCard data={item} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-between items-center pt-5">
      </div>
    </div>
  );
};

export default FeaturedSection;
