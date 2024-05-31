import { log } from "utils/util"

export const maxDuration = 60

export async function POST(request: Request) {
    const props = await request.json()
    const f = new FormData()
    Object.entries(props).forEach(item => {
        const [k, v] = item
        f.append(k, v as any)
    })
    let result
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_TRAVEL_ASSISTANT_BASE_URL}/get_data`, {
            method: 'POST',
            body: f,
            redirect: 'follow',
        })
        const data = await res.json()
        result = data
    } catch (err) {
        log('err', err)
    }
    return Response.json({
        data: result,
    })
}
