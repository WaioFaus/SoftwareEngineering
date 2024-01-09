"use client"
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import ProductCard from "./ui/product-card";
import { Product } from "@/type";
import SectionHeader from "./section_header";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ProductsProps {
  data: Product[];
}

const FeaturedSection: React.FC<ProductsProps> = ({ data }) => {
  const productsPerCategoryMap: Map<string, Product[]> = new Map();
  const [currentPage, setCurrentPage] = useState(0);

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

  const categories = Array.from(productsPerCategoryMap);

  const totalPages = Math.ceil(categories.length / 2);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const startIndex = currentPage * 2;
  const endIndex = startIndex + 2;

  return (
    <div className="flex-col mt-10 mx-[100px]">
      <SectionHeader data="Categories" />
      <div className="flex justify-between items-center pt-5">
        <p className="text-3xl">Best products by category</p>
      </div>

   
      <div className="flex-col mt-4 w-full">
        {categories.slice(startIndex, endIndex).map(([categoryId, products]) => (
          <div key={categoryId} className="mb-8 mt-8">
            <p className="text-xl font-base mb-4">{products[0].category.name}</p>
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
      <div className="flex w-full justify-between">
      <Button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 0}>
          <ChevronLeft/>
        </Button>
      <Button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages - 1}>
          <ChevronRight/>
        </Button>
        </div>
     
   
    </div>
  );
};

export default FeaturedSection;
