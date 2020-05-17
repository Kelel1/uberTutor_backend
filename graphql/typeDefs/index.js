const { gql } = require('apollo-server-express')
const categoriesDefs = require('../modules/categories/typeDefs')
const ratingsDefs = require('../modules/ratings/typeDefs')
const rolesDefs = require('../modules/roles/typeDefs')
const userDefs = require('../modules/users/typeDefs')
const masterDef = gql`
type Query {
    baseQuery: String
}
type Mutation {
    baseMutation: String
}
`
module.exports = [masterDef, categoriesDefs, ratingsDefs, rolesDefs, userDefs]
