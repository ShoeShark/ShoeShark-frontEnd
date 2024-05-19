'use client'

import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";
import { BlockNoteView } from "@blocknote/mantine";
import { useCreateBlockNote } from "@blocknote/react";
import { log } from "lib/util";
import { useState } from "react";

const initialContent = []

export default function InspirationPublishPage() {
  const editor = useCreateBlockNote({
    initialContent: Array(15).fill({
      type: 'paragraph',
      content: '',
    })
  });

  const handleCreate = () => {
    log('data', editor.document)
  }

  return <div className="p-12">
    <BlockNoteView
        editor={editor}
        // onChange={() => {}}
    />

    <div className="my-8 text-center">
      <button className="btn btn-primary bg-black text-base-100" onClick={() => handleCreate()}>Create Story</button>
    </div>
  </div>
}
