import { GraphQLServer } from 'graphql-yoga'

// ! Scalar Types !
// __ String, Boolean, Int, Float, ID


// __Type Definitions (schema)
const typeDefs = `
	type Query {
		me: User!
		post: Post!
	}

	type User {
		id: ID!
		name: String!
		email: String!
		age: Int
	}

	type Post {
		id: ID!
		title: String!
		body: String!
		published: Boolean!
	}
`


// __Resolvers
const resolvers = {
	Query: {
		me() {
			return {
				id: 'abc123',
				name: 'Pavel Sanchez',
				email: 'psanchez@aclu.org',
				age: 35
			}
		},
		post() {
			return {
				id: '8675309',
				title: 'GraphQL API',
				body: 'This is the body of the post....',
				published: false
			}
		}
	}
}


const server = new GraphQLServer({
	typeDefs,
	resolvers,
})

server.start(() => {
	console.log("Server is up!");
})