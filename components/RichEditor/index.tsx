'use client'

import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";
import "./index.scss";
import { BlockNoteView } from "@blocknote/mantine";
import { DefaultReactSuggestionItem, SuggestionMenuController, getDefaultReactSlashMenuItems, useCreateBlockNote } from "@blocknote/react";
import { BlockNoteEditor, PartialBlock, filterSuggestionItems } from "@blocknote/core";
import { uploadImage } from "actions/common";
import { log } from "utils/util";
import toast from "react-hot-toast";

const getCustomSlashMenuItems = (
    editor: BlockNoteEditor
): DefaultReactSuggestionItem[] => {
    const defaultItems = getDefaultReactSlashMenuItems(editor)
    const hiddenItems = [
        'Video',
        'Audio',
        'File'
    ]
    let a = defaultItems.filter(item => !hiddenItems.includes(item.title))
    log('a', a)
    return a
}

export const RichEditor = forwardRef(({
    initialContent = [{
        type: 'paragraph',
        content: '',
    }],
    editable = true,
    onChange = () => { },
}: {
    initialContent?: PartialBlock[];
    editable?: boolean;
    onChange?: any;
}, ref) => {
    const editor = useMemo(() => {
        let ic = Array(8).fill({
            type: 'paragraph',
            content: '',
        })
        if (initialContent) {
            ic = initialContent
        }
        return BlockNoteEditor.create({
            initialContent: ic,
            uploadFile: async (file) => {
                const content = await file.arrayBuffer()
                const f = new File([new Blob([content])], file.name + Date.now(), {
                    type: file.type
                })
                const formData = new FormData()
                formData.append('file', f, f.name)
                try {
                    const res = await uploadImage(formData)
                    const url = `${process.env.NEXT_PUBLIC_OSS_BASE_URL}${res.data}`
                    return url
                } catch (err) {
                    log('err', err)
                    toast.error(err.message)
                    return ''
                }
            }
        })
    }, [])

    useImperativeHandle(ref, () => ({
        getEditor: () => editor,
    }))

    return <BlockNoteView
        className={editable ? "block-editable" : "block-onlyview"}
        editable={editable}
        editor={editor}
        slashMenu={false}
        onChange={onChange}
    >
        <SuggestionMenuController
            triggerCharacter="/"
            getItems={async (query) => filterSuggestionItems(getCustomSlashMenuItems(editor), query)}
        />
    </BlockNoteView>
})
