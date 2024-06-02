'use client'

import { log } from "utils/util";
import { useEffect, useState } from "react";
import WindowedSelect from "react-windowed-select";
import { contentSave } from "actions/content";
import { useRouter } from "next/navigation";
import { RichEditor } from "components/RichEditor";
import { BlockNoteEditor } from "@blocknote/core";
import { Input, Switch } from "@nextui-org/react";
import toast from "react-hot-toast";
import { uploadToIpfs } from "actions/ipfs";
import { useAccount, useWriteContract } from "wagmi";
import { CONTENT_MANAGER } from "contracts/ContentManager"
import { publicClient } from "config";

interface ISelectOption {
    value: string;
    label: string;
}

export default function InspirationPublishPage() {
    const router = useRouter()
    const editorRef = useRef<{
        getEditor: () => BlockNoteEditor
    }>()
    const { address } = useAccount()

    const [location, setLocation] = useState('')
    const [title, setTitle] = useState('')
    const [isPublic, setIsPublic] = useState(true)
    const [cityList, setCityList] = useState<ISelectOption[]>([])
    const [loading, setLoading] = useState(false)

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
        if (!editorRef.current) {
            return
        }
        const editor = editorRef.current.getEditor()
        const description = JSON.stringify(editor.document)
        const body = {
            location,
            title,
            isPublic,
            description,
        }
        const b = JSON.stringify(body)
        try {
            setLoading(true)
            const data = await contentSave(b)
            toast.success(`Story's Created`)
            router.push('/inspiration/list')
        } catch (err) {
            log('err', err)
        } finally {
            setLoading(false)
        }
    }
    const { writeContract } = useWriteContract()

    async function postToIpfs() {
        if (!editorRef.current) return
        const editor = editorRef.current.getEditor()
        const description = JSON.stringify(editor.document)
        const content = editor.domElement.innerText
        const { IpfsHash } = await uploadToIpfs({
            content,
            title,
            description,
            location
        })

        return IpfsHash
    }

    async function publishContent() {
        if (!address) return
        setLoading(true)
        const ipfs = await postToIpfs()
        writeContract({
            ...CONTENT_MANAGER,
            functionName: "addContent",
            args: [ipfs, address]
        }, {
            async onSettled(tx) {

                if (!tx) {
                    toast.error("Submission failed, please try again")
                    setLoading(false)
                    return
                }
                const data = await publicClient.waitForTransactionReceipt({ hash: tx })

                toast.success("Submission successful, please wait for the review to be approved.")
                setLoading(false)
                router.push("/personalCenter/myInspiration")

            }
        })

    }

    return <div className="p-12">
        <Input type="text" placeholder="title" onChange={e => setTitle(e.target.value)} variant="bordered" />

        <div className="my-4">
            <RichEditor ref={editorRef} editable={true} />
        </div>

        <div className="flex items-center justify-between">
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

            {/* <div className="w-1/2 text-right"> */}
            {/*     <Switch isSelected={isPublic} onValueChange={v => setIsPublic(v)} color="default">Is Public</Switch> */}
            {/* </div> */}

        </div>

        <div className="my-8 text-center">
            <button className="btn bg-main hover:bg-main text-white" onClick={() => publishContent()}>
                {
                    loading ? <span className="loading loading-spinner"></span> : 'Create'
                }
            </button>
        </div>
    </div>
}
// https://white-left-chameleon-515.mypinata.cloud/ipfs/QmQFd8NxtwXyFohjiNSPfKGcdvG21bFjQMjiSq5EnRciPu/0.png
