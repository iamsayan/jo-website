interface SchemaOptions {
    slug: string;
    title: string;
    description?: string;
    start?: Date;
    end?: Date;
}

interface SchemaItem {
    "@type": string;
    "@id": string;
    [key: string]: any;
}

export default function schema({ slug, title, description, start, end }: SchemaOptions) {
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
                "@id": `${process.env.NEXT_PUBLIC_SITE_URL}/${slug}#breadcrumb`,
                "itemListElement": [
                    {
                        "@type": "ListItem",
                        "position": "1",
                        "item": {
                            "@id": process.env.NEXT_PUBLIC_SITE_URL,
                            "name": "Home"
                        }
                    },
                    {
                        "@type": "ListItem",
                        "position": "2",
                        "item": {
                            "@id": `${process.env.NEXT_PUBLIC_SITE_URL}/${slug}`,
                            "name": title
                        }
                    }
                ]
            },
            {
                "@type": "WebPage",
                "@id": `${process.env.NEXT_PUBLIC_SITE_URL}/${slug}#webpage`,
                "url": `${process.env.NEXT_PUBLIC_SITE_URL}/${slug}`,
                "name": `${title} - Jagadhatri Online™ | the #1 Popular Jagadhatri Puja Portal`,
                "isPartOf": {
                    "@id": `${process.env.NEXT_PUBLIC_SITE_URL}#website`
                },
                "inLanguage": "en-US",
                "breadcrumb": {
                    "@id": `${process.env.NEXT_PUBLIC_SITE_URL}/${slug}#breadcrumb`
                }
            }
        ]
    };

    if (typeof description !== 'undefined') {
        siteSchema["@graph"].push({
            "name": `${title} - Jagadhatri Online™ | the #1 Popular Jagadhatri Puja Portal`,
            "description": description,
            "@type": "Event",
            "eventStatus": "https://schema.org/EventScheduled",
            "eventAttendanceMode": "https://schema.org/MixedEventAttendanceMode",
            "location": [
                {
                    "@type": "VirtualLocation",
                    "url": "https://www.facebook.com/JagadhatriOnlineOfficial"
                },
                {
                    "@type": "Place",
                    "name": "Chandannagar",
                    "url": "https://en.wikipedia.org/wiki/Chandannagar",
                    "address": {
                        "@type": "PostalAddress",
                        "streetAddress": "Station Road",
                        "addressLocality": "Chandannagar",
                        "addressRegion": "West Bengal",
                        "postalCode": "712136",
                        "addressCountry": "India"
                    }
                }
            ],
            "performer": {
                "@type": "Organization",
                "name": "Jagadhatri Online",
                "sameAs": process.env.NEXT_PUBLIC_SITE_URL
            },
            "organizer": {
                "@type": "Organization",
                "name": "Jagadhatri Online",
                "url": process.env.NEXT_PUBLIC_SITE_URL
            },
            "image": `${process.env.NEXT_PUBLIC_SITE_URL}/og-image.jpg`,
            "startDate": start,
            "endDate": end,
            "@id": `${process.env.NEXT_PUBLIC_SITE_URL}/${slug}#schema-${Math.floor(Math.random() * 1000000)}`, // ensure unique ID
            "inLanguage": "en-US",
            "mainEntityOfPage": {
                "@id": `${process.env.NEXT_PUBLIC_SITE_URL}/${slug}#webpage`
            }
        });
    }

    return siteSchema;
}