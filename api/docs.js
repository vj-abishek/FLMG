const fauna = require('faunadb')
const client = new fauna.Client({ secret: process.env.API_KEY })

const { Get, Index } = fauna.query

const GetDocs = (id) => {

}

const PostDocs = (docs) => {

}

module.exports = (req, res) => {
    if (req.method === "GET") {

    }

    if (req.method === "POST") {

    }
}