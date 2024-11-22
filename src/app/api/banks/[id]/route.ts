import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Bank from "@/models/Bank";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const bank = await Bank.findById(params.id);
    if (!bank) {
      return NextResponse.json({ error: "Bank not found" }, { status: 404 });
    }
    return NextResponse.json(bank);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch bank" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const data = await request.json();
    const bank = await Bank.findByIdAndUpdate(params.id, data, { new: true });
    if (!bank) {
      return NextResponse.json({ error: "Bank not found" }, { status: 404 });
    }
    return NextResponse.json(bank);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update bank" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const bank = await Bank.findByIdAndDelete(params.id);
    if (!bank) {
      return NextResponse.json({ error: "Bank not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Bank deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete bank" },
      { status: 500 }
    );
  }
}
