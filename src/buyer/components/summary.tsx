"use client";

import useCart from "@/hooks/use-cart";
import { Button } from "./ui/button";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { useEffect } from "react";
import toast from "react-hot-toast";

const Summary = () => {
  const items = useCart((state) => state.items);
  const removeAll = useCart((state) => state.removeAll);
  const searchParams = useSearchParams();
  useEffect(() => {
    if (searchParams.get("success")) {
      toast.success("Payment successed");
      removeAll();
    }
    if (searchParams.get("cancelled")) {
      toast.error("Something went wrong");
    }
  }, [searchParams, removeAll]);

  const totalPrice = items.reduce((total, item) => {
    return total + Number(item.price);
  }, 0);
  const onCheckout = async () => {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/checkout`,
      {
        productIds: items.map((item) => item.id),
      }
    );
    window.location = response.data.url;
  };
  return (
    <div className="mt-16 rounded-lg bg-gray-50 px-4 py-6 col-span-5 mt-0 p-8">
      <h2 className="text-;g font-medium text-gray-900">Order</h2>
      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <div className="text-base font-medium text-gray-900">Order total</div>
          <p className="font-bold ">{totalPrice}.VND</p>
        </div>
      </div>
      <Button onClick={onCheckout} className="w-full mt-5">
        Checkout
      </Button>
    </div>
  );
};

export default Summary;
