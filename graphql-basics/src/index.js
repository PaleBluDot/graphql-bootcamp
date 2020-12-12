import { GraphQLServer } from 'graphql-yoga'

// ! Scalar Types !
// __ String, Boolean, Int, Float, ID


// __Type Definitions (schema)
const typeDefs = `
	type Query {
		title: String!
		price: Float!
		releaseYear: Int
		rating: Float
		inStock: Boolean!
	}
`


// __Resolvers
const resolvers = {
	Query: {
		title() {return 'Pepsi'},
		price() {return 3.75},
		releaseYear() {return 1936},
		rating() {return 4.8},
		inStock() {return true}
	}
}


const server = new GraphQLServer({
	typeDefs,
	resolvers,
})

server.start(() => {
	console.log("Server is up!");
})