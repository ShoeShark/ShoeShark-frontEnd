"use client"

import { contentDelete } from 'actions/content';
import type { PopconfirmProps } from 'antd';
import { message, Popconfirm } from 'antd';
import { publicClient } from 'config';
import { CONTENT_MANAGER } from 'contracts/ContentManager';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { log } from 'utils/util';
import { useWriteContract } from 'wagmi';

export default function Action({
    contentId
}: {
    contentId: string;
}) {
    const router = useRouter()
    const { writeContractAsync } = useWriteContract()

    const confirm: PopconfirmProps['onConfirm'] = async (e) => {
        const tx = await writeContractAsync({
            ...CONTENT_MANAGER,
            functionName: "deleteContent",
            args: [contentId]
        })
        if (!tx) return
        const { status } = await publicClient.waitForTransactionReceipt({ hash: tx })

        if (status == "success") {

            message.success('delete success');
            router.refresh()
        } else {
            message.error("delete error")
        }
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
