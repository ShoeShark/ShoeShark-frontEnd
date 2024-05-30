import { contentDetail } from "actions/content";
import Link from "next/link";
import { MyInspirationEdit } from "./Edit";

export default async function MyInspirationEditPage({
    params: {
        contentId
    }
}: {
    params: {
        contentId: string;
    }
}) {
    const res = await contentDetail(contentId)
    const detail = res.data

    return <div className=" overflow-y-auto h-full">
        <div className='px-8 pt-8'>
            <Link href='/personalCenter/myInspiration' className="icon-[ic--baseline-arrow-back] cursor-pointer text-3xl text-[#f31260]"></Link>
        </div>

        <MyInspirationEdit detail={detail} />
    </div>
}
