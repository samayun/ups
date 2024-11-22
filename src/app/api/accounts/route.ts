import { NextResponse } from "next/server";
// Assuming the correct path for connectDB and Account models
import connectDB from "@/lib/db";
import Account from "@/models/Account";

export async function GET() {
  try {
    await connectDB();
    const accounts = await Account.find({}).populate("bankId");
    return NextResponse.json(accounts);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch accounts" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const data = await request.json();
    const account = await Account.create(data);
    return NextResponse.json(account, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create account" },
      { status: 500 }
    );
  }
}
