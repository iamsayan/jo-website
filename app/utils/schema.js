export default function schema({slug, title, description, start, end}) {
    const siteSchema = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "Organization",
                "@id": "https://www.jagadhatrionline.co.in/#organization",
                "name": "Jagadhatri Online",
                "sameAs": [
                    "https://www.facebook.com/JagadhatriOnlineOfficial/",
                    "https://twitter.com/JagadhatriLive"
                ]
            },
            {
                "@type": "WebSite",
                "@id": "https://www.jagadhatrionline.co.in/#website",
                "url": "https://www.jagadhatrionline.co.in",
                "name": "Jagadhatri Online",
                "publisher": {
                    "@id": "https://www.jagadhatrionline.co.in/#organization"
                },
                "inLanguage": "en-US"
            },
            {
                "@type": "BreadcrumbList",
                "@id": `https://www.jagadhatrionline.co.in/${slug}#breadcrumb`,
                "itemListElement": [
                    {
                        "@type": "ListItem",
                        "position": "1",
                        "item": {
                            "@id": "https://www.jagadhatrionline.co.in",
                            "name": "Home"
                        }
                    },
                    {
                        "@type": "ListItem",
                        "position": "2",
                        "item": {
                            "@id": `https://www.jagadhatrionline.co.in/${slug}`,
                            "name": title
                        }
                    }
                ]
            },
            {
                "@type": "WebPage",
                "@id": `https://www.jagadhatrionline.co.in/${slug}#webpage`,
                "url": `https://www.jagadhatrionline.co.in/${slug}`,
                "name": title,
                "isPartOf": {
                    "@id": "https://www.jagadhatrionline.co.in/#website"
                },
                "inLanguage": "en-US",
                "breadcrumb": {
                    "@id": `https://www.jagadhatrionline.co.in/${slug}#breadcrumb`
                }
            }
        ]
    }

    if (description) {
        siteSchema?.['@graph'].push({
            "name": title,
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
                "sameAs": "https://www.jagadhatrionline.co.in"
            },
            "organizer": {
                "@type": "Organization",
                "name": "Jagadhatri Online",
                "url": "https://www.jagadhatrionline.co.in"
            },
            "startDate": start,
            "endDate": end,
            "@id": `https://www.jagadhatrionline.co.in/${slug}#schema-${Math.floor(Math.random())}`,
            "isPartOf": {
                "@id": `https://www.jagadhatrionline.co.in/${slug}#webpage`
            },
            "publisher": {
                "@id": "https://www.jagadhatrionline.co.in/#organization"
            },
            "inLanguage": "en-US",
            "mainEntityOfPage": {
                "@id": `https://www.jagadhatrionline.co.in/${slug}#webpage`
            }
        })
    }

    return siteSchema
}