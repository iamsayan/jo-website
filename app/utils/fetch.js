export async function getCollectionData( slug, options = {} ) {
    const res = await fetch(process.env.SITE_URL + '/api/data/' + slug, {
        method: "POST",
        body: JSON.stringify(options),
        //next: { revalidate: process.env.NODE_ENV === 'development' ? 0 : 3600 },
    })

    return res.json()
}

export async function getSingletonData( slug ) {
    const res = await fetch(process.env.SITE_URL + '/api/website/' + slug, {
        method: "POST",
        next: { revalidate: process.env.NODE_ENV === 'development' ? 0 : 3600 },
    })

    return res.json()
}
