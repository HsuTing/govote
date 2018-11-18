const { makeExecutableSchema } = require('graphql-tools');
const memoizeOne = require('memoize-one');
const chalk = require('chalk');

const cache = require('../utils/cache');

const typeDefs = require('./typeDefs');

const { log } = console;
const IDS = {
  timeFieldId: '67f05b89-605b-48ea-a5f0-a7a46c6006f5',
  priceFieldId: '6d0bcbae-937a-435a-9564-d7a78b4792d5',
  distanceFieldId: 'ea69d4ee-f765-4d98-b699-8c20719b5d9e',
};

const getData = memoizeOne(
  ({ items }) => {
    log(chalk`{green schema ➜} count data`);

    const networkIds = [];
    const data = items.filter(({ metadata: { network_id } }) => {
      if (networkIds.includes(network_id)) return false;

      networkIds.push(networkIds);
      return true;
    });

    return {
      id: 'f5cbfdb7-d04a-4064-a4a4-76d621dac70e',
      statistics: {
        id: '59c37559-35f2-490b-b0a1-7d5794b2a8a9',
        total: data.length,
        ...data.reduce(
          ({ time = 0, price = 0, distance = 0 }, { answers }) => ({
            time:
              time +
              parseFloat(
                answers
                  .find(({ field: { ref } }) => ref === IDS.timeFieldId)
                  .text.match(/\d*(\.\d*)?/)[0] || '0',
              ),
            price:
              price +
              parseInt(
                answers
                  .find(({ field: { ref } }) => ref === IDS.priceFieldId)
                  .text.match(/\d*(\.\d*)?/)[0] || '0',
                10,
              ),
            distance:
              distance +
              parseFloat(
                answers
                  .find(({ field: { ref } }) => ref === IDS.distanceFieldId)
                  .text.match(/\d*(\.\d*)?/)[0] || '0',
              ),
          }),
          {},
        ),
      },
    };
  },
  (newData, prevData) =>
    newData.updateTime !== prevData.updateTime ||
    newData.items[0].token !== prevData.items[0].token,
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
