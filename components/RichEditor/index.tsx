'use client'

import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";
import { BlockNoteView } from "@blocknote/mantine";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteEditor, PartialBlock } from "@blocknote/core";

export const RichEditor = forwardRef(({
    initialContent=[{
        type: 'paragraph',
        content: '',
    }],
    editable=true,
    onChange=() => {},
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
        })
    }, [initialContent])

    useImperativeHandle(ref, () => ({
        getEditor: () => editor,
    }))

    return <BlockNoteView
        editable={editable}
        editor={editor}
        onChange={onChange}
    />
})
