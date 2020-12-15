const fauna = require('faunadb')
const client = new fauna.Client({ secret: process.env.API_KEY })

const { Get, Index } = fauna.query

module.exports = (req, res) => {
    res.send('Hello world')
}