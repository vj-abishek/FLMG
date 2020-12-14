/** @jsx jsx */
import { jsx } from "theme-ui"
import { useContext } from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { Dispatch, State } from "../context/state"
import { Helmet } from "react-helmet"
import Page from "../components/Page"
import '../Styles/print.css'

const IndexPage = () => {
  const state = useContext(State)
  const dispatch = useContext(Dispatch)

  const handleClick = () => {
    dispatch({ type: "ADD_PAGE" })
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
        {state && state.page.map((_, i) => (
          <Page key={i} index={i}/>
        ))}
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
