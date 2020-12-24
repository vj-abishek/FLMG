/** @jsx jsx */
import { jsx } from "theme-ui"
import Editor from "draft-js-plugins-editor"
import {
  EditorState,
  Modifier,
  getDefaultKeyBinding,
  DraftHandleValue,
  KeyBindingUtil,
  ContentState,
} from "draft-js"
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
  const [oldState, setOldState] = useState("")

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

  function tabKeyBindingFn(e: any): string | null {
    const { hasCommandModifier } = KeyBindingUtil
    if (e.keyCode === 9) {
      return "tab"
    }

    if (
      e.keyCode === 83 /* `S` key */ &&
      hasCommandModifier(e) /* + `Ctrl` key */
    ) {
      return "save"
    }

    return getDefaultKeyBinding(e)
  }

  const handleTab = (command: string): DraftHandleValue => {
    if (command === "tab") {
      const tabCharacter = "    "
      let currentState = editorState
      let newContentState = Modifier.replaceText(
        currentState.getCurrentContent(),
        currentState.getSelection(),
        tabCharacter
      )

      setEditorState(
        EditorState.push(currentState, newContentState, "insert-characters")
      )
      return "handled"
    }

    if (command === "save") {
      document.getElementById("save").click()
    }

    return "not-handled"
  }
  if (state?.speechStatus) {
    console.log(state.fromSpeech)
    if (state.fromSpeech !== "" && oldState !== state.fromSpeech) {
      setOldState(state.fromSpeech)
      const text = ` ${state.fromSpeech}`
      let currentState = editorState
      let newContentState = Modifier.replaceText(
        currentState.getCurrentContent(),
        currentState.getSelection(),
        text
      )

      setEditorState(() =>
        EditorState.push(currentState, newContentState, "insert-characters")
      )
    }
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
      className="no-border every-page"
      sx={{
        width: ["100%", "210mm", "210mm"],
        minHeight: "297mm",
        backgroundColor: "#fff",
        padding: "15mm",
        position: "relative",
        border: "1px solid #ababab",
      }}
    >
      <div
        onKeyUp={handleKeypress}
        onPaste={handleKeypress}
        ref={pageElement}
        className="no-border"
        sx={{
          border: "1px solid #5c6274",
          height: "266mm",
          padding: ["5px", "10px", "10px"],
          borderRadius: "3px",
          fontSize: state?.fontSize || "12pt",
          color: state?.color || "#21abcd",
          lineHeight: state?.lineHeight || "1",
        }}
      >
        <Editor
          ref={EditorRef}
          editorState={editorState}
          plugins={plugins}
          onChange={setEditorState}
          handleKeyCommand={handleTab}
          keyBindingFn={tabKeyBindingFn}
        />
        <InlineToolbar />
        <SideToolbar />
      </div>
    </div>
  )
}
