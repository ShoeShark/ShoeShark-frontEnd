'use client'

import { Input } from "@nextui-org/react";
import clsx from "clsx";
import { useRouter, useSearchParams } from "next/navigation"
import nProgress from "nprogress";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import WindowedSelect from "react-windowed-select";
import { useAccount } from "wagmi";

interface ISelectOption {
    value: string;
    label: string;
}

export function Filter({
    loading,
    onFilter,
}: {
    loading: boolean;
    onFilter: Function,
}) {
    const { address } = useAccount()

    const [location, setLocation] = useState('')
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [cityList, setCityList] = useState<ISelectOption[]>([])

    useEffect(() => {
        fetchCityList()
    }, [])

    const fetchCityList = async () => {
        const res = await fetch('/city.json')
        const data = await res.json()
        const formatData: ISelectOption[] = data.map((item: string) => {
            return {
                value: item,
                label: item
            }
        })
        setCityList(formatData)
    }

    const handleFilter = () => {
        const p = {
            accountAddress: address,
            title: title,
            description,
        }
        onFilter(p)
    }

    return <div className="self-start sticky top-24 w-[240px] card bg-base-100 shadow-xl">
        <div className="card-body">
            {/* <div>
                <p className="font-bold my-2">Sort By</p>
                <select className="select select-bordered w-full select-sm">
                    <option value={123}>Who shot first?</option>
                </select>
            </div> */}

            <div>
                <p className="font-bold my-2">Title</p>
                <Input
                    onChange={e => setTitle(e.target.value)}
                    type="text"
                />
            </div>

            <div>
                <p className="font-bold my-2">Description</p>
                <Input
                    onChange={e => setDescription(e.target.value)}
                    type="text"
                />
            </div>

            <div>
                <p className="font-bold my-2">Destination</p>
                <WindowedSelect
                    required
                    className="rounded-md"
                    placeholder="location"
                    name="city"
                    onChange={(item: ISelectOption) => setLocation(item.value)}
                    options={cityList}
                    windowThreshold={0}
                />
            </div>


            <button
                disabled={loading}
                onClick={() => handleFilter()}
                className="btn bg-[#f31260] hover:bg-[#f31260] text-base-100 mt-2"
            >
                <span className={clsx([
                    loading && 'loading',
                ])}>Filter</span>
            </button>
        </div>
    </div>
}
