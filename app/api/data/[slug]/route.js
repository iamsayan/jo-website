import { NextResponse } from 'next/server';

export async function POST(request, { params }) {
    const route = '/' + params?.slug[0] + '/get/' + params?.slug[1]
    const body = await request.json();

    try {
        const response = await fetch(process.env.apiUrl + route, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                "Authorization": "Bearer " + process.env.apiKey,
            },
            body: JSON.stringify({
                simple: true,
                hide_info: true,
                cache: false,
                ...body
            }),
            next: { revalidate: 10 },
        })
        if (response.ok) {
            const data = await response.json();
            return NextResponse.json({ success: true, data } )
        } else {
            return NextResponse.json( { success: false, error: 'Error occured!' } )
        }
    } catch (error) {
        return NextResponse.json( { success: false, error: error } )
    }
}