/** @jsx jsx */
import { jsx } from "theme-ui"
import Editor from 'draft-js-plugins-editor'
import { EditorState } from 'draft-js'
import createInlineToolbarPlugin from 'draft-js-inline-toolbar-plugin'
import createSideToolbarPlugin from 'draft-js-side-toolbar-plugin'
import { useContext, useEffect, useRef, useState } from "react";
import 'draft-js-inline-toolbar-plugin/lib/plugin.css';
import 'draft-js-side-toolbar-plugin/lib/plugin.css';
import {State} from '../context/state';


const inlineToolbarPlugin = createInlineToolbarPlugin();
const { InlineToolbar } = inlineToolbarPlugin;
const sideToolbarPlugin = createSideToolbarPlugin();
const { SideToolbar } = sideToolbarPlugin;
const plugins = [inlineToolbarPlugin, sideToolbarPlugin];

export default function Page() {
    const [editorState, setEditorState] = useState(() => EditorState.createEmpty(),);

    const state = useContext(State)

    const EditorRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const isMobile = 'ontouchstart' in window || navigator.msMaxTouchPoints;
        if (isMobile) return;

        EditorRef?.current.focus();
    }, [])
    return (
        <div
            id="page1"
            onClick={() => { EditorRef?.current.focus() }}
            sx={{
                width: "819px",
                height: "968px",
                backgroundColor: "#fff",
                padding: '2.4em',
                position:'relative',
            }}
        >

            <div sx={{
                border: '1px solid #5c6274',
                height: '100%',
                padding: '10px',
                borderRadius:'1px',
                fontSize: state.fontSize,
                color: state.color,
            }}>
                <Editor ref={EditorRef}
                 editorState={editorState} 
                 plugins={plugins}
                  onChange={setEditorState} />
                <InlineToolbar />
                <SideToolbar/>
            </div>
        </div>
    )
}
