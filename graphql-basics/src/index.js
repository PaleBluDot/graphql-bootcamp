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


const posts = [{
	id: '1',
	title: 'GraphQL',
	body: 'This is the body of first post...',
	published: true
}, {
	id: '2',
	title: 'Apollo',
	body: 'This is the body of second post...',
	published: true
}, {
	id: '3',
	title: 'NodeJS',
	body: 'This is the body of third post...',
	published: true
}]



// __Type Definitions (schema)
const typeDefs = `
	type Query {
		users(query: String): [User!]!
		posts(title: String, body: String): [Post!]!
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
		},
		posts(parent,args,ctx,info) {
			if(!args.title) {
				return posts
			}

			return posts.filter((posts) => {
				return posts.title.toLowerCase().includes(args.title.toLowerCase())
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