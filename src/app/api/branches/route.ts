import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Branch from "@/models/Branch";

export async function GET() {
  try {
    await connectDB();
    const branches = await Branch.find({}).populate("bankId");
    return NextResponse.json(branches);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch branches" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const data = await request.json();
    const branch = await Branch.create(data);
    return NextResponse.json(branch, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create branch" },
      { status: 500 }
    );
  }
}
