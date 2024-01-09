"use client";
import Link from "next/link";
import { Category } from "@/type";

interface categories {
  data: Category[];
}

const CategoryList: React.FC<categories> = ({ data }) => {
  return (
    <div className="flex-col border-r-black/300 border-r-[1px]  w-[300px] text-2xl  bg-black text-white p-10">
      {data.map((category) => {
        return (
          <Link href={`/category/${category.id}`} key={category.id}>
            <div key={category.id} className="my-10">
              {category.name}
            </div>
          </Link>
        );
      })}
    </div>
  );
};
export default CategoryList;
