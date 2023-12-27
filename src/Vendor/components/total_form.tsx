import { Button } from "@/components/ui/button";
import useCart from "@/hooks/use-cart";
import { cn } from "@/lib/utils";
import { auth } from "@clerk/nextjs";
import axios from "axios";
import { Poppins } from "next/font/google";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";

const Form = (props: any) => {
  const items = useCart((state) => state.items);
  const removeAll = useCart((state) => state.removeAll);
  const searchParams = useSearchParams();
  const userId = props;
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
        userId: userId.id,
      }
    );
    window.location = response.data.url;
  };
  return (
    <div className="flex-col w-1/3 border-black border py-5 px-5 ">
      <h5 className="font text-lg font-medium ">Cart total</h5>
      <div className=" my-10 flex justify-between">
        <h6>Subtotal</h6>
        <p className="">{totalPrice}.$</p>
      </div>
      <hr className="mb-5" />
      <div className=" flex justify-between">
        <h6 className="font-bold">Total</h6>
        <p className="font-bold">{totalPrice}.$</p>
      </div>
      <div className="justify-center flex mt-10">
        <Button onClick={onCheckout} className="bg-red-700">
          Proceed to checkout
        </Button>
      </div>
    </div>
  );
};

export default Form;
