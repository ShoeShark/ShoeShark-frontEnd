import { contentDetail } from "actions/content";
import { Comment } from "./Comment";
import { Donate } from "./Donate";
import { formatDate, generateColorFromAddress, getInitialContent, log } from "utils/util";
import { RichEditor } from "components/RichEditor";
import { formatAddress } from "utils/format";

export default async function InspirationDetailPage({
    params: {
        contentId,
    },
}: {
    params: {
        contentId,
    }
}) {
    const res = await contentDetail(contentId)
    const detail = res.data

    return <div className="w-full">
        <header>
            <h1 className="text-center text-5xl font-bold mt-8 mb-4">title</h1>
            <div className="flex justify-center items-center">
                <div className="flex gap-2 items-center pr-14">
                    <div className="rounded-full w-5 h-5" style={{
                        backgroundImage: generateColorFromAddress(detail.accountAddress)
                    }}></div>
                    <div className="truncate ">{formatAddress(detail.accountAddress)}</div>
                </div>
                <div className="text-gray-500">{detail.createdAt}</div>
            </div>
        </header>

        <div className="mx-8 px-12 py-8 rounded-lg my-8 content-detail-view bg-white">
            <RichEditor initialContent={getInitialContent(detail.description)} editable={false} />
        </div>

        <div className="text-center">
            <Donate author={detail.accountAddress} />
            <Comment contentId={contentId} />
        </div>
    </div>
}
