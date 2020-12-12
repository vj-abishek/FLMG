/** @jsx jsx */
import { jsx, Select, Slider, Input } from "theme-ui"
import html2canvas from 'html2canvas';
// import { jsPDF } from "jspdf/dist/jspdf.node.js";
import { Fragment, useContext, useEffect, useState } from "react"
import {Helmet} from 'react-helmet'
import Image from "./image"
import {Dispatch, State} from '../context/state'
// import "fawn-components/lib/fn-pwa-btn"

// const doc =  new jsPDF("p", "mm", "a4");

// const width = doc.internal.pageSize.getWidth();
// const height = doc.internal.pageSize.getHeight();

const Header = () => {
  const [font, setFont] = useState('Homemade Apple');

  const dispatch = useContext(Dispatch);
  const state = useContext(State);

  const googleFonts = "https://fonts.googleapis.com/css2"

  useEffect(() => { 
    const cfont = font.split(' ').join('+')
    setFont(cfont)
    dispatch({type:'SET_FONT', payload:{
      font
    }});
  },[])

  const handleChange = (e: any) => {
    const currentFont = e.target.value.split(' ').join('+');
    setFont(currentFont);
    dispatch({type:'SET_FONT', payload:{
      font:e.target.value 
    }});
  }

  const handleColorChange = (e: any) => {
    dispatch({type:'SET_COLOR', payload:{
      color: e.target.value,
    }})
  }
  const handleSizeChange = (e: any) => {
    dispatch({type:'SET_SIZE', payload:{
      size: e.target.value,
    }})
  }

  const convertToPdf = () => {
    html2canvas(document.querySelector("#page1")).then(canvas => {
      const image = canvas.toDataURL();
      const a = document.createElement('a')
      a.href = image
      a.setAttribute('download', `${state.docName}.png`);
      a.click();
      // doc.addImage(image, "PNG", 0,0, width, height);
      // console.log(image);
      // doc.save(`${state.docName}.pdf`);
  });
}
  return(
    <Fragment>
      {font && (
        <Helmet>
          <link rel="preconnect" href="https://fonts.gstatic.com"/>
          <link href={`${googleFonts}?family=${font}&display=swap`} rel="stylesheet"/>
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
            {/* <fn-pwa-btn
              title="Install PWA"
              size="40px"
              background="#14213d"
              value="Install"
              testing
            ></fn-pwa-btn> */}
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
            <option>Homemade Apple</option>
            <option>Indie Flower</option>
            <option>Caveat</option>
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
              alignItems: "center",
            }}
          >
            <div>Letter Spacing</div>
            <Slider defaultValue={25} />
          </div>
          <Select
            sx={{
              width: "120px",
            }}
            defaultValue="Hello"
            onChange={handleColorChange}
          >
            <option value="#002b59">Blue pen (dark)</option>
            <option value="#16264c">Blue pen</option>
            <option value="#21abcd">Gel pen</option>
            <option value="#3c4a85">Fountain pen</option>
            <option value="#00C891">green pen</option>
          </Select>
          <Input
            placeholder="Choose a name"
            sx={{
              width: "150px",
            }}
          />
          <div
          onClick={convertToPdf}
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
    </Fragment>
  )
}

export default Header
