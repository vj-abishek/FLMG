/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

/** @jsx jsx */
import { jsx } from "theme-ui"
import { FC, useContext } from "react"
import {State} from '../context/state'
import Header from "./header"
import "./layout.css"

type DataProp = {
  children: JSX.Element | JSX.Element[]
}

const Layout: FC<DataProp> = ({ children }) => {
  const state = useContext(State)
  return (
    <div>
      <Header />
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 960,
          padding: `0 1.0875rem 1.45rem`,
        }}
      >
        <main>{children}</main>
      </div>
      <footer
        sx={{
          position: "fixed",
          maxWidth: "100vw",
          bottom: "0px",
          width: "100%",
          px: 4,
          fontFamily: "body",
          background: "#E5E5E5",
          border: "0px",
          borderTop: "1px solid #ebebeb",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <div
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "1em",
            fontSize: "12px",
          }}
        >
          <div>Page {state.currentPage} of {state.page.length}</div>
        </div>
        <div
          sx={{
            fontSize: "15px",
          }}
        >
          Built by
          <a href="https://twitter.com/@abishek_py">@abishek_py</a>
        </div>
      </footer>
    </div>
  )
}

export default Layout
