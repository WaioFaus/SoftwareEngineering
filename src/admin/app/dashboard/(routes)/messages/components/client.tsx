"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

import { columns, MessagesColumn } from "./columns";

interface MessageClientProps {
  data: MessagesColumn[];
}

export const MessageClient: React.FC<MessageClientProps> = ({ data }) => {
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Messages (${data.length})`}
          description="Manage messages"
        />
      </div>
      <Separator />
      <DataTable searchKey="email" columns={columns} data={data} />
    </>
  );
};
