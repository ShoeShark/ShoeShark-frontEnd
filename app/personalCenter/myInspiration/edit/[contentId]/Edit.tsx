'use client'

import { BlockNoteEditor } from "@blocknote/core";
import { contentEdit } from "actions/content";
import { RichEditor } from "components/RichEditor";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { getInitialContent, log } from "utils/util";

export function MyInspirationEdit({
    detail
}) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)

    const editorRef = useRef<{
        getEditor: () => BlockNoteEditor
    }>()

    const handlePublish = async () => {
        if (!editorRef.current) {
            return
        }
        const editor = editorRef.current.getEditor()
        const description = JSON.stringify(editor.document)
        const {
            createdAt,
            ...rest
        } = detail
        const body = {
            ...rest,
            isPublic: true,
            description,
        }
        log('body', body)
        const b = JSON.stringify(body)
        try {
            setLoading(true)
            const data = await contentEdit(b)
            toast.success(`Publish success`)
            router.back()
        } catch (err) {
            log('err', err)
        } finally {
            setLoading(false)
        }
    }

    return <div className="pb-4">
        <div className="px-12 my-8">
            <RichEditor ref={editorRef} initialContent={getInitialContent(detail.description)} editable={true} />
        </div>

        <div className="flex justify-center w-full">
            {/* <button className="btn bg-main hover:bg-main text-white" onClick={() => handlePublish()}>
                {
                    loading ? <span className="loading loading-spinner"></span> : 'Save'
                }
            </button> */}
            <button className="btn bg-main hover:bg-main text-white" onClick={() => handlePublish()}>
                {
                    loading ? <span className="loading loading-spinner"></span> : 'Publish'
                }
            </button>
        </div>
    </div>
}