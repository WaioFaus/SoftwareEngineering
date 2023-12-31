import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function GET(req: Request) {
  try {
    const messages = await prismadb.message.findMany();
    return NextResponse.json(messages);
  } catch (error) {
    console.log("[MESSAGE_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function POST(req: Request) {
  const { userId, userName, email, messageBody } = await req.json();

  const message = await prismadb.message.create({
    data: {
      userId,
      userName,
      email,
      messageBody,
    },
  });

  return NextResponse.json(message, { headers: corsHeaders });
}
