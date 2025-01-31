interface ApiResponse {
    [key: string]: any;
}

// Fetch collection data with optional parameters
export async function getCollectionData(modelName: string): Promise<ApiResponse> {
    const response = await fetch(`${process.env.API_URL}/content/items/${modelName}`, {
        method: "GET",
        headers: {
            "api-key": process.env.API_KEY!,
        },
        next: {
            revalidate: process.env.NODE_ENV === 'development' ? 0 : 604800,
            tags: [modelName]
        },
    });

    if (response.ok) {
        return response.json();
    } else {
        return Promise.reject(response);
    }
}

// Fetch singleton data
export async function getSingletonData(modelName: string): Promise<ApiResponse> {
    const response = await fetch(`${process.env.API_URL}/content/item/${modelName}`, {
        method: "GET",
        headers: {
            "api-key": process.env.API_KEY!,
        },
        next: {
            revalidate: process.env.NODE_ENV === 'development' ? 0 : 604800,
            tags: [modelName]
        },
    });

    if (response.ok) {
        return response.json();
    } else {
        return Promise.reject(response);
    }
}