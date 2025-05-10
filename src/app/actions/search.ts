'use server'

import { getModel } from "@/utils/fetch";

export async function searchModels(model: string, query: string, params: Record<string, any> = {}) {
    try {
        const searchData = await getModel(model, {
            filter: {
                puja_name: {
                    '$regex': query,
                },
            },
            ...params,
        });
        return searchData ?? null;
    } catch (error) {
        if (error instanceof Error && error.name !== 'TimeoutError') {
            console.error("API error:", error);
        }
        return null;
    }
}