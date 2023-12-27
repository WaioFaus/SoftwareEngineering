"use client";

import { Product } from "@/type";
import Image from "next/image";
import { Button } from "./button";
import { Menu, ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import useCart from "@/hooks/use-cart";
import { MouseEventHandler } from "react";
interface ProductCardData {
  data: Product;
}
const ProductCard: React.FC<ProductCardData> = ({ data }) => {
  const cart = useCart();
  const router = useRouter();
  const addToCart: MouseEventHandler<HTMLButtonElement> = (event) => {
    event?.stopPropagation();
    cart.addItem(data);
  };
  const onOpen = () => {
    router.push(`/products/${data.id}`);
  };
  return (
    <div
      className="bg-white group w-[200px] border p-3 space-y-4 "
      onClick={() => router.push(`/products/${data.id}`)}
    >
      <div className="aspect-square rounded-xl bg-gray-100 relative">
        <Image src={data?.images?.[0].url} fill alt="img" />
        <div className="opacity-0 group-hover:opacity-100 transition w-full px-6 absolute bottom-5">
          <div className="flex gap-x-6 justify-center">
            <Button
              onClick={addToCart}
              className="rounded-full  flex items-center justify-center bg-white shadow border "
            >
              <ShoppingCart color="black" />
            </Button>
            <Button
              className="rounded-full  flex items-center justify-center bg-white shadow border "
              onClick={onOpen}
            >
              <Menu color="black" />
            </Button>
          </div>
        </div>
      </div>

      <div>
        <p className="font-semibold text-lg">{data.name}</p>
        <p className="text-sm text-gray-500">{data.category.name}</p>
        <p className="text-md pt-2 font-semibold text-black">
          {data.price}.VND
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
