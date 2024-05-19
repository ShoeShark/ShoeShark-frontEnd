'use client'

import { useRouter, useSearchParams } from "next/navigation"

export function Filter() {
    const searchParams = useSearchParams()
    const router = useRouter()

    const handleFilter = () => {

    }

    return <div className="self-start w-[200px] card bg-base-100 shadow-xl">
        <div className="card-body">
            <div>
                <p className="font-bold my-2">Sort By</p>
                <select className="select select-bordered w-full select-sm">
                    <option disabled selected>Who shot first?</option>
                    <option>Han Solo</option>
                </select>
            </div>

            <div>
                <p className="font-bold my-2">Destination</p>
                <input type="text" placeholder="Type here" className="input input-bordered w-full input-sm" />
            </div>

            <div>
                <p className="font-bold my-2">Duration</p>
                <select className="select select-bordered w-full select-sm">
                    <option disabled selected>Who shot first?</option>
                    <option>Han Solo</option>
                </select>
            </div>



            <button className="btn bg-base-content text-base-100 mt-2">Filter</button>
        </div>
    </div>
}
