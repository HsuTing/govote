const { makeExecutableSchema } = require('graphql-tools');

const cache = require('./cache');

const typeDefs = `
  type Area {
    America: Int!
    Europe: Int!
    Island: Int!
    Asia: Int!
  }

  type Statistics {
    id: ID!
    total: String!
    time: String!
    price: String!
    distance: String!
    area: Area!
  }

  type Data {
    id: ID!
    statistics: Statistics!
  }

  type Query {
    data: Data!
  }
`;

const resolvers = {
  Query: {
    data: async () => {
      await cache.get();
    },
  },
};

module.exports = makeExecutableSchema({
  typeDefs,
  resolvers,
});
