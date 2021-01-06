/** @jsx jsx */
import { jsx } from "theme-ui"
import { useContext, useState } from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { Dispatch, State } from "../context/state"
import { Helmet } from "react-helmet"
import Page from "../components/Page"
import "../Styles/print.css"

const IndexPage = () => {
  const state = useContext(State)
  const dispatch = useContext(Dispatch)
  const [animation, setAnimatio] = useState(false)

  const handleClick = () => {
    dispatch({ type: "ADD_PAGE" })
  }

  const handleMicClick = () => {
    setAnimatio(current => !current)
    if (typeof window !== "undefined") {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition

      const recognition = new SpeechRecognition()
      recognition.interimResults = false
      recognition.addEventListener("result", event => {
        const transcript = Array.from(event.results)
          .map(result => result[0])
          .map(result => result.transcript)
          .join("")
        if (!animation) {
          dispatch({ type: "SET_SPEECH_TO_TEXT", payload: transcript })
          console.log(transcript)
        }
      })

      recognition.addEventListener("speechstart", () => {
        dispatch({ type: "SET_SPEECH_START" })
      })

      recognition.addEventListener("speechend", () => {
        dispatch({ type: "CLEAR_SPEECH_END" })
      })

      if (!animation) {
        recognition.addEventListener("end", recognition.start)
      }

      if (animation) {
        recognition.stop()
      }
      recognition.start()
    }
  }
  return (
    <Layout>
      <SEO title="Editor" />
      <Helmet>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
      </Helmet>
      <div
        id="editor"
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          mt: "3",
          alignItems: "center",
          flexDirection: "column",
          fontFamily: `'${state?.fontFamily || "Caveat"}', cursive`,
        }}
      >
        {state && state.page.map((_, i) => <Page key={i} index={i} />)}
        <button
          className="no-print"
          onClick={handleClick}
          sx={{
            backgroundColor: "primary",
            border: "solid 2px transparent",
            padding: "0 12px",
            borderRadius: "16px",
            boxShadow: "2px 5px 6px rgba(0,0,0,0.1)",
            cursor: "pointer",
            mt: "2",
            opacity: "1",

            "&:hover": {
              opacity: "0.95",
              boxShadow: "0px 0px 0px rgba(0,0,0,0.1)",
            },
          }}
        >
          Add page
        </button>
      </div>

      {/* Microphone button */}
      <div
        className="no-print"
        onClick={handleMicClick}
        sx={{
          width: "50px",
          height: "50px",
          borderRadius: "50%",
          boxShadow: "2px 5px 6px rgba(0,0,0,0.1)",
          border: "0px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "accent",
          position: "fixed",
          right: "20px",
          bottom: "5%",
          cursor: "pointer",
          transform: "scale(1)",
          animation: animation ? "pulse-black 2s infinite" : "",
        }}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          sx={{
            color: "#ccc",
          }}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M9 4C9 2.34315 10.3431 1 12 1C13.6569 1 15 2.34315 15 4V12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12V4ZM13 4V12C13 12.5523 12.5523 13 12 13C11.4477 13 11 12.5523 11 12V4C11 3.44772 11.4477 3 12 3C12.5523 3 13 3.44772 13 4Z"
            fill="currentColor"
          />
          <path
            d="M18 12C18 14.973 15.8377 17.441 13 17.917V21H17V23H7V21H11V17.917C8.16229 17.441 6 14.973 6 12V9H8V12C8 14.2091 9.79086 16 12 16C14.2091 16 16 14.2091 16 12V9H18V12Z"
            fill="currentColor"
          />
        </svg>
      </div>

      <div
        className="no-print"
        sx={{
          paddingTop: "30px",
        }}
      ></div>
    </Layout>
  )
}

export default IndexPage
