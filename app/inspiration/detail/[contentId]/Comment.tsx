'use client'

import { Avatar } from "@nextui-org/react"
import { commentList, commentSave } from "actions/content";
import clsx from "clsx";
import { generateColorFromAddress } from "utils/util";

export function Comment({
    contentId
}: {
    contentId: string;
}) {
    const [comment, setComment] = useState('')
    const [comments, setCommnets] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        loadComments()
    }, [])

    const loadComments = async () => {
        const res = await commentList(contentId)
        setCommnets(res.data || [])
    }

    const handleSend = async () => {
        setLoading(true)
        const b = JSON.stringify({
            contentId,
            description: comment,
        })
        await commentSave(b)
        setComment('')
        loadComments()
        setLoading(false)
    }

    return <div className="mx-32 mt-14">
        <div className="relative inline-block w-1/2">
            <textarea value={comment} onChange={e => setComment(e.target.value)} className="textarea textarea-secondary border-[#f31260] focus:outline-none  focus:border-[#f31260] resize-none w-full" rows={3}>
            </textarea>
            <div
                onClick={() => handleSend()}
                className={clsx([
                    'text-[#f31260] absolute bottom-4 right-2 text-3xl block cursor-pointer',
                    loading ? 'loading' : 'icon-[ic--baseline-send]',
                ])}
            ></div>
        </div>

        {/* comment list */}
        <div className="mt-8">
            {
                comments.map((item: any) => {
                    return <div key={item.createdAt} className="card shadow-md rounded-lg relative p-4 mx-12 my-4 bg-white from-[#ff0844] to-[#ffb199]">
                        <div className="absolute left-0 top-0 -translate-x-1/2 translate-y-1/2">
                            <div className="rounded-full w-8 h-8" style={{
                                backgroundImage: generateColorFromAddress(item.accountAddress)
                            }}></div>
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
