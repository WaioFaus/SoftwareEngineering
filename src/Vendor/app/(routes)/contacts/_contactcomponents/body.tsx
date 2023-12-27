"use client";

import { cn } from "@/lib/utils";
import { Mail, PhoneCall, PhoneIcon } from "lucide-react";
import { Poppins } from "next/font/google";
import { ProfileForm } from "./form";

const font = Poppins({
  weight: ["400"],
  subsets: ["latin"],
});

const Body = () => {
  return (
    <div className={cn("h-full flex-col mx-[160px]", font.className)}>
      <p className="text-sm text-black/60  my-[50px]">
        Home<span> </span>
        <span className="text-black"> / Cart</span>
      </p>
      <div className="flex justify-between ">
        <div className="w-[350px] h-[460px] shadow-lg border-[#FFF] p-5 flex-col text-sm space-y-5 justify-between">
          <div className="flex items-center space-x-2 ">
            <div className="w-[40px] h-[40px] border rounded-3xl bg-[#DB4444] flex items-center justify-center">
              <PhoneIcon color="white"></PhoneIcon>
            </div>
            <p className="text-lg">Call to us</p>
          </div>
          <div>We are available 24/7, 7 days a week</div>
          <div>Phone: +84 1234567</div>
          <div className="w-full h-[1px] bg-black/25 mt-[100px]"></div>
          <div className="flex items-center space-x-2 ">
            <div className="w-[40px] h-[40px] border rounded-3xl bg-[#DB4444] flex items-center justify-center">
              <Mail color="white"></Mail>
            </div>
            <p className="text-lg">Write to us</p>
          </div>
          <div>Fill out your form and we will contact within 24h</div>
          <div>Email: abcxyz@example.com</div>
          <div>Email: 123456@example.com</div>
        </div>

        <div className=" w-[740px] shadow-lg p-2">
          <ProfileForm></ProfileForm>
        </div>
      </div>
    </div>
  );
};
export default Body;
