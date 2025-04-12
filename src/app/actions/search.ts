'use server'

import { generateUrlSearchParams } from "@/utils/functions";

export async function searchPujas(rootActionId: string, query: object) {
    try {
        const res = await fetch(`${process.env.API_URL}/detektivo/search/${generateUrlSearchParams(rootActionId, query)}`, {
            method: "GET",
            headers: {
                "api-key": process.env.API_KEY!,
            },
            next: {
                revalidate: process.env.NODE_ENV === 'development' ? 0 : 1800,
            },
        });
        
        if (!res.ok) throw new Error('Search failed');
        
        return await res.json();
    } catch (error) {
        if (error instanceof Error && error.name !== 'TimeoutError') {
            console.error("API error:", error);
        }
        return null;
    }
}