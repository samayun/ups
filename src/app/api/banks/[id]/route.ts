import { db } from '@/db';
import { NextResponse } from 'next/server';
import { banks } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    console.log('🚀 GET BANK', params.id);
    const bank = await db
      .select()
      .from(banks)
      .where(eq(banks.id, Number(params.id)));
    if (!bank) {
      return NextResponse.json({ error: 'Bank not found' }, { status: 404 });
    }
    return NextResponse.json(bank);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch bank' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    console.log('🚀 UPDATE BANK', params.id);
    const data = await request.json();
    const bank = await db
      .update(banks)
      .set({
        ...data,
        id: params.id,
      })
      .where(eq(banks.id, Number(params.id)));
    if (!bank) {
      return NextResponse.json({ error: 'Bank not found' }, { status: 404 });
    }
    return NextResponse.json(bank);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update bank' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    console.log('🚀 DELETE BANK', params.id);
    const result = await db
      .delete(banks)
      .where(eq(banks.id, Number(params.id)));
    if (result.rowCount === 0) {
      return NextResponse.json({ error: 'Bank not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Bank deleted successfully' });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete bank' },
      { status: 500 }
    );
  }
}
