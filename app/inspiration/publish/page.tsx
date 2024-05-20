'use client'

import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";
import { BlockNoteView } from "@blocknote/mantine";
import { useCreateBlockNote } from "@blocknote/react";
import { log } from "utils/util";
import { useEffect, useState } from "react";
import WindowedSelect from "react-windowed-select";
import { contentSave } from "actions/content";
import { useRouter } from "next/navigation";

const initialContent = []
interface ISelectOption {
    value: string;
    label: string;
}

export default function InspirationPublishPage() {
    const router = useRouter()
    const editor = useCreateBlockNote({
        initialContent: Array(8).fill({
            type: 'paragraph',
            content: '',
        })
    });
    const [location, setLocation] = useState('')
    const [title, setTitle] = useState('')
    const [cityList, setCityList] = useState<ISelectOption[]>([])

    useEffect(() => {
        fetchCityList()
    }, [])

    const fetchCityList = async () => {
        const res = await fetch('/city.json')
        const data = await res.json()
        const formatData: ISelectOption[] = data.map((item: string) => {
            return {
                value: item,
                label: item
            }
        })
        setCityList(formatData)
    }

    const handleCreate = async () => {
        log('data', editor.document)
        const description = JSON.stringify(editor.document)
        const body = {
            location,
            title,
            isPublic: true,
            description,
        }
        const b = JSON.stringify(body)
        log('b', b)
        try {
            const data = await contentSave(b)
            log('save success', data)
            router.push('/inspiration/list')
        } catch(err) {
            log('err', err)
        }
    }

    return <div className="p-12">
        <input type="text" placeholder="title" onChange={e => setTitle(e.target.value)} className="input input-bordered w-full" />

        <div className="my-4">
            <BlockNoteView
                editor={editor}
            // onChange={() => {}}
            />
        </div>

        <div>
            <div className="w-1/2">
                <WindowedSelect
                    required
                    placeholder="location"
                    name="city"
                    onChange={(item: ISelectOption) => setLocation(item.value)}
                    options={cityList}
                    windowThreshold={0}
                />
            </div>

        </div>


        <div className="my-8 text-center">
            <button className="btn btn-primary bg-black text-base-100" onClick={() => handleCreate()}>Create Story</button>
        </div>
    </div>
}
// https://white-left-chameleon-515.mypinata.cloud/ipfs/QmQFd8NxtwXyFohjiNSPfKGcdvG21bFjQMjiSq5EnRciPu/0.png