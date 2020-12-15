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
            <a 
              href="https://github.com/vj-abishek/FLMG/"
              title="source code"
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
                color:'#000',
                textDecoration:'none',
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 100 100"
                width="50"
                height="50"
              >
                <path fill="#f1bc19" d="M77 12a1 1 0 100 2 1 1 0 100-2z" />
                <path
                  fill="#e4e4f9"
                  d="M50 13a37 37 0 100 74 37 37 0 100-74z"
                />
                <path fill="#f1bc19" d="M83 11a4 4 0 100 8 4 4 0 100-8z" />
                <path fill="#8889b9" d="M87 22a2 2 0 100 4 2 2 0 100-4z" />
                <path
                  fill="#fbcd59"
                  d="M81 74a2 2 0 100 4 2 2 0 100-4zM15 59a4 4 0 100 8 4 4 0 100-8z"
                />
                <path fill="#8889b9" d="M25 85a2 2 0 100 4 2 2 0 100-4z" />
                <path
                  fill="#fff"
                  d="M18.5 49a2.5 2.5 0 100 5 2.5 2.5 0 100-5zm61-17a1.5 1.5 0 100 3 1.5 1.5 0 100-3z"
                />
                <path
                  fill="#a3a3cd"
                  d="M50 25.625a24.25 24.25 0 100 48.5 24.25 24.25 0 100-48.5z"
                />
                <path
                  fill="#472b29"
                  d="M50 74.825c-13.757 0-24.95-11.192-24.95-24.95S36.243 24.925 50 24.925s24.95 11.192 24.95 24.95S63.757 74.825 50 74.825zm0-48.5c-12.985 0-23.55 10.564-23.55 23.55S37.015 73.425 50 73.425s23.55-10.564 23.55-23.55S62.985 26.325 50 26.325z"
                />
                <path
                  fill="#565fa1"
                  d="M50 29.167a20.5 20.5 0 100 41 20.5 20.5 0 100-41z"
                />
                <path
                  fill="#472b29"
                  d="M69.424 44.625a.501.501 0 01-.478-.354 19.366 19.366 0 00-1.754-4.022.5.5 0 11.865-.5 20.449 20.449 0 011.844 4.228.5.5 0 01-.477.648z"
                />
                <path
                  fill="#472b29"
                  d="M50 70.75c-11.511 0-20.875-9.337-20.875-20.813S38.489 29.125 50 29.125a20.921 20.921 0 0116.501 8.064.5.5 0 01-.789.613A19.92 19.92 0 0050 30.124c-10.959 0-19.875 8.888-19.875 19.813S39.041 69.75 50 69.75s19.875-8.888 19.875-19.813c0-.995-.075-1.996-.222-2.973a.5.5 0 01.989-.148c.154 1.025.233 2.076.233 3.121 0 11.476-9.364 20.813-20.875 20.813z"
                />
                <path
                  fill="#fefdef"
                  d="M61.496 42.088c.365-1.671.206-3.743-.486-5.818-3.622 0-6.339 2.716-6.339 2.716l.02.023c-.064-.001-.126-.009-.191-.009h-9c-.043 0-.085.006-.128.006l.017-.02s-2.717-2.716-6.339-2.716c-.684 2.053-.85 4.104-.5 5.767A9.458 9.458 0 0036 48.5a9.5 9.5 0 009.5 9.5h1.073a4.87 4.87 0 00-2.493 3.498c-1.72.232-3.979.18-5.028-1.394-1.811-2.717-2.717-2.717-3.622-2.717s-.906.906 0 1.811c.906.906.906.906 1.811 2.717.772 1.543 2.812 3.298 6.76 2.663v3.523c0 .447.079.871.191 1.282 2.425.577 6.502 1.061 11.665-.151.086-.364.143-.739.143-1.13v-5.816c0-1.858-1.047-3.456-2.573-4.286H54.5a9.5 9.5 0 009.5-9.5 9.456 9.456 0 00-2.504-6.412z"
                />
                <path
                  fill="#472b29"
                  d="M49.532 70.486c-2.23 0-4.075-.287-5.457-.616a.5.5 0 01-.367-.355 5.293 5.293 0 01-.208-1.413V65.15c-4.563.514-6.279-2.154-6.707-3.011-.87-1.739-.87-1.739-1.717-2.587-.701-.701-.979-1.458-.745-2.023.169-.408.569-.642 1.098-.642 1.217 0 2.219.211 4.038 2.939.839 1.258 2.676 1.379 4.193 1.218a5.326 5.326 0 011.423-2.554c-5.321-.218-9.583-4.615-9.583-9.99 0-2.442.891-4.78 2.513-6.613-.306-1.722-.108-3.761.564-5.775a.5.5 0 01.474-.342c3.357 0 5.931 2.16 6.552 2.73h8.854c.621-.57 3.195-2.73 6.552-2.73a.5.5 0 01.474.342c.679 2.037.872 4.096.551 5.83a9.969 9.969 0 012.465 6.559c0 5.375-4.263 9.773-9.585 9.991a5.355 5.355 0 011.585 3.794v5.816c0 .392-.052.8-.158 1.246a.497.497 0 01-.372.371c-2.387.561-4.55.767-6.437.767zm-4.93-1.521c2.412.537 6.153.9 10.83-.148.045-.253.068-.489.068-.715v-5.816c0-1.597-.886-3.07-2.312-3.846a.5.5 0 01.238-.94H54.5c4.962 0 9-4.037 9-9a8.976 8.976 0 00-2.373-6.074.501.501 0 01-.12-.444c.331-1.517.202-3.352-.36-5.202-2.87.153-5.098 2.074-5.542 2.484a.493.493 0 01-.429.246l-.103-.006L45.5 39.5a.649.649 0 01-.442-.181l-.021.021c-.025-.024-2.438-2.39-5.623-2.561-.557 1.831-.69 3.649-.373 5.154a.5.5 0 01-.124.444A8.964 8.964 0 0036.5 48.5c0 4.963 4.038 9 9 9h1.073a.499.499 0 01.238.94 4.344 4.344 0 00-2.238 3.139.499.499 0 01-.427.415c-2.664.358-4.568-.198-5.511-1.611-1.663-2.494-2.412-2.494-3.206-2.494-.137 0-.18.032-.181.032-.025.064.043.435.534.926.963.963.998 1.033 1.905 2.847.369.736 1.911 3.093 6.233 2.392a.51.51 0 01.404.113.504.504 0 01.176.381v3.523c0 .269.033.548.102.862z"
                />
                <path
                  fill="#fefdef"
                  d="M60.437 51.362c-.9 1.994-2.876 3.652-6.354 3.93"
                />
                <path
                  fill="#472b29"
                  d="M54.083 55.542a.251.251 0 01-.249-.23.25.25 0 01.229-.269c3.805-.305 5.442-2.227 6.146-3.784a.25.25 0 01.456.205c-1.073 2.377-3.403 3.824-6.562 4.077l-.02.001z"
                />
                <g>
                  <path
                    fill="#fefdef"
                    d="M60.959 47.41a7.375 7.375 0 01-.03 2.342"
                  />
                  <path
                    fill="#472b29"
                    d="M60.93 50.002a.249.249 0 01-.247-.293 7.184 7.184 0 00.029-2.263.248.248 0 01.21-.283.25.25 0 01.284.211 7.56 7.56 0 01-.031 2.421.248.248 0 01-.245.207z"
                  />
                </g>
                <g>
                  <path
                    fill="#fefdef"
                    d="M59.083 43.875c.633.451 1.146 1.179 1.488 2.055"
                  />
                  <path
                    fill="#472b29"
                    d="M60.571 46.181a.252.252 0 01-.233-.159c-.334-.856-.818-1.528-1.4-1.942a.25.25 0 01.29-.409c.662.472 1.207 1.222 1.576 2.169a.251.251 0 01-.233.341z"
                  />
                </g>
              </svg>
              <div
                sx={{
                  ml: "5px",
                }}
              >
              GitHub                 
              </div>
            </a>
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
