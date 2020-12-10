const React = require("react")
const { Provider } = require("./src/context/state")

exports.wrapRootElement = ({ element }) => <Provider>{element}</Provider>
