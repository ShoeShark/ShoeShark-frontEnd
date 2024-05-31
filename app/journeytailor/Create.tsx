'use client'

import { Button, CalendarDate, DateRangePicker, Modal, ModalBody, ModalContent, ModalFooter, RangeValue, useDisclosure } from "@nextui-org/react";
import { publicClient } from "config";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";
import WindowedSelect from "react-windowed-select";
import { SHOESHARK_NFT } from "contracts/NFT"
import { useAccount, useWriteContract } from "wagmi";
import { erc20Abi, parseUnits } from "viem";
import { SST } from "config/constants/token";
import Link from "next/link";

interface ISelectOption {
    value: string;
    label: string;
}

export default function CreateForm({
    onSubmit,
}) {
    const router = useRouter()
    const { address } = useAccount()
    const [cityList, setCityList] = useState<ISelectOption[]>([])

    const [city, setCity] = useState<ISelectOption | null>(null)
    const [date, setDate] = useState<{ start: CalendarDate, end: CalendarDate } | null>(null)
    const [budget, setBudget] = useState<number>(0)
    const [peoplecount, setPeoplecount] = useState<number>(0)
    const [favorite, setFavorite] = useState<string>('')

    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [payLoading, setPayLoading] = useState(false)

    useEffect(() => {
        fetchCityData()
    }, [])

    const fetchCityData = async () => {
        const res = await fetch('/city.json')
        const data = await res.json()
        const formatData: ISelectOption[] = data.map((item: string) => {
            return {
                value: item,
                label: item
            }
        })
        console.log(formatData)
        setCityList(formatData)
    }

    const formatDate = (date: CalendarDate) => {
        return `${date.month}.${date.day}`
    }

    async function checkAuth() {
        if (!address) return false
        const balance = await publicClient.readContract({
            ...SHOESHARK_NFT,
            functionName: "balanceOf",
            args: [address!]
        })

        return balance > 0n
    }

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault()

        if (!await checkAuth()) {
            onOpen()
            return
        }

        create()
    }

    function create() {
        const p = {
            city: city?.value,
            date_start: formatDate((date as any).start),
            date_end: formatDate((date as any).end),
            // date_start: date.start.toString(),
            // date_end: date.end.toString(),
            budget,
            peoplecount,
            favorite,
        }
        onSubmit(p)
    }

    const btnDisabled = () => {
        return !city || !date || !budget || !peoplecount || !favorite
    }

    const { writeContract } = useWriteContract()

    async function confirmPay() {

        writeContract({
            abi: erc20Abi,
            address: SST,
            functionName: "transfer",
            args: ["0x7888b7b844b4b16c03f8dacacef7dda0f5188645", parseUnits("10", 18)]
        }, {
            async onSettled(tx) {
                if (!tx) return
                setPayLoading(true)
                await publicClient.waitForTransactionReceipt({ hash: tx })
                setPayLoading(false)
                onOpenChange()
                create()

            }
        })

    }

    return <div className="">
        <h1 className="text-5xl text-black font-bond mt-10 mb-4 text-center">Plan your next adventure</h1>
        <form className="w-1/2 mx-auto text-center" onSubmit={handleSubmit}>
            <label className="form-control w-full mb-2">
                <div className="label">
                    <span className="label-text text-lg">Where do you want to go?</span>
                </div>
                <WindowedSelect
                    required
                    name="city"
                    onChange={(item: ISelectOption) => setCity(item)}
                    options={cityList}
                    windowThreshold={0}
                />
            </label>

            <label className="form-control w-full mb-1">
                <div className="label">
                    <span className="label-text text-lg">Dates</span>
                </div>
                <DateRangePicker
                    onChange={(item: RangeValue<CalendarDate>) => setDate(item)}
                    size="lg"
                    variant="bordered"
                    className="w-full bg-white rounded-2xl"
                />
            </label>

            <label className="form-control w-full mb-1">
                <div className="label">
                    <span className="label-text text-lg">Set your budget</span>
                </div>
                <label className="input input-bordered flex items-center gap-2">
                    <input
                        required
                        type="number"
                        className="grow"
                        onChange={event => setBudget(Number(event.target.value))}
                    />
                    <span className="badge">￥</span>
                </label>
            </label>

            <label className="form-control w-full mb-1">
                <div className="label">
                    <span className="label-text text-lg">How many people are going?</span>
                </div>
                <input
                    required
                    type="number"
                    className="input input-bordered w-full"
                    onChange={event => setPeoplecount(Number(event.target.value))}
                />
            </label>

            <label className="form-control w-full mb-1">
                <div className="label">
                    <span className="label-text text-lg">What are interested in?</span>
                </div>
                <textarea
                    required
                    className="textarea textarea-bordered"
                    onChange={event => setFavorite(event.target.value)}
                />
            </label>

            <button
                disabled={btnDisabled()}
                type="submit"
                className="btn text-white mt-8 bg-[#F31260] hover:bg-[#F3126090]"
            >
                Create Adventure
            </button>
        </form>
        <Button onPress={onOpen}>Open Modal</Button>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalBody>
                            <div className="mt-4">
                                To enjoy the full capabilities of the AI Assistant, you'll need to:
                                Own at least one ShoeShark NFT.
                            </div>
                            <div>
                                Explore <Link href="/tokenZone/nftMarket" className="link text-main link-hover">NFT Market</Link>
                            </div>
                            <div>
                                Or, pay a one-time fee of 10 tokens.
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant="light" onPress={onClose}>
                                Close
                            </Button>
                            <Button isLoading={payLoading} color="danger" onPress={confirmPay}>
                                Pay
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    </div>
}
