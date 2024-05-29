'use client'

import Image from "next/image"
import clsx from 'clsx'
import { useAccount, useReadContract, useWriteContract } from "wagmi"
import { Address, erc20Abi } from "viem"
import { log } from "utils/util"
import toast from "react-hot-toast"
import { publicClient } from "config"

const CONTRACT_ADDRESS = '0x9d3ce3c0E5282F71D025324312d8Bd80d082538D'

export function Donate({
    author,
}: {
    author: Address;
}) {
    const [opened, setOpened] = useState(false)
    const [amount, setAmount] = useState('')
    const [sstBalance, setSstBalance] = useState(0)
    const { writeContractAsync } = useWriteContract()
    const { address } = useAccount()
    const [loading, setLoading] = useState(false)
    const result = useReadContract({
        abi: erc20Abi,
        address: CONTRACT_ADDRESS,
        functionName: 'balanceOf',
        args: [address as Address]
    })

    useEffect(() => {
        setSstBalance(Number(result.data || 0))
    }, [result.data])

    const handleDonate = async () => {
        if (BigInt(amount) > BigInt(sstBalance)) {
            toast.error('Amount is not valid')
            return
        }
        setLoading(true)
        try {
            const txHash = await writeContractAsync({
                abi: erc20Abi,
                address: CONTRACT_ADDRESS,
                functionName: 'transfer',
                args: [
                    author,
                    BigInt(amount),
                ],
            })
            const result = await publicClient.waitForTransactionReceipt({
                hash: txHash,
            })
            log('result', result)
            toast.success('Transaction Confirmed')
        } catch (err) {
            toast.error(err.message)
        } finally {
            setLoading(false)
        }
    }

    return <div>
        {
            opened && <dialog className='modal modal-open'>
                <div className="modal-box w-[360px]">
                    <button onClick={() => setOpened(false)} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    <div>
                        <h1 className="font-bold text-2xl my-6">Enter Amount</h1>
                        <input onChange={(e) => setAmount(e.target.value)} type="number" placeholder="" className="input input-bordered w-full" />
                        <div className="flex justify-between items-center my-4">
                            <div>Avaiable:  {sstBalance}<span className="badge">SST</span>
                            </div>
                            <div onClick={() => setAmount(String(sstBalance))} className="block badge badge-neutral cursor-pointer">Max</div>
                        </div>
                        <button
                            disabled={loading}
                            onClick={() => handleDonate()}
                            className="btn bg-main hover:bg-main text-white"
                        >
                            {
                                loading ? <span className="loading loading-spinner"></span> : 'Confirm'
                            }
                        </button>
                    </div>
                </div>
            </dialog>
        }

        <div className="inline-flex items-center p-4 rounded-lg bg-gradient-to-r from-[#fdcbf1aa] to-[#ace0f9aa]">
            <div className="mr-2">If you find this content helpful, feel free to show your support with a tip.</div>
            <Image onClick={() => setOpened(true)} className="cursor-pointer hover:scale-110" src='/donate.png' width={24} height={24} alt="donate" />
        </div>
    </div>

}
