import { NextResponse } from "next/server";
// Correcting the path for connectDB and Bank models
import connectDB from "../../../lib/db";
import Bank from "../../../models/Bank";
import formidable from "formidable";

export async function GET() {
  try {
    await connectDB();
    const banks = await Bank.find({});
    return NextResponse.json(banks);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to fetch banks" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    await connectDB();
    const bank = await Bank.create(payload);
    return NextResponse.json(bank, { status: 201 });
  } catch (error: any) {
    console.error("Error creating bank:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create bank" },
      { status: 500 }
    );
  }
}
