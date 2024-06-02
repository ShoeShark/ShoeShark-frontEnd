'use client'

import { useAccount, useReadContract, useWriteContract } from "wagmi"
import { Address, erc20Abi, formatEther, formatUnits, parseEther, parseUnits } from "viem"
import { log } from "utils/util"
import toast from "react-hot-toast"
import { publicClient } from "config"
import { CONTENT_MANAGER } from "contracts/ContentManager"
import { SST } from "config/constants/token"

export function Donate({
    author,
    id
}: {
    author: Address;
    id: string
}) {
    const [opened, setOpened] = useState(false)
    const [amount, setAmount] = useState('')
    const [sstBalance, setSstBalance] = useState('')
    const [sponsorAmount, setSponsorAmount] = useState('0')
    const { writeContractAsync } = useWriteContract()
    const { address } = useAccount()
    const [loading, setLoading] = useState(false)
    const result = useReadContract({
        abi: erc20Abi,
        address: SST,
        functionName: 'balanceOf',
        args: [address as Address]
    })

    useEffect(() => {
        if (result.data) {
            setSstBalance(formatUnits(result.data, 18) || '0')
        }
    }, [result.data])

    useEffect(() => {
        if (!opened) {
            setAmount('')
        }
    }, [opened])

    const sstContract = {
        abi: erc20Abi,
        address: SST as Address
    }

    async function checkApprove(price: bigint) {
        if (!address) return
        const amount = await publicClient.readContract({
            ...sstContract,
            functionName: "allowance",
            args: [address, CONTENT_MANAGER.address]
        })

        return amount && amount > price
    }

    async function approve(price: bigint) {
        const { request } = await publicClient.simulateContract({
            ...sstContract,
            account: address,
            functionName: "approve",
            args: [CONTENT_MANAGER.address, price],
        });

        const tx = await writeContractAsync(request)
        if (!tx) return false

        const { status } = await publicClient.waitForTransactionReceipt({
            hash: tx,
        })

        if (status == "success") {

            toast.success("approve successful!")
            return true
        } else {

            toast.error("approve failed!")
            return false
        }

    }

    async function getSponsor() {

        const { sponsor } = await publicClient.readContract({
            ...CONTENT_MANAGER,
            functionName: "getContentDetails",
            args: [id]
        })

        setSponsorAmount(formatUnits(sponsor, 18))
    }
    useEffect(() => {
        getSponsor()
    }, [])

    const handleDonate = async () => {
        if (parseFloat(amount) > parseFloat(sstBalance)) {
            toast.error('Amount is not valid')
            return
        }
        setLoading(true)
        if (!await checkApprove(parseUnits(amount, 18))) {
            if (!await approve(parseUnits(amount, 18))) return
        }
        try {
            const txHash = await writeContractAsync({
                ...CONTENT_MANAGER,
                functionName: "sponsorContent",
                args: [
                    id,
                    parseUnits(amount, 18)
                ],
            })
            const result = await publicClient.waitForTransactionReceipt({
                hash: txHash,
            })
            log('result', result)
            toast.success('Transaction Confirmed')
            setOpened(false)
        } catch (err) {
            toast.error(err.message)
        } finally {
            setLoading(false)
        }
    }

    async function claim() {
        setLoading(true)
        try {
            const txHash = await writeContractAsync({
                ...CONTENT_MANAGER,
                functionName: "withdrawSponsorship",
                args: [
                    id,
                ],
            })
            const result = await publicClient.waitForTransactionReceipt({
                hash: txHash,
            })
            log('result', result)
            toast.success('Transaction Confirmed')
            setOpened(false)
            getSponsor()
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
                        <label className="input input-bordered flex items-center gap-2 ">
                            <input value={amount} onChange={(e) => setAmount(e.target.value)} type="number" placeholder="" className="grow" />
                            <span className="badge">SST</span>
                        </label>
                        <div className="flex justify-between items-center my-4">
                            <div>Avaiable:  {sstBalance}</div>
                            <div onClick={() => setAmount(sstBalance)} className="block badge badge-neutral cursor-pointer">Max</div>
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

        {
            author == address ?
                <div onClick={() => claim()} className="cursor-pointer relative inline-flex items-center p-4 rounded-lg bg-gradient-to-r from-[#ff0844] to-[#ffb199] text-white">
                    <div className="mr-2">You have received a reward of {sponsorAmount}. </div>
                    {
                        +sponsorAmount > 0 ? <span className="flex items-center">Click to claim.
                            <i className="icon-[ic--round-switch-access-shortcut] w-8 h-8 text-white" />
                        </span> :
                            <span className="">(Amounts over 100 are eligible for withdrawal.)</span>
                    }
                </div>
                : <div onClick={() => setOpened(true)} className="cursor-pointer inline-flex items-center p-4 rounded-lg bg-gradient-to-r from-[#ff0844] to-[#ffb199] text-white">
                    <div className="mr-2">If you find this content helpful, feel free to show your support with a tip.</div>
                    <i className="icon-[ic--outline-volunteer-activism] w-8 h-8 text-white" />
                </div>
        }
    </div>

}
