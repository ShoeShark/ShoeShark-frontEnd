'use client'

import { CalendarDate, DateRangePicker, RangeValue } from "@nextui-org/react";
import { log } from "lib/util";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";
import WindowedSelect from "react-windowed-select";

interface ISelectOption {
    value: string;
    label: string;
}

export default function CreateForm({
    onSubmit,
}) {
    const router = useRouter()
    const [cityList, setCityList] = useState<ISelectOption[]>([])

    const [city, setCity] = useState<ISelectOption | null>(null)
    const [date, setDate] = useState<{ start: CalendarDate, end: CalendarDate } | null>(null)
    const [budget, setBudget] = useState<number>(0)
    const [peoplecount, setPeoplecount] = useState<number>(0)
    const [favorite, setFavorite] = useState<string>('')

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

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault()
        const p = {
            city: city.value,
            date_start: formatDate(date.start),
            date_end: formatDate(date.end),
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

    return <div className="pb-24">
        <h1 className="text-5xl text-black font-bond my-12 text-center">Plan your next adventure</h1>
        <form className="w-1/2 mx-auto text-center" onSubmit={handleSubmit}>
            <label className="form-control w-full mb-6">
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

            <label className="form-control w-full mb-6">
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

            <label className="form-control w-full mb-6">
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

            <label className="form-control w-full mb-6">
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

            <label className="form-control w-full mb-6">
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
                className="btn bg-black text-white mt-8"
            >
                Create Adventure
            </button>
        </form>
    </div>
}
