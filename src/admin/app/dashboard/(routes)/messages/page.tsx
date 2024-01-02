import { format } from "date-fns";

import prismadb from "@/lib/prismadb";

import { MessagesColumn } from "./components/columns";
import { MessageClient } from "./components/client";
const MessagesPage = async () => {
  const messages = await prismadb.message.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  const formattedMessages: MessagesColumn[] = messages.map((item) => ({
    name: item.userName,
    email: item.email,
    body: item.messageBody,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <MessageClient data={formattedMessages} />
      </div>
    </div>
  );
};

export default MessagesPage;
