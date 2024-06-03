"use client"
import { ScrollShadow } from "@nextui-org/react";
import Action from "./action"
import { getInitialContent, log } from "utils/util";
import Image from "next/image";
import { PartialBlock } from "@blocknote/core";
import { RichEditor } from "components/RichEditor";
import { Address } from "abitype";
import { CONTENT_AUDITOR } from "contracts/Auditor";
import { createConfig, http, useAccount, useWatchContractEvent } from "wagmi";
import { getContentList, getPendingTask, getTaskContent } from "actions/content";
import { publicClient } from "config";
import { createPublicClient } from "viem";
import { avalancheFuji } from "viem/chains";
import { CONTENT_MANAGER } from "contracts/ContentManager";
import { NFT_MARKET } from "contracts/NFTMarket";
import ethers, { Contract, JsonRpcProvider } from "ethers"
import { addPublishPoint } from "actions/points";
import toast from "react-hot-toast";

type props = {
    listdata: Record<string, any>[]
    taskList: readonly `0x${string}`[]
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

export default function List({ listdata, taskList }: props) {
    const { address } = useAccount()

    useEffect(() => {
        const client = createPublicClient({
            chain: avalancheFuji,
            transport: http("https://avalanche-fuji-c-chain-rpc.publicnode.com")

        })
        const unwatch = client.watchContractEvent({
            ...CONTENT_AUDITOR,
            eventName: 'AuditCompleted',
            onLogs: async logs => {
                const isMatch = logs.find(evt => {
                    if (!evt.args) return false
                    const { requestId } = evt.args
                    return taskList.some(task => task == requestId)
                })
                if (!isMatch) return

                if (isMatch.args.result) {
                    await addPublishPoint()
                    toast.success("the review passed!")
                    const list = await getListData()
                    list.sort((p, n) => Number(n.createdAt - p.createdAt))

                    setContentList(list)
                    return
                }
                toast.error("the review was not passed!")
            },
        })

        return unwatch
    }, [])

    // refetch
    async function getListData() {
        const [contentList, taskList] = await Promise.all([
            getContentList(address),
            getPendingTask(address as Address)
        ])

        if (taskList.length) {
            await getTaskDetail(taskList)
            return [...taskData, ...contentList]
        }

        return contentList
    }

    const [taskData, setTaskData] = useState<Record<string, any>[]>([])
    const [contentList, setContentList] = useState<Record<string, any>[]>([])

    async function getTaskDetail(list = taskList) {
        const tasks: any[] = await Promise.all(list.map(getTaskContent))

        setTaskData(tasks)
    }
    async function initLoadList() {
        if (taskList.length)
            await getTaskDetail()

        setContentList([...taskData, ...listdata])
    }
    useEffect(() => {
        initLoadList()
    }, [])

    return <div>
        <span className="pl-4 font-bold">My published inspiration: {contentList?.length}</span>
        <ScrollShadow className="w-full h-[calc(100vh-14rem)] px-8">
            {
                contentList.map(data =>
                    <div key={data.contentId} className="card my-4 flex flex-row w-full bg-base-100 shadow-centerlg">
                        {/* <figure className="pl-8 py-4 flex items-center w-[14%]"> */}
                        {/* <Image src={imageFromContent(data.description)} width={28} height={28} alt="img" className="rounded-xl w-28 h-28" /> */}
                        {/* <img src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" className="rounded-xl w-28 h-28" /> */}
                        {/* </figure> */}
                        <div className="card-body p-6 mb-5">
                            <h2 className="card-title">{data.title}</h2>
                            <div className="py-2 max-h-32 overflow-hidden w-full">
                                <RichEditor initialContent={getInitialContent(data.description, 2)} editable={false} />
                            </div>
                            {/* <div className="truncate w-full overflow-hidden">{textFromContent(data.description)}</div> */}
                        </div>
                        <div className="card-actions items-end absolute bottom-4 right-4">
                            {
                                data.isPending ?
                                    <div className="flex items-center">
                                        <span className="loading loading-spinner mr-3 loading-sm"></span>
                                        waiting for review
                                    </div>
                                    : <Action contentId={data.contentId} />
                            }
                        </div>
                    </div>
                )
            }
        </ScrollShadow>
    </div>
}
