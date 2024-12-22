import { NextResponse } from 'next/server';
import { banks } from '@/db/schema/Bank';
import { db } from '@/db';
import { desc } from 'drizzle-orm';

export async function GET() {
  try {
    const banksResult = await db.select().from(banks).orderBy(desc(banks.id));
    return NextResponse.json(banksResult);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to fetch banks' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    await db.insert(banks).values(payload);
    return NextResponse.json(payload, { status: 201 });
  } catch (error: any) {
    console.error('Error creating bank:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create bank' },
      { status: 500 }
    );
  }
}
