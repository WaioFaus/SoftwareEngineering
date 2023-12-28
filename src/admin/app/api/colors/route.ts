import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
export const storeId = "2104";
export async function GET(req: Request) {
  try {
    const colors = await prismadb.color.findMany({
      where: {
        storeId,
      },
    });

    return NextResponse.json(colors);
  } catch (error) {
    console.log("[COLORS_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
