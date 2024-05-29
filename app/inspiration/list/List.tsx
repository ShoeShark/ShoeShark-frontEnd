'use client'

import { formatDate, getInitialContent, log } from "utils/util";
import { useRouter } from "next/navigation";
import { RichEditor } from "components/RichEditor";
import Link from "next/link";

export function List({
    loading,
    list,
}: {
    loading: boolean;
    list: any[],
}) {
    const router = useRouter()

    const jumpToDetailPage = (id: number) => {
        router.push(`/inspiration/detail/${id}`)
    }

    return <div className="grid sm:grid-cols-1 lg:grid-cols-3 2xl:grid-cols-4 gap-6 grow ml-8">
        {
            list.map((item, index) => {
                return <Link
                    href={`/inspiration/detail/${item.contentId}`}
                    key={item.contentId + index}
                    className="card bg-base-100 shadow-xl cursor-pointer"
                >
                        <div className="card-body flex flex-col justify-between">
                            <div>
                                <div>{item.title}</div>
                                <div className="py-2">
                                    <RichEditor initialContent={getInitialContent(item.description)} editable={false} />
                                </div>
                            </div>
                            <div>
                                <div className="badge badge-primary my-2">{item.location}</div>
                                <div className="flex items-center justify-between">
                                    <div className="truncate w-1/3">{item.accountAddress}</div>
                                    <div className="truncate w-[160px]">{item.createdAt}</div>
                                </div>
                            </div>
                        </div>
                </Link>
            })
        }
    </div>
}
