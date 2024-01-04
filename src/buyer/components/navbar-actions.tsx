"use client";

import { ShoppingBag } from "lucide-react";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import useCart from "@/hooks/use-cart";
import { useRouter } from "next/navigation";

const NavbarActions = () => {
  const [isMounted, setIsMounted] = useState(false);

  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const Cart = useCart();
  if (!isMounted) return null;

  return (
    <div className="ml-auto flex items-center gap-x-4">
      <Button
        onClick={() => router.push("/cart")}
        className="flex items-center rounded-full bg-black px-4 py-2 w-auto border-transparent font-semibold"
      >
        <ShoppingBag size={20} color="white" />
        <span className="ml-2 text-sm font-medium">{Cart.items.length}</span>
      </Button>
    </div>
  );
};

export default NavbarActions;
