import { GraphQLServer } from 'graphql-yoga'

// ! Scalar Types !
// __ String, Boolean, Int, Float, ID


// __ Demo Data
const users = [{
	id: '1',
	name: 'Pavel',
	email: 'Psanchez@aclu.org',
	age: 35,
}, {
	id: '2',
	name: 'Thomas',
	email: 'tanderson@dirtyknuckles.com',
	age: 28,
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

const comments = [{
	id: '101',
	text: 'You got this'
}, {
	id: '102',
	text: 'Making GraphQl look easy'
}, {
	id: '103',
	text: 'First step here, next step beer'
}, {
	id: '104',
	text: 'Started from the bottom!'
}]



// __Type Definitions (schema)
const typeDefs = `
	type Query {
		users(query: String): [User!]!
		posts(query: String): [Post!]!
		comment(query: String): [Comment!]!
	}

	type User {
		id: ID!
		name: String!
		email: String!
		age: Int
		posts: [Post]!
	}

	type Post {
		id: ID!
		title: String!
		body: String!
		published: Boolean!
		author: User!
	}

	type Comment {
		id: ID
		text: String
		author: User!
		post: Post!
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
		},
		comment(parent,args,ctx,info) {
			if(!args.query) {
				return comments
			}

			return comments.filter((comment) => {
				const isIDMatch = comment.id.toLowerCase().includes(args.query.toLowerCase())
				const isTextMatch = comment.text.toLowerCase().includes(args.query.toLowerCase())

				return isIDMatch || isTextMatch
			})
		}
	},
	Post: {
		author(parent, args, ctx, info) {
			return users.find((user) => {
				return user.id === parent.author
			})
		}
	},
	User: {
		posts(parent,args,ctx,info) {
			return posts.filter((post) => {
				return post.author === parent.id
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