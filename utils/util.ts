import { PartialBlock } from "@blocknote/core"
import { getToken } from "actions/token"
import { Address } from "viem"

export const log = console.log.bind(console, '🦈')

export const formatDate = (d: string) => {
    return new Date(d).toLocaleString()
}

export function getInitialContent(content: string, blockLength: number | undefined = undefined) {
    let initialContent: PartialBlock[] | undefined = []
    try {
        initialContent = JSON.parse(content)
    } catch (err) {
        initialContent = undefined
    }
    if (Array.isArray(initialContent) && initialContent.length > 0) {
        if (blockLength && blockLength > 0) {
            initialContent = initialContent.slice(0, blockLength)
        }
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

export const generateColorFromAddress = (address: string) => {
    const stringToHash = (str: string) => {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            hash = (hash << 5) - hash + str.charCodeAt(i);
            hash |= 0; // 转换为 32-bit 整数
        }
        return hash;
    };


    const hash1 = stringToHash(`color1-${address}`);
    const hash2 = stringToHash(`color2-${address}`);

    const color1 = `#${((hash1 >>> 0) & 0xFFFFFF).toString(16).padStart(6, '0')}`;
    const color2 = `#${((hash2 >>> 0) & 0xFFFFFF).toString(16).padStart(6, '0')}`;

    return `linear-gradient(45deg, ${color1}, ${color2})`;
};
