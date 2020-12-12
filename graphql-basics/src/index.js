import { GraphQLServer } from 'graphql-yoga'
import uuidv4 from 'uuid/v4'

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
	text: 'You got this',
	author: '1',
	post: '11'
}, {
	id: '102',
	text: 'Making GraphQl look easy',
	author: '3',
	post: '12'
}, {
	id: '103',
	text: 'First step here, next step beer',
	author: '1',
	post: '11'
}, {
	id: '104',
	text: 'Started from the bottom!',
	author: '2',
	post: '13'
}]



// __Type Definitions (schema)
const typeDefs = `
	type Query {
		users(query: String): [User!]!
		posts(query: String): [Post!]!
		comments(query: String): [Comment!]!
	}

	type Mutation {
		createUser(name: String!, email: String!, age: Int): User!
		createPost(title: String!, body: String!, published: Boolean!, author: ID!): Post!
		createComment(text: String!, author: ID!, post: ID!): Comment!
	}

	type User {
		id: ID!
		name: String!
		email: String!
		age: Int
		posts: [Post]!
		comments:[Comment!]!
	}

	type Post {
		id: ID!
		title: String!
		body: String!
		published: Boolean!
		author: User!
		comments: [Comment!]!
	}

	type Comment {
		id: ID!
		text: String!
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
		comments(parent,args,ctx,info) {
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
	Mutation: {
		createUser(parent, args, ctx, info) {
			const emailTaken = users.some((user) => user.email === args.email)

			if(emailTaken) {
				throw new Error('Email is taken')
			}

			const user = {
				id: uuidv4(),
				name: args.name,
				email: args.email,
				age: args.age
			}

			users.push(user)

			return user
		},
		createPost(parent, args, ctx, info) {
			const userExists = users.some((user) => user.id === args.author)

			if(!userExists) {
				throw new Error('User not found')
			}

			const post = {
				id: uuidv4(),
				title: args.title,
				body: args.body,
				published: args.published,
				author: args.author
			}

			posts.push(post)

			return post
		},
		createComment(parent, args, ctx, info) {
			const userExists = users.some((user) => user.id === args.author)
			const postExists = posts.some((post) => post.id === args.post)

			if (!userExists) {
				throw new Error('User not found')
			}

			if(!postExists) {
				throw new Error('Post not found')
			}

			const comment = {
				id: uuidv4(),
				text: args.text,
				author: args.author,
				post: args.post
			}

			comments.push(comment)
			return comment
		}
	},
	Post: {
		author(parent, args, ctx, info) {
			return users.find((user) => {
				return user.id === parent.author
			})
		},
		comments(parent, args, ctx, info) {
			return comments.filter((comment) => {
				return comment.post === parent.id
			})
		}
	},
	Comment: {
		author(parent, args, ctx, info) {
			return users.find((user) => {
				return user.id === parent.author
			})
		},
		post(parent, args, ctx, info) {
			return posts.find((post) => {
				return post.id === parent.post
			})
		}
	},
	User: {
		posts(parent,args,ctx,info) {
			return posts.filter((post) => {
				return post.author === parent.id
			})
		},
		comments(parent,args, ctx,info) {
			return comments.filter((comment) => {
				return comment.author === parent.id
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