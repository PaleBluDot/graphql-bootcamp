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
	id: '11',
	title: 'GraphQL',
	body: 'This is the body of first post...',
	published: true,
	author: '1'

}, {
	id: '12',
	title: 'Apollo',
	body: 'This is the body of second post...',
	published: false,
	author: '1'

}, {
	id: '13',
	title: 'NodeJS',
	body: 'This is the body of third post...',
	published: true,
	author: '2'
}]



// __Type Definitions (schema)
const typeDefs = `
	type Query {
		users(query: String): [User!]!
		posts(query: String): [Post!]!
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
		author: User!
	}
`


// __Resolvers
const resolvers = {
	Query: {
		users(parents,args,ctx,info) {
			if(!args.query) {
				return users
			}

			return users.filter((users) => {
				return users.name.toLowerCase().includes(args.query.toLowerCase())
			})
		},
		posts(parent,args,ctx,info) {
			if(!args.query) {
				return posts
			}

			return posts.filter((post) => {
				const isTitleMatch = post.title.toLowerCase().includes(args.query.toLowerCase())
				const isBodyMatch = post.body.toLowerCase().includes(args.query.toLowerCase())

				return isTitleMatch || isBodyMatch
			})
		}
	},
	Post: {
		author(parent, args, ctx, info) {
			return users.find((user) => {
				return user.id === parent.author
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