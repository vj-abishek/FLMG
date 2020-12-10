/** @jsx jsx */
import { jsx } from "theme-ui"
import { useContext } from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { State } from "../context/state"
import { Helmet } from "react-helmet"
import Page from "../components/Page"

const IndexPage = () => {
  const state = useContext(State)
  return (
    <Layout>
      <SEO title="Editor" />
      <Helmet>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.2.0/jspdf.umd.min.js"></script>
      </Helmet>
      <div
        id="editor"
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          mt: "3",
          fontFamily: `'${state?.fontFamily || 'Homemade Apple'}', cursive`,
        }}
      >
        <Page />
      </div>
      <div
        sx={{
          paddingTop: "30px",
        }}
      ></div>
    </Layout>
  )
}

export default IndexPage
