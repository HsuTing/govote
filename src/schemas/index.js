const { makeExecutableSchema } = require('graphql-tools');

const typeDefs = `
  type User {
    id: ID!
    isLogin: Boolean!
  }

  type Query {
    user: User!
  }
`;

const resolvers = {
  Query: {
    user: (root, args, ctx) => ({
      id: 'user',
    }),
  },
};

module.exports = makeExecutableSchema({
  typeDefs,
  resolvers,
});
