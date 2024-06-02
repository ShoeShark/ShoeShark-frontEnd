"use client"
import TokenInput from "../components/TokenInput"
import { SST, WETH } from "config/constants/token"
import { getContract, parseEther, formatEther, Address } from "viem"
import { SWAP_ROUTER } from "contracts/SwapRouter"
import { formatNumber, subtractSlippage } from "utils/format"
import { notification } from "antd"
import Link from "next/link"
import { useAccount, useWriteContract } from "wagmi"
import { publicClient } from "config"

export default function SwapBox() {
    const account = useAccount()

    const [inToken, setInToken] = useState(WETH)
    const [outToken, setOutToken] = useState(SST)
    const [inAmount, setInAmount] = useState('')
    const [outAmount, setOutAmount] = useState('')
    // const [gasEstimate, setGasEstimate] = useState('0')

    const [price, setPrice] = useState("")

    const [btnLoading, setBtnLoading] = useState(false)
    const [btnText, setBtnText] = useState('swap')

    const { writeContract } = useWriteContract()

    const openNotification = (message: string, txHash: string, isSuccess: boolean) => {
        notification.success({
            message: <div className="flex flex-col">
                <span>{message}</span>
                <Link href={`https://testnet.snowscan.xyz/tx/${txHash}`} target="_blank" className="link link-hover">view on explorer</Link>
            </div>,
            type: isSuccess ? "success" : "error",
            placement: "topRight",
        })
    }

    const routerContract = getContract({
        address: SWAP_ROUTER.address,
        abi: SWAP_ROUTER.abi,
        client: {
            public: publicClient!,
        }
    })

    async function getOutAmount(_in: string = inAmount) {
        try {
            const _inAmount = String(Number(_in))
            const [, amountsOut] = await routerContract.read.getAmountsOut([
                parseEther(_inAmount),
                [WETH, SST]
            ])

            const _out = formatEther(subtractSlippage(amountsOut, 0.01))
            setOutAmount(String(Number(_out).toFixed(2)))
            return _out
        } catch (err) {
            setOutAmount('0')
            return '0'
        }
    }

    useEffect(() => {
        if (inAmount != '') {
            getOutAmount();
        }
    }, [inAmount]);

    useEffect(() => {
        getPrice();
    }, [])

    async function getPrice() {
        const [, out] = await routerContract.read.getAmountsOut([
            parseEther("1"),
            [WETH, SST]
        ]);
        setPrice(formatNumber(formatEther(out)));
    }

    async function swap() {
        if (!inToken || !outToken || !inAmount || !outAmount || btnLoading) {
            return
        }

        if (inToken == WETH) {
            const path = [inToken, outToken] as Address[]

            // const gas = await publicClient.estimateContractGas({
            //     account: address,
            //     address: SWAP_ROUTER.address,
            //     abi: SWAP_ROUTER.abi,
            //     functionName: 'swapExactAVAXForTokens',
            //     args: [
            //         parseEther(outAmount),
            //         path,
            //         address,
            //         BigInt(Math.floor(Date.now() / 1000 + 300))
            //     ],
            //     value: parseEther(inAmount)
            // })

            try {
                const { request } = await publicClient.simulateContract({
                    account: account.address,
                    address: SWAP_ROUTER.address,
                    abi: SWAP_ROUTER.abi,
                    functionName: 'swapExactAVAXForTokens',
                    args: [
                        parseEther(outAmount),
                        path,
                        account.address!,
                        BigInt(Math.floor(Date.now() / 1000 + 300))
                    ],
                    value: parseEther(inAmount)
                })
                writeContract(request, {
                    async onSettled(txHash) {
                        if (!txHash) {
                            setBtnLoading(false)
                            return
                        }
                        const tx = await publicClient.waitForTransactionReceipt(
                            { hash: txHash! }
                        )
                        openNotification(`Swap ${inAmount} Avax for ${outAmount} SST`, txHash!, tx.status == "success")

                        setBtnLoading(false)
                        setBtnText("swap")

                    }
                })
                setBtnLoading(true)
                setBtnText("waiting for transaction")

            } catch (err) {
                setBtnLoading(false)
                setBtnText("swap")
                console.log(err)
            }

        }

    }

    return <div className="card-body">
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
                1 Avax = <span className="max-w-[70%] truncate">{price}</span> SST
            </div>
            <div className="collapse-content">
                <div className="flex justify-between">
                    <span>Price Impact: </span>
                    <span>1%</span>
                </div>
                {/* <div className="flex justify-between"> */}
                {/*     <span>network fee: </span> */}
                {/*     <span>0.001eth</span> */}
                {/* </div> */}
            </div>
        </div>

        <div
            onClick={swap}
            className="btn bg-[#F31260] hover:bg-[#F3126090] border-none mt-6 mx-16 text-white">
            {
                btnLoading && <span className="loading loading-spinner"></span>
            }
            {btnText}
        </div>
    </div>
}
