import { generateUrlSearchParams } from '@/utils/functions';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest, { params }: { params: Promise<{ index: string | number }> }) {
    try {
        const { index } = await params;
        const searchParams = request.nextUrl.searchParams;
        const searchParamsObj = Object.fromEntries(searchParams.entries());
        const response = await fetch(`${process.env.API_URL}/detektivo/search/${generateUrlSearchParams(String(index), searchParamsObj)}`, {
            method: "GET",
            headers: {
                "api-key": process.env.API_KEY!,
            },
            next: {
                revalidate: process.env.NODE_ENV === 'development' ? 0 : 1800,
            },
        });
        const data = await response.json();

        return NextResponse.json(data);
    } catch (err) {
        console.error('Search error:', err);
        return NextResponse.json(
            { message: 'Error searching data', error: (err as Error).message },
            { status: 500 }
        );
    }
} 