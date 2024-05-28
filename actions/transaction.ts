'use server'

const API_KEY = process.env.NEXT_PUBLIC_SCAN_API_KEY

export const getTxHistory = async (address: string, tokenCA: string) => {

    const params = new URLSearchParams({
        module: "account",
        action: "tokentx",
        contractaddress: tokenCA,
        address,
        startblock: '0',
        endblock: '99999999',
        sort: "dsc",
        apikey: API_KEY as string
    })
    const res = await fetch(`https://api-testnet.snowscan.xyz/api/?${params.toString()}`, {
        method: 'GET',
        cache: 'force-cache',
    })
    const data = await res.json()
    return data
}

