import { NextResponse } from 'next/server';
import { JSDOM } from 'jsdom';

interface RSSItem {
    title: string;
    description: string;
    url: string;
    publishedAt: string;
    source: string;
}

const RSS_FEEDS = [
    'https://blog.research.google/feeds/posts/default',
    'https://aws.amazon.com/blogs/machine-learning/feed/',
    'https://blogs.nvidia.com/feed/',
];

async function fetchRSSFeed(url: string): Promise<RSSItem[]> {
    try {
        const response = await fetch(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
        });

        if (!response.ok) {
            console.error(`Failed to fetch RSS from ${url}: HTTP ${response.status}`);
            return [];
        }

        const text = await response.text();
        const dom = new JSDOM(text, { contentType: "text/xml" });
        const items = Array.from(dom.window.document.querySelectorAll("item"));

        return items.map(item => ({
            title: item.querySelector("title")?.textContent?.trim() || "",
            description: (item.querySelector("description")?.textContent?.trim() || "").replace(/<[^>]*>/g, ''),
            url: item.querySelector("link")?.textContent?.trim() || "",
            publishedAt: item.querySelector("pubDate")?.textContent?.trim() || new Date().toISOString(),
            source: new URL(url).hostname.replace('www.', '')
        })).filter(item => item.title && item.description);
    } catch (error) {
        console.error(`Error fetching RSS from ${url}:`, error);
        return [];
    }
}

export async function GET() {
    try {
        const allNews = await Promise.all(
            RSS_FEEDS.map(feed => fetchRSSFeed(feed))
        );

        const flattenedNews = allNews.flat();
        const sortedNews = flattenedNews.sort((a, b) =>
            new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
        );

        return NextResponse.json({ news: sortedNews.slice(0, 6) });
    } catch (error) {
        console.error('Error in news API:', error);
        return NextResponse.json({ news: [] }, { status: 500 });
    }
} 