const fs = require('fs');
const path = require('path');

const { makeExecutableSchema } = require('graphql-tools');

const cacheRequest = require('../utils/cacheRequest');
const dataStore = require('../utils/dataStore');

const { log } = console;
const typeDefs = fs.readFileSync(
  path.resolve(__dirname, '../../schema.graphql'),
  'utf-8',
);

const resolvers = {
  Query: {
    data: async () => {
      try {
        cacheRequest.get();

        return dataStore.getData(cacheRequest.store);
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
