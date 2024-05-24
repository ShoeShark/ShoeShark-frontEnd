"use client"
import clsx from "clsx"
import TokenInput from "../components/TokenInput"
import { Token, Fetcher, Trade, Route, Percent } from "@uniswap/sdk"

export default function TokenSwap() {
    const [inToken, setInToken] = useState('ETH')
    const [outToken, setOutToken] = useState('SST')
    const [inAmount, setInAmount] = useState('')
    const [outAmount, setOutAmount] = useState('')
    const [inputTokenBalance, setInputTokenBalance] = useState('0');
    const [outputTokenBalance, setOutputTokenBalance] = useState('0');
    const [gasEstimate, setGasEstimate] = useState('0');

    useEffect(() => {
        // 这里我们用一个固定的Token地址作为输出Token，比如ETH
        const tokenAddress = '0x6689F6C3E4bEd414038c1c2f390867c9b23f8B53'; // Wrapped ETH on Rinkeby testnet
        // console.log(new Token(43317, tokenAddress, 18))
    }, []);

    return <div className="flex w-full justify-center pt-4">
        <div className={clsx([
            "card min-w-80 w-[30rem] gradient-animated shadow-xl",
            "bg-gradient-to-r from-[#e9defa] via-[#e3eeff] to-[#fed6e3]"
        ])}>
            <div className="card-body">
                <TokenInput
                    title="Token In"
                    type="in"
                    tokenVal={inToken}
                    amountVal={inAmount}
                    setToken={setInToken}
                    setAmount={setInAmount}
                />
                <TokenInput
                    title="Token Out"
                    type="out"
                    tokenVal={outToken}
                    amountVal={outAmount}
                    setToken={setOutToken}
                    setAmount={setOutAmount}
                />

                <div className="collapse collapse-arrow mt-2 bg-[#FFFFFFBD] shadow-2xl">
                    <input type="checkbox" />
                    <div className="collapse-title">
                        1 SST = 1 ETH
                    </div>
                    <div className="collapse-content">
                        <div className="flex justify-between">
                            <span>expect output: </span>
                            <span>999</span>
                        </div>
                        <div className="flex justify-between">
                            <span>network fee: </span>
                            <span>0.001eth</span>
                        </div>
                    </div>
                </div>

                <div className="btn bg-[#F31260] hover:bg-[#F3126090] border-none mt-6 mx-16 text-white">
                    swap
                </div>
            </div>
        </div>
    </div>

}
