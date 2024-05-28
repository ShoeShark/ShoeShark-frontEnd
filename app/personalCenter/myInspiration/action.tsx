"use client"

import type { PopconfirmProps } from 'antd';
import { message, Popconfirm } from 'antd';

export default function Action() {

    const confirm: PopconfirmProps['onConfirm'] = (e) => {
        console.log(e);
        message.success('Click on Yes');
    };

    return <>
        <button className="icon-[ic--outline-mode-edit] w-6 h-6">
        </button>
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
