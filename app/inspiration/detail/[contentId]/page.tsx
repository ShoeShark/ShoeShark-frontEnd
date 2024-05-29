import { contentDetail } from "actions/content";
import { Comment } from "./Comment";
import { Donate } from "./Donate";
import { formatDate, getInitialContent, log } from "utils/util";
import { RichEditor } from "components/RichEditor";

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
                <div className="pr-16 text-xl">{detail.accountAddress}</div>
                <div className="text-gray-500">{detail.createdAt}</div>
            </div>
        </header>

        <div className="px-12 my-8">
            <RichEditor initialContent={getInitialContent(detail.description)} editable={false} />
        </div>

        <div className="text-center">
            <Donate author={detail.accountAddress} />
            <Comment contentId={contentId} />
        </div>


    </div>
}
