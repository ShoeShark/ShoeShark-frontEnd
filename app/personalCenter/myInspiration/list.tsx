"use client"
import { contentList } from "actions/content";
import { Listbox, ListboxItem, ScrollShadow } from "@nextui-org/react";
import Action from "./action"

type props = {
    listdata: Record<string, any>[]
}

export default function List({ listdata }: props) {

    console.log(listdata)
    return <div>
        <ScrollShadow className="w-full h-[calc(100vh-14rem)] px-8">
            {
                listdata?.map(data =>
                    <div key={data.content_id} className="card my-4 flex flex-row w-full shadow-[0_0_12px_2px_#00000020] bg-base-100 shadow-md">
                        <figure className="pl-8 py-4 flex items-center w-[14%]">
                            <img src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" className="rounded-xl w-28 h-28" />
                        </figure>
                        <div className="card-body p-6 w-[86%]">
                            <h2 className="card-title">{data.title}</h2>
                            <div className="truncate w-full overflow-hidden">{data.description}</div>
                        </div>
                        <div className="card-actions items-end absolute bottom-4 right-4">
                            <Action />
                        </div>
                    </div>
                )
            }
        </ScrollShadow>
    </div>
}
