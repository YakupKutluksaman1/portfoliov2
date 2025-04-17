import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: 'https://yakupkutluksaman.com',
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1,
        },
        {
            url: 'https://yakupkutluksaman.com/projects',
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: 'https://yakupkutluksaman.com/contact',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.5,
        },
    ]
} 