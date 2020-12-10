import * as React from "react"

export const State = React.createContext()
export const Dispatch = React.createContext()

const initialState = {
  fontFamily: "Homemade Apple",
  letterSpacing: 1,
  inkType: "#21abcd",
  fontSize: "16px",
  docName: "FLMG",
}

function countReducer(state, { type, payload }) {
  switch (type) {
    case "SET_FONT": {
      return {
        ...state,
        fontFamily: payload.font
      }
    }
    case "SET_COLOR": {
      return {
        ...state,
        color: payload.color
      }
    }
    case "SET_SIZE": {
      return {
        ...state,
        fontSize: payload.size
      }
    }
    default: {
      throw new Error(`Unhandled action type: ${type}`)
    }
  }
}
function Provider({ children }) {
  const [state, dispatch] = React.useReducer(countReducer, initialState)
  return (
    <State.Provider value={state}>
      <Dispatch.Provider value={dispatch}>{children}</Dispatch.Provider>
    </State.Provider>
  )
}
export { Provider }
