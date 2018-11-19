const fs = require('fs');
const path = require('path');

const { makeExecutableSchema } = require('graphql-tools');

const getData = require('./getData');

const cache = require('../utils/cache');

const { log } = console;
const typeDefs = fs.readFileSync(
  path.resolve(__dirname, '../../schema.graphql'),
  'utf-8',
);

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
