/** @jsx jsx */
import { jsx } from "theme-ui"
import Editor from "draft-js-plugins-editor"
import { EditorState } from "draft-js"
import createInlineToolbarPlugin from "draft-js-inline-toolbar-plugin"
import createSideToolbarPlugin from "draft-js-side-toolbar-plugin"
import { useContext, useEffect, useRef, useState } from "react"
import "draft-js-inline-toolbar-plugin/lib/plugin.css"
import "draft-js-side-toolbar-plugin/lib/plugin.css"
import { Dispatch, State } from "../context/state"

const inlineToolbarPlugin = createInlineToolbarPlugin()
const { InlineToolbar } = inlineToolbarPlugin
const sideToolbarPlugin = createSideToolbarPlugin()
const { SideToolbar } = sideToolbarPlugin
const plugins = [inlineToolbarPlugin, sideToolbarPlugin]

export default function Page({ index }) {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  )

  const state = useContext(State)
  const dispatch = useContext(Dispatch)

  const EditorRef = useRef<HTMLInputElement>(null)
  const pageElement = useRef<HTMLInputElement>(null)
  const pageRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const isMobile = "ontouchstart" in window || navigator.msMaxTouchPoints
    if (isMobile) return

    EditorRef?.current.focus()
  }, [])

  function checkOverflow(el: HTMLElement) {
    var curOverflow = el.style.overflow

    if (!curOverflow || curOverflow === "visible") el.style.overflow = "hidden"

    var isOverflowing =
      el.clientWidth < el.scrollWidth || el.clientHeight < el.scrollHeight

    el.style.overflow = curOverflow

    return isOverflowing
  }

  const handleKeypress = () => {
    if (checkOverflow(pageElement?.current)) {
      const page = document.getElementById(`page${+state.currentPage + 1}`)
      if (page) {
        page.focus()
        pageRef?.current.scrollIntoView()
      } else {
        dispatch({ type: "ADD_PAGE" })
        pageRef?.current.scrollIntoView()
      }
    }
  }

  const handleChange = () => {
    dispatch({
      type: "SET_CURRENT_PAGE",
      payload: {
        current: pageRef.current.dataset.index,
      },
    })
  }

  return (
    <div
      id={`page${index + 1}`}
      data-index={index + 1}
      onFocus={handleChange}
      ref={pageRef}
      onClick={() => {
        EditorRef?.current.focus()
      }}
      sx={{
        width: ["100vw", "819px","819px"],
        height: "968px",
        backgroundColor: "#fff",
        padding: "1.7rem",
        position: "relative",
        mt:1,
      }}
    >
      <div
        onInput={handleKeypress}
        onPaste={handleKeypress}
        ref={pageElement}
        sx={{
          border: "1px solid #5c6274",
          height: "100%",
          padding: "10px",
          borderRadius: "1px",
          fontSize: state?.fontSize || "16px",
          color: state?.color || "#21abcd",
        }}
      >
        <Editor
          sx={{
            maxHeight:'calc(841.89px - 10px)',
          }}
          ref={EditorRef}
          editorState={editorState}
          plugins={plugins}
          onChange={setEditorState}
        />
        <InlineToolbar />
        <SideToolbar />
      </div>
  
    </div>
  )
}
