import { ScrollShadow } from "@nextui-org/react";
import Action from "./action"
import { getInitialContent, log } from "utils/util";
import Image from "next/image";
import { PartialBlock } from "@blocknote/core";

type props = {
    listdata: Record<string, any>[]
}

const imageFromContent = (content: string) => {
    const s: PartialBlock[] = getInitialContent(content) || []
    const imageBlock = s.find(item => item.type === 'image')
    if (imageBlock) {
        return (imageBlock.props as any).url
    }
    return 'https://p.qqan.com/up/2024-3/17105598292306928.jpg'
}

const textFromContent = (content: string) => {
    const s: PartialBlock[] = getInitialContent(content) || []
    const textBlock = s.find(item => item.type !== 'image')
    const textContent = textBlock?.content ? textBlock.content as any[] : []
    if (textContent.length > 0) {
        const text = textContent[0].text
        return text
    }
    return ''
}

export default function List({ listdata }: props) {
    return <div>
        <ScrollShadow className="w-full h-[calc(100vh-14rem)] px-8">
            {
                listdata?.map(data =>
                    <div key={data.contentId} className="card my-4 flex flex-row w-full shadow-[0_0_12px_2px_#00000020] bg-base-100 shadow-md">
                        <figure className="pl-8 py-4 flex items-center w-[14%]">
                            <Image src={imageFromContent(data.description)} width={28} height={28} alt="img" className="rounded-xl w-28 h-28" />
                            {/* <img src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" className="rounded-xl w-28 h-28" /> */}
                        </figure>
                        <div className="card-body p-6 w-[86%]">
                            <h2 className="card-title">{data.title}</h2>
                            <div className="truncate w-full overflow-hidden">{textFromContent(data.description)}</div>
                        </div>
                        <div className="card-actions items-end absolute bottom-4 right-4">
                            <Action contentId={data.contentId} />
                        </div>
                    </div>
                )
            }
        </ScrollShadow>
    </div>
}
