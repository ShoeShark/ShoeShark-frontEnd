export const log = console.log.bind(console, '🦈')

export const formatDate = (d: string) => {
    return new Date(d).toLocaleString()
}

export function getInitialContent(content: string) {
    let initialContent = []
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
