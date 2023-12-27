"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import SectionHeader from "./section_header";
import getCategories from "@/actions/get-categories";
import Link from "next/link";
import { Category } from "@/type";

interface categories {
  data: Category[];
}

const CategoryList: React.FC<categories> = ({ data }) => {
  return (
    <div className="flex-col ml-[100px] border-r-black/300 border-r-[1px] b w-[300px] text-2xl text-black">
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
