import { formatDate, generateColorFromAddress, getInitialContent, log } from "utils/util";
import { useRouter } from "next/navigation";
import { RichEditor } from "components/RichEditor";
import Link from "next/link";
import { formatAddress } from "utils/format";
import MotionLayout from "components/MotionLayout";
import clsx from "clsx";

export default function List({
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

    return <MotionLayout className="grid grid-cols-1 md:grid-cols-2 bg-white py-10 rounded-lg px-8 gap-5 ml-8">
        {
            list.map((item, index) => {
                return <Link
                    href={`/inspiration/detail/${item.contentId}`}
                    key={item.contentId + index}
                    className={clsx([
                        "card bg-base-100 shadow-center transition-all cursor-pointer sm-bg-blue",
                        "shadow-[0_0_12px_1px_#00000020] hover:shadow-[0_0_22px_2px_#00000020]"
                    ])}
                >
                    <div className="card-body flex flex-col justify-between">
                        <div>
                            <div className="font-bold text-xl">{item.title}</div>
                            <div className="py-2 max-h-32 overflow-hidden w-full">
                                <RichEditor initialContent={getInitialContent(item.description, 2)} editable={false} />
                            </div>
                        </div>
                        <div>
                            {
                                item.location &&
                                <div className="badge badge-primary border-gray-300 my-2">{item.location}</div>
                            }
                            <div className="flex items-center justify-between">
                                <div className="w-1/3 flex gap-2 items-center">
                                    <div className="rounded-full w-5 h-5" style={{
                                        backgroundImage: generateColorFromAddress(item.accountAddress)
                                    }}></div>
                                    <div className="truncate ">{formatAddress(item.accountAddress)}</div>
                                </div>
                                <div className="truncate w-[160px]">{item.createdAt}</div>
                            </div>
                        </div>
                    </div>
                </Link>
            })
        }
    </MotionLayout>
}
