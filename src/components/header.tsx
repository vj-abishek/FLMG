/** @jsx jsx */
import { jsx, Select, Input, Slider } from "theme-ui"
import html2canvas from "html2canvas"
import { useContext, useEffect, useState } from "react"
import { Helmet } from "react-helmet"
import Image from "./image"
import { Dispatch, State } from "../context/state"
// import "fawn-components/lib/fn-pwa-btn"

// const doc =  new jsPDF("p", "mm", "a4");

// const width = doc.internal.pageSize.getWidth();
// const height = doc.internal.pageSize.getHeight();

const Header = () => {
  const [font, setFont] = useState("Caveat")
  const [overlay, setOverlay] = useState(false)

  const dispatch = useContext(Dispatch)
  const state = useContext(State)

  const googleFonts = "https://fonts.googleapis.com/css2"

  useEffect(() => {
    const cfont = font.split(" ").join("+")
    setFont(cfont)
    dispatch({
      type: "SET_FONT",
      payload: {
        font,
      },
    })
  }, [])

  const handleChange = (e: any) => {
    const currentFont = e.target.value.split(" ").join("+")
    setFont(currentFont)
    dispatch({
      type: "SET_FONT",
      payload: {
        font: e.target.value,
      },
    })
  }

  const handleColorChange = (e: any) => {
    dispatch({
      type: "SET_COLOR",
      payload: {
        color: e.target.value,
      },
    })
  }
  const handleSizeChange = (e: any) => {
    dispatch({
      type: "SET_SIZE",
      payload: {
        size: e.target.value,
      },
    })
  }

  const handleInputChange = (e: any) => {
    if (typeof document !== "undefined") {
      document.title = e.target.value
    }
    dispatch({
      type: "SET_NAME",
      payload: {
        name: e.target.value,
      },
    })
  }

  const setoverlay = () => {
    setOverlay(true)
  }
  const convertToImage = () => {
    state.page.forEach((_, i) => {
      html2canvas(document.querySelector(`#page${i + 1}`)).then(canvas => {
        const image = canvas.toDataURL()
        const a = document.createElement("a")
        a.href = image
        a.setAttribute("download", `${state.docName + i}.png`)
        a.click()
      })
    })
    setOverlay(false)
  }
  return (
    <div className="no-print">
      {overlay && (
        <div
          className="no-print"
          onClick={() => {
            setOverlay(false)
          }}
          sx={{
            position: "fixed",
            top: "0px",
            left: "0px",
            width: "100vw",
            height: "100vh",
            zIndex: 3,
            backgroundColor: "rgba(0,0,0,0.3)",
            backdropFilter: "blur(4px)",
          }}
        />
      )}
      {overlay && (
        <div
          className="no-print"
          sx={{
            p: "3",
            position: "fixed",
            left: "50%",
            borderRadius: "5px",
            top: "50%",
            zIndex: "4",
            transform: "translate(-50%, -50%)",
            fontFamily: "Segoe UI,system-ui,-apple-system,sans-serif",
            background: "#fff",
            boxShadow: "4px 6px 8px rgba(0,0,0,0.1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <h3
            sx={{
              mb: 3,
            }}
          >
            Save as:
          </h3>
          <div
            sx={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "row",
              gap: "2",
            }}
          >
            <button onClick={convertToImage}>PNG image</button>
            <button
              onClick={() => {
                if (typeof window !== "undefined") {
                  window.print()
                  setOverlay(false)
                }
              }}
            >
              PDF Document
            </button>
          </div>
        </div>
      )}
      {font && (
        <Helmet>
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href={`${googleFonts}?family=${font}&display=swap`}
            rel="stylesheet"
          />
        </Helmet>
      )}
      <header
        sx={{
          width: "100%",
          px: 3,
          py: 2,
          fontFamily: "body",
          backgroundColor: "primary",
        }}
      >
        <div
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            sx={{
              width: "50px",
            }}
          >
            <Image alt="FLMG" w="300" h="174" />
          </div>
          <div
            sx={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <div
              title="Share your work"
              sx={{
                width: "auto",
                fontFamily: "body",
                height: "40px",
                backgroundColor: "orange",
                borderRadius: "6px",
                padding: "0px 20px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
                mr: "7px",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                stroke="gray"
                fill="none"
                stroke-linejoin="arcs"
                stroke-linecap="square"
              >
                <g fill-rule="evenodd">
                  <path stroke="transparent" d="M0 0h24v24H0z" />
                  <path d="M18 16a3 3 0 110 6 3 3 0 010-6zM6 9a3 3 0 110 6 3 3 0 010-6zm12-7a3 3 0 110 6 3 3 0 010-6zM8.59 13.51l6.83 3.98-6.83-3.98zm6.82-7l-6.82 3.98 6.82-3.98z" />
                </g>
              </svg>
              <div
                sx={{
                  ml: "5px",
                }}
              >
                Share
              </div>
            </div>
          </div>
        </div>
      </header>
      <div
        sx={{
          width: "100%",
          minHeight: "30px",
          backgroundColor: "background",
          border: "0px",
          px: 3,
          py: 2,
          boxShadow:
            "rgba(0, 0, 0, 0.133) 0px 1.6px 3.6px 0px, rgba(0, 0, 0, 0.11) 0px 0.3px 0.9px 0px",
        }}
      >
        <div
          sx={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: ["flex-start", "flex-start", "center"],
            gap: "1em",
            fontFamily: "body",
          }}
        >
          <Select
            sx={{
              width: "200px",
            }}
            onChange={handleChange}
          >
            <option>Caveat</option>
            <option>Homemade Apple</option>
            <option>Indie Flower</option>
            <option>Patrick Hand</option>
            <option>Nothing You Could Do</option>
            <option>Leckerli One</option>
            <option>Cedarville Cursive</option>
            <option>Crafty Girls</option>
            <option>Chilanka</option>
            <option>Beth Ellen</option>
            <option>Dr Sugiyama</option>
            <option>Long Cang</option>
            <option>Liu Jian Mao Cao</option>
            <option>League Script</option>
            <option value="Kavivanar">Tamil</option>
          </Select>
          <Select
            sx={{
              width: "60px",
            }}
            onChange={handleSizeChange}
          >
            <option value="12px">12</option>
            <option value="16px">16</option>
            <option value="24px">24</option>
            <option value="32px">32</option>
            <option value="64px">64</option>
            <option value="120px">120</option>
          </Select>
          <div
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div>Line height</div>
            <Slider
              min="1"
              max="15"
              onChange={e => {
                const range = e.target.value
                console.log(range)
                dispatch({ type: "SET_LINE_HEIGHT", payload: range })
              }}
              defaultValue={0}
            />
          </div>
          <Select
            sx={{
              width: "120px",
            }}
            onChange={handleColorChange}
          >
            <option value="#16264c">Blue pen</option>
            <option value="#383b3e">Black pen</option>
            <option value="#21abcd">Gel pen</option>
            <option value="#3c4a85">Fountain pen</option>
            <option value="#00C891">green pen</option>
          </Select>
          <Input
            placeholder="Choose a name"
            sx={{
              width: "150px",
            }}
            onChange={handleInputChange}
          />
          <div
            id="save"
            onClick={setoverlay}
            sx={{
              width: "auto",
              height: "40px",
              backgroundColor: "#ebebeb",
              borderRadius: "6px",
              padding: "0px 20px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              boxShadow:
                "rgba(0, 0, 0, 0.133) 0px 1.6px 3.6px 0px, rgba(0, 0, 0, 0.11) 0px 0.3px 0.9px 0px",
              cursor: "pointer",
            }}
          >
            Save
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
