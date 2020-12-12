import { GraphQLServer } from 'graphql-yoga'

// ! Scalar Types !
// __ String, Boolean, Int, Float, ID


// __ Demo Data
const users = [{
	id: '1',
	name: 'Pavel',
	email: 'Psanchez@aclu.org',
	age: 35
}, {
	id: '2',
	name: 'Thomas',
	email: 'tanderson@dirtyknuckles.com',
	age: 28
}, {
	id: '3',
	name: 'Jane',
	email: 'janderson@dirtyknuckles.com',
}]



// __Type Definitions (schema)
const typeDefs = `
	type Query {
		users(query: String): [User!]!
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
		},
		users(parents,args,ctx,info) {
			if(!args.query) {
				return users
			}

			return users.filter((users) => {
				return users.name.toLowerCase().includes(args.query.toLowerCase())
			})
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