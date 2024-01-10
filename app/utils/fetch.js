export async function getCollectionData(slug, options = {}) {
    let body = {
        simple: true,
        hide_info: true,
        cache: process.env.NODE_ENV !== 'development',
        ...options
    };

    const response = await fetch(process.env.API_URL + '/collections/get/' + slug, {
        method: "POST",
        headers: {
            "Content-type": "application/json",
            "Authorization": "Bearer " + process.env.API_KEY,
        },
        body: JSON.stringify(body),
        next: { revalidate: process.env.NODE_ENV === 'development' ? 0 : 3600 },
    })

    if (response.ok) {
        return response.json();
    } else {
        return Promise.reject(response);
    }
}

export async function getSingletonData(slug) {
    const response = await fetch(process.env.API_URL + '/singletons/get/' + slug, {
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
        return response.json();
    } else {
        return Promise.reject(response);
    }
}
