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

const db = {
	users,
	posts,
	comments
}

export {db as default}
