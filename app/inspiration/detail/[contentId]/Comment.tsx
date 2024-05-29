'use client'

import { Avatar } from "@nextui-org/react"
import { commentList, commentSave } from "actions/content";
import toast from "react-hot-toast";
import { log } from "utils/util";

export function Comment({
    contentId
}: {
    contentId: string;
}) {
    const [comment, setComment] = useState('')
    const [comments, setCommnets] = useState([])

    useEffect(() => {
        loadComments()
    }, [])

    const loadComments = async () => {
        const res = await commentList(contentId)
        setCommnets(res.data || [])
        log('haha', res.data)
    }

    const handleSend = async () => {
        const b = JSON.stringify({
            contentId,
            description: comment,
        })
        await commentSave(b)
        setComment('')
        loadComments()
    }

    return <div className="mx-32 mt-14">
        <div className="relative inline-block w-full">
            <textarea value={comment} onChange={e => setComment(e.target.value)} className="textarea textarea-secondary border-[#f31260] focus:outline-none  focus:border-[#f31260] resize-none w-full" rows={3}>
            </textarea>
            <div
                onClick={() => handleSend()}
                className="icon-[ic--baseline-send] text-[#f31260] absolute bottom-4 right-2 text-3xl block cursor-pointer"
            ></div>
        </div>

        {/* comment list */}
        <div className="mt-8">
            {
                comments.map((item: any) => {
                    return <div key={item.createdAt} className="card shadow-md rounded-lg relative p-4 mx-12 my-4 bg-gradient-to-r from-[#fdcbf155] to-[#ace0f955]">
                        <div className="absolute left-0 top-0 -translate-x-1/2 translate-y-1/2">
                            <Avatar name={item.accountAddress} className="bg-[#f31260cc] text-white" src="" />
                        </div>
                        <div className="text-left pl-4">
                            <div className="font-bold">{item.accountAddress}</div>
                            <div className="my-2">{item.description}</div>
                            <div className="text-right">{item.createdAt}</div>
                        </div>
                    </div>
                })
            }
        </div>
    </div>
}
