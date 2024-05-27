import { PartialBlock } from "@blocknote/core"
import { getToken } from "actions/token"

export const log = console.log.bind(console, '🦈')

export const formatDate = (d: string) => {
    return new Date(d).toLocaleString()
}

export function getInitialContent(content: string) {
    let initialContent: PartialBlock[] | undefined = []
    try {
        initialContent = JSON.parse(content)
    } catch (err) {
        initialContent = undefined
    }
    if (Array.isArray(initialContent) && initialContent.length > 0) {
        initialContent = initialContent.slice(0, 3)
    }
    return initialContent
}

export async function fetchWithAuth(url: string, options: RequestInit = {}) {
    const token = await getToken()

    const defaultHeaders = {
        'Authorization': `${token}`,
    };

    const newOptions = {
        ...options,
        headers: {
            ...defaultHeaders,
            ...options.headers, // 保留传入 options 中的 headers
        },
    };

    const response = await fetch(url, newOptions);
    return response;
}
