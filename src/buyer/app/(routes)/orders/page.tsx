import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { OrderClient } from "./components/client";
import { OrderColumn } from "./components/columns";
import { formatter } from "@/lib/utils";
import { format } from "date-fns";
const Orders = async () => {
  const storeId = "2104";
  const { userId } = await auth();
  if (!userId) return;
  const myOrders = await prismadb.order.findMany({
    where: {
      storeId,
      isPaid: true,
      userId,
    },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
  });
  const formattedOrders: OrderColumn[] = myOrders.map((item) => ({
    id: item.id,
    phone: item.phone,
    address: item.address,
    products: item.orderItems
      .map((orderItem) => orderItem.product.name)
      .join(", "),
    totalPrice: formatter.format(
      item.orderItems.reduce((total, item) => {
        return total + Number(item.product.price);
      }, 0)
    ),
    isPaid: item.isPaid,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));
  return (
    <div className="min-h-screen">
      <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <OrderClient data={formattedOrders} />
      </div>
    </div>
    </div>
  );
};
export default Orders;
