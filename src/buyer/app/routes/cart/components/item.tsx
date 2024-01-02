"use client";
import Image from "next/image";
import toast from "react-hot-toast";
import { X } from "lucide-react";
import { Product } from "@/type";
import { Button } from "@/components/ui/button";
import useCart from "@/hooks/use-cart";
interface CartItemProps {
  data: Product;
}
const CartItem: React.FC<CartItemProps> = ({ data }) => {
  const cart = useCart();
  const onRemove = () => {
    cart.removeItem(data.id);
  };
  return (
    <li className="flex py-6 border-b ">
      <div className="relative h-24 w-24 rounded-md overflow-hidden ">
        <Image src={data.images[0].url} fill alt="img"></Image>
      </div>
      <div className="relative ml-4 flex flex-1 flex-col justify-between">
        <div className="absolute z-10 right-0 top-0">
          <Button onClick={onRemove}>
            <X size={15} />
          </Button>
        </div>
        <div className="relative pr-9 ">
          <div className="flex-col justify-between ">
            <div className="text-lg font-semibold">{data.name}</div>
            <div className="text-sm ">{data.size.name}</div>
            <div className="text-sm ">{data.color.name}</div>
            <div className="text-sm ">{data.price}.VND</div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
