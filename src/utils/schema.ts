interface Parent {
    title: string;
    slug: string;
}

interface SchemaOptions {
    path: string;
    title: string;
    parents?: Parent[];
}

interface SchemaItem {
    "@type": string;
    "@id": string;
    [key: string]: any;
}

interface BreadcrumbItem {
    "@type": "ListItem";
    position: string;
    item: {
        "@id": string;
        name: string;
    };
}

function generateBreadcrumbs(path: string, title: string, parents?: Parent[]): Array<BreadcrumbItem> {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || ''
    
    const homeBreadcrumb = {
        "@type": "ListItem" as const,
        position: "1",
        item: {
            "@id": baseUrl,
            name: "Home"
        }
    };

    const parentsBreadcrumbs = parents?.map((parent, index) => {
        return {
            "@type": "ListItem" as const,
            position: String(index + 2),
            item: {
                "@id": `${baseUrl}/${parents.slice(0, index + 1).map(p => p.slug).join('/')}`,
                name: parent.title
            }
        };
    }) || [];

    const currentBreadcrumb = {
        "@type": "ListItem" as const,
        position: String(parentsBreadcrumbs.length + 2),
        item: {
            "@id": `${baseUrl}/${path}`,
            name: title
        }
    };

    return [homeBreadcrumb, ...parentsBreadcrumbs, currentBreadcrumb];
}

export default function schema({ path, title, parents }: SchemaOptions) {
    const siteSchema: { "@context": string; "@graph": SchemaItem[] } = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "Organization",
                "@id": `${process.env.NEXT_PUBLIC_SITE_URL}#organization`,
                "name": "Jagadhatri Online",
                "sameAs": [
                    "https://www.facebook.com/JagadhatriOnlineOfficial/",
                    "https://twitter.com/JagadhatriLive"
                ]
            },
            {
                "@type": "WebSite",
                "@id": `${process.env.NEXT_PUBLIC_SITE_URL}#website`,
                "url": process.env.NEXT_PUBLIC_SITE_URL,
                "name": "Jagadhatri Online",
                "publisher": {
                    "@id": `${process.env.NEXT_PUBLIC_SITE_URL}#organization`
                },
                "inLanguage": "en-US"
            },
            {
                "@type": "BreadcrumbList",
                "@id": `${process.env.NEXT_PUBLIC_SITE_URL}/${path}#breadcrumb`,
                "itemListElement": generateBreadcrumbs(path, title, parents)
            },
            {
                "@type": "WebPage",
                "@id": `${process.env.NEXT_PUBLIC_SITE_URL}/${path}#webpage`,
                "url": `${process.env.NEXT_PUBLIC_SITE_URL}/${path}`,
                "name": `${title} - Jagadhatri Online™ | the #1 Popular Jagadhatri Puja Portal`,
                "isPartOf": {
                    "@id": `${process.env.NEXT_PUBLIC_SITE_URL}#website`
                },
                "inLanguage": "en-US",
                "breadcrumb": {
                    "@id": `${process.env.NEXT_PUBLIC_SITE_URL}/${path}#breadcrumb`
                }
            }
        ]
    };

    return siteSchema;
}