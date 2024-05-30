"use client"

import { contentDelete } from 'actions/content';
import type { PopconfirmProps } from 'antd';
import { message, Popconfirm } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { log } from 'utils/util';

export default function Action({
    contentId
}: {
    contentId: string;
}) {
    const router = useRouter()

    const confirm: PopconfirmProps['onConfirm'] = async (e) => {
        console.log(e);
        message.success('Click on Yes');
        const res = await contentDelete(contentId)
        router.refresh()
    };

    return <>
        <Link
            href={`/personalCenter/myInspiration/edit/${contentId}`}
            className="icon-[ic--outline-mode-edit] w-6 h-6">
        </Link>
        <Popconfirm
            title=""
            description="Are you sure to delete this"
            icon={null}
            cancelButtonProps={{
                danger: true
            }}
            okButtonProps={{
                danger: true
            }}
            onConfirm={confirm}
            okText="Yes"
            cancelText="No"
        >
            <button className="icon-[ic--baseline-delete-outline] text-[#F31260] w-6 h-6">
            </button>
        </Popconfirm>
    </>
}
