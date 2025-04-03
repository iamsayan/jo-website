import { generateUrlSearchParams } from "@/utils/functions";

interface ApiResponse {
    [key: string]: any;
}

export async function getModel(model: string, params: Record<string, any> = {}): Promise<ApiResponse> {
    const type = params.type ?? 'items';
    delete params.type;
    model = generateUrlSearchParams(model, params);
    
    const response = await fetch(`${process.env.API_URL}/content/${type}/${model}`, {
        method: "GET",
        headers: {
            "api-key": process.env.API_KEY!,
        },
        next: {
            tags: [`model-${model}`],
            revalidate: process.env.NODE_ENV === 'development' ? 0 : 604800,
        },
    });

    if (response.ok) {
        return response.json();
    } else {
        return Promise.reject(response);
    }
}

export async function getModels(models: Record<string, any>, populate: -1 | 0 | 1 = 0): Promise<ApiResponse> {
    const route = generateUrlSearchParams('items', { models, populate });
    const response = await fetch(`${process.env.API_URL}/content/${route}`, {
        method: "GET",
        headers: {
            "api-key": process.env.API_KEY!,
        },
        next: {
            tags: Object.keys(models).map((key) => `model-${key}`),
            revalidate: process.env.NODE_ENV === 'development' ? 0 : 604800,
        },
    });

    if (response.ok) {
        return response.json();
    } else {
        return Promise.reject(response);
    }
}