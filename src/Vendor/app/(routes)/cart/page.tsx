"use client";
import Container from "@/components/ui/container";
import useCart from "@/hooks/use-cart";
import CartItem from "./components/item";
import Summary from "@/components/summary";
import { Button } from "@/components/ui/button";
import Form from "@/components/total_form";
import { useRouter } from "next/navigation";
import { currentUser, useAuth } from "@clerk/nextjs";

const CartPage = () => {
  const cart = useCart();
  const router = useRouter();
  const { userId } = useAuth();

  return (
    <div className="flex-col mx-[100px] mt-[100px]">
      <p className="text-sm text-black/60 mb-5">
        Home<span> </span>
        <span className="text-black"> / Cart</span>
      </p>
      {cart.items.map((product) => (
        <CartItem key={product.id} data={product} />
      ))}
      <div className="flex items-center justify-end w-full">
        <Button
          onClick={() => router.refresh()}
          variant="outline"
          className="rounded-none border-2 border-black/50 mt-10"
        >
          Refresh cart
        </Button>
      </div>
      <div className="flex items-start justify-between mt-10">
        <Form id={userId} />
      </div>
    </div>
  );
};

export default CartPage;
