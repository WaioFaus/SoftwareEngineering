"use client";

import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";

const font = Poppins({
  weight: ["400", "600"],
  subsets: ["latin"],
});
const SectionHeader = ({ data }: { data: string }) => {
  return (
    <div className=" flex items-center">
      <div className=" w-[20px] h-[40px] rounded-lg bg-[#DB4444] "></div>
      <p
        className={cn(
          "text-[#DB4444] text-base font-medium pl-[16px]",
          font.className,
        )}
      >
        {data}
      </p>
    </div>
  );
};
export default SectionHeader;
