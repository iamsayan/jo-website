import { NextResponse } from 'next/server';

export async function POST(request, { params }) {
    const route = '/collections/get/' + params?.slug
    let body = {
        simple: true,
        hide_info: true,
        cache: false,
    };

    try {
        const reqBody = await request.json();
        body = {
            ...body,
            ...reqBody
        }
    } catch (error) {}

    try {
        const response = await fetch(process.env.apiUrl + route, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                "Authorization": "Bearer " + process.env.apiKey,
            },
            body: JSON.stringify(body),
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