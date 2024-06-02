
export function toShortenNum(num: string | number) {
    const digit = 5;

    if (typeof num == "string") num = Number(num)

    let formattedNum = num.toString(), affix = "";

    if (num >= 10000) {
        num = (num / 1000);
        affix = "k"
    }

    const str = num.toString().replace(".", "");
    if (str.length > digit) {
        if (num < 1) {
            const match = str.match(/^(0*)([1-9])/) || []
            if (match && match[1].length > digit) {
                formattedNum = `0.0{${match[1].length - 1}}${match[2]}`;
            } else {
                formattedNum = '0.' + str.slice(1, digit);
            }
        } else {

            formattedNum = num.toString().slice(0, digit + 1)
        }
    }

    return formattedNum + affix;
}

export const subtractSlippage = (value: bigint, slippage = 0) => {

    const slippageFactor = BigInt(Math.floor(slippage * 10000));
    const slippageAmount = (value * slippageFactor) / BigInt(10000);

    return value - slippageAmount;
};

export const formatNumber = (s: string, digit: number = 4): string => {
    const num = Number(s);
    if (num % 1 === 0) {
        return num.toString();
    }
    return Number(s).toFixed(digit);
};

export function formatAddress(address: string) {
    return address.slice(0, 4) + "..." + address.slice(-4);
}

export function formatBlockTimestamp(timestamp: bigint) {
    // 将 Unix 时间戳从秒转换为毫秒
    const date = new Date(Number(timestamp * 1000n));

    // 获取日期的各个部分
    const year = date.getFullYear();
    // 月份从 0 开始，所以加 1
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');

    // 组合日期的各个部分
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}
