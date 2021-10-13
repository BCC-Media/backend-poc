const { ApolloServer, gql } = require('apollo-server');
const fs = require('fs')

let schema = ""

try {
	schema = fs.readFileSync('./x.graphqls', 'utf8')
	console.log(schema)
} catch (err) {
	console.error(err)
}


const typeDefs = gql`${schema}`

const mocks = {
	Cursor: () => "ABCD===",
};

const server = new ApolloServer({
	typeDefs,
	mocks,
	mockEntireSchema: true,
});

server.listen(5000).then(({ url }) => {
	console.log(`🚀 Server ready at ${url}`)
});
