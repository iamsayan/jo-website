import { NextResponse } from 'next/server';

export async function POST(request, { params }) {
    const route = '/singletons/get/' + params?.slug

    try {
        const response = await fetch(process.env.API_URL + route, {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + process.env.API_KEY,
            },
            body: JSON.stringify({
                simple: true,
                hide_info: true,
                cache: process.env.NODE_ENV !== 'development',
            }),
            next: { revalidate: process.env.NODE_ENV === 'development' ? 0 : 3600 },
        })
        if (response.ok) {
            const data = await response.json();
            return NextResponse.json({ success: true, data } )
        } else {
            return NextResponse.json( { success: false, error: 'Error occured!' }, 500 )
        }
    } catch (error) {
        return NextResponse.json( { success: false, error: error }, { status: 500 } )
    }
}