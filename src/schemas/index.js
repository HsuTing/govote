const { makeExecutableSchema } = require('graphql-tools');

const typeDefs = require('./typeDefs');
const getData = require('./getData');

const cache = require('../utils/cache');

const { log } = console;

const resolvers = {
  Query: {
    data: async () => {
      try {
        await cache.get();

        return getData(cache.store);
      } catch (e) {
        log(e);
      }
    },
  },
};

module.exports = makeExecutableSchema({
  typeDefs,
  resolvers,
});
