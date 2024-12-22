import { db } from '@/db';
import { desc } from 'drizzle-orm';
import { accounts } from '@/db/schema';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const accountsResult = await db
      .select()
      .from(accounts)
      .orderBy(desc(accounts.id));
    return NextResponse.json(accountsResult);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch accounts' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    await db.insert(accounts).values(data);
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create account' },
      { status: 500 }
    );
  }
}
