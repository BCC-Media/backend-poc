const { ApolloServer, gql } = require('apollo-server');
const fs = require('fs')
const f = require('faker')

let schema = ""

try {
	schema = fs.readFileSync('./schema.graphqls', 'utf8')
	console.log(schema)
} catch (err) {
	console.error(err)
}


const typeDefs = gql`${schema}`

const mocks = {
	Cursor: () => "ABCD===",
	BCCOSection: () => { return {
		title: f.random.words
	}},
	ItemSection: () => { return {
		title: f.random.words
	}},
	ContainerSection: () => { return {
		title: f.random.words
	}},
};

const server = new ApolloServer({
	typeDefs,
	mocks,
	mockEntireSchema: true,
});

server.listen(5000).then(({ url }) => {
	console.log(`🚀 Server ready at ${url}`)
});
