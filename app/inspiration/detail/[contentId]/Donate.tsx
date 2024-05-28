'use client'

import Image from "next/image"
import clsx from 'clsx'
import { useAccount, useReadContract, useWriteContract } from "wagmi"
import { Address, erc20Abi } from "viem"
import { log } from "utils/util"
import toast from "react-hot-toast"

const CONTRACT_ADDRESS = '0x7d75494BeC827cE2F046b6d73C7307a6dA9B2856'

export function Donate({
    author,
}: {
    author: Address;
}) {
    const [opened, setOpened] = useState(true)
    const [amount, setAmount] = useState('')
    
    const {address} = useAccount()
    log('addr', address)
    const {data: sstBalance, isLoading, status} = useReadContract({
        abi: erc20Abi,
        address: CONTRACT_ADDRESS,
        functionName: 'balanceOf',
        args: [address as Address]
    })
    const {writeContractAsync} = useWriteContract()

    const handleDonate = async () => {
        if (BigInt(amount) > BigInt(sstBalance || 0)) {
            toast.error('Amount is not enough')
            return
        }
        await writeContractAsync({
            abi: erc20Abi,
            address: CONTRACT_ADDRESS,
            functionName: 'transfer',
            args: [
                author,
                BigInt(amount),
            ],
        })
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
                            <div>Avaiable: 100.00 =={sstBalance}=={isLoading}=={status}</div>
                            <span className="block badge badge-neutral cursor-pointer">Max</span>
                        </div>
                        <button onClick={() => handleDonate()} className="btn btn-primary">Confirm</button>
                    </div>
                </div>
            </dialog>
        }

        <div className="inline-flex items-center p-4 rounded-lg bg-gradient-to-r from-[#fdcbf1aa] to-[#ace0f9aa]">
            <div className="mr-2">If you find this content helpful, feel free to show your support with a tip.</div>
            <Image onClick={() => setOpened(true)}  className="cursor-pointer hover:scale-110" src='/donate.png' width={24} height={24} alt="donate" />
        </div>
    </div>

}
