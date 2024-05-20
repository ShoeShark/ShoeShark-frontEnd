'use client'

import Image from "next/image"
import clsx from 'clsx'

export function Donate() {
    const [opened, setOpened] = useState(true)

    return <div>
        {
            opened && <dialog className='modal modal-open'>
                <div className="modal-box w-[360px]">
                    <button onClick={() => setOpened(false)} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    <div>
                        <h1 className="font-bold text-2xl my-6">Enter Amount</h1>
                        <input type="text" placeholder="" className="input input-bordered w-full" />
                        <div className="flex justify-between items-center my-4">
                            <div>Avaiable: 100.00</div>
                            <span className="badge badge-neutral cursor-pointer">Max</span>
                        </div>
                        <button className="btn btn-primary">Confirm</button>
                    </div>
                </div>
            </dialog>
        }

        <div className="inline-flex items-center p-4 rounded-lg bg-gray-300">
            <div className="mr-2">If you find this content helpful, feel free to show your support with a tip.</div>
            <Image onClick={() => setOpened(true)}  className="cursor-pointer" src='/donate.png' width={24} height={24} alt="donate" />
        </div>
    </div>

}
