const Query = {
	users(parents,args,{db},info) {
		if(!args.query) {
			return db.users
		}

		return db.users.filter((user) => {
			return user.name.toLowerCase().includes(args.query.toLowerCase())
		})
	},
	posts(parent,args,{db},info) {
		if(!args.query) {
			return db.posts
		}

		return db.posts.filter((post) => {
			const isTitleMatch = post.title.toLowerCase().includes(args.query.toLowerCase())
			const isBodyMatch = post.body.toLowerCase().includes(args.query.toLowerCase())

			return isTitleMatch || isBodyMatch
		})
	},
	comments(parent,args,{db},info) {
		if(!args.query) {
			return db.comments
		}

		return db.comments.filter((comment) => {
			const isIDMatch = comment.id.toLowerCase().includes(args.query.toLowerCase())
			const isTextMatch = comment.text.toLowerCase().includes(args.query.toLowerCase())

			return isIDMatch || isTextMatch
		})
	}
}

export { Query as default }