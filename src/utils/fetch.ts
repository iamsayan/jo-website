import { generateUrlSearchParams } from "@/utils/functions";

interface ApiResponse {
    [key: string]: any;
}

interface GetDataParams {
    models: Record<string, any>;
    populate?: -1 | 0 | 1;
}

export async function getCollectionData(model: string, params?: Record<string, any>): Promise<ApiResponse> {
    if (params && Object.keys(params).length > 0) {
        model = generateUrlSearchParams(model, params);
    }

    const response = await fetch(`${process.env.API_URL}/content/items/${model}`, {
        method: "GET",
        headers: {
            "api-key": process.env.API_KEY!,
        },
        next: {
            tags: [`collection-${model}`],
            revalidate: process.env.NODE_ENV === 'development' ? 0 : 604800,
        },
    });

    if (response.ok) {
        return response.json();
    } else {
        return Promise.reject(response);
    }
}

export async function getSingletonData(model: string, params?: Record<string, any>): Promise<ApiResponse> {
    if (params && Object.keys(params).length > 0) {
        model = generateUrlSearchParams(model, params);
    }
    const response = await fetch(`${process.env.API_URL}/content/item/${model}`, {
        method: "GET",
        headers: {
            "api-key": process.env.API_KEY!,
        },
        next: {
            tags: [`collection-${model}`],
            revalidate: process.env.NODE_ENV === 'development' ? 0 : 604800,
        },
    });

    if (response.ok) {
        return response.json();
    } else {
        return Promise.reject(response);
    }
}

export async function getTreeData(model: string, params?: Record<string, any>): Promise<ApiResponse> {
    if (params && Object.keys(params).length > 0) {
        model = generateUrlSearchParams(model, params);
    }
    const response = await fetch(`${process.env.API_URL}/content/tree/${model}`, {
        method: "GET",
        headers: {
            "api-key": process.env.API_KEY!,
        },
        next: {
            tags: [`collection-${model}`],
            revalidate: process.env.NODE_ENV === 'development' ? 0 : 604800,
        },
    });

    if (response.ok) {
        return response.json();
    } else {
        return Promise.reject(response);
    }
}

export async function getData(params: GetDataParams): Promise<ApiResponse> {
    const route = generateUrlSearchParams('items', params);
    const response = await fetch(`${process.env.API_URL}/content/${route}`, {
        method: "GET",
        headers: {
            "api-key": process.env.API_KEY!,
        },
        next: {
            tags: Object.keys(params.models).map((key) => `collection-${key}`),
            revalidate: process.env.NODE_ENV === 'development' ? 0 : 604800,
        },
    });

    if (response.ok) {
        return response.json();
    } else {
        return Promise.reject(response);
    }
}