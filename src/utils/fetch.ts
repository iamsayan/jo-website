interface ApiResponse {
    [key: string]: any;
}

// Fetch collection data with optional parameters
export async function getCollectionData(slug: string): Promise<ApiResponse> {
    const response = await fetch(`${process.env.API_URL}/content/items/${slug}`, {
        method: "GET",
        headers: {
            "api-key": process.env.API_KEY!,
        },
        next: { revalidate: process.env.NODE_ENV === 'development' ? 0 : 3600 },
    });

    if (response.ok) {
        return response.json();
    } else {
        return Promise.reject(response);
    }
}

// Fetch singleton data
export async function getSingletonData(slug: string): Promise<ApiResponse> {
    const response = await fetch(`${process.env.API_URL}/content/item/${slug}`, {
        method: "GET",
        headers: {
            "api-key": process.env.API_KEY!,
        },
        next: { revalidate: process.env.NODE_ENV === 'development' ? 0 : 3600 },
    });

    if (response.ok) {
        return response.json();
    } else {
        return Promise.reject(response);
    }
}