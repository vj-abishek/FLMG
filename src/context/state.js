import * as React from "react"

export const State = React.createContext()
export const Dispatch = React.createContext()

const initialState = {
  fontFamily: "Homemade Apple",
  letterSpacing: 1,
  inkType: "#21abcd",
  fontSize: "16px",
  docName: "FLMG",
  page: [1],
  currentPage: 1,
  lineHeight: '1',
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
    case 'SET_NAME': {
      return {
        ...state,
        docName: payload.name,
      }
    }
    case 'SET_LINE_HEIGHT': {
      return {
        ...state,
        lineHeight: payload
      }
    }

    case 'ADD_PAGE':
      return {
        ...state,
        page: [...state.page, 1]
      }
    case 'SET_CURRENT_PAGE':
      return {
        ...state,
        currentPage: payload.current,
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
