const memoizeOne = require('memoize-one');
const chalk = require('chalk');

const cache = require('../utils/cache');

const { log } = console;
const IDS = {
  timeFieldId: '67f05b89-605b-48ea-a5f0-a7a46c6006f5',
  priceFieldId: '6d0bcbae-937a-435a-9564-d7a78b4792d5',
  distanceFieldId: 'ea69d4ee-f765-4d98-b699-8c20719b5d9e',
  otherAreaFieldId: 'db43093f-80cb-49f2-bf9d-1e1b0821fdaf',
};

const getStatistics = data =>
  data.reduce(
    ({ time = 0, price = 0, distance = 0, ...result }, { answers }) => ({
      ...result,
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
    {
      id: '59c37559-35f2-490b-b0a1-7d5794b2a8a9',
      total: data.length,
    },
  );

const getArea = data =>
  data
    .reduce(
      (result, { answers }) => {
        const {
          choice: { label },
        } = answers.find(({ field: { ref } }) => ref === IDS.otherAreaFieldId);

        result.find(({ name }) =>
          RegExp(name === '本島' ? '台灣及離島地區' : name).test(label),
        ).value += 1;

        return result;
      },
      [
        {
          id: 'e14ebff9-5261-4488-897d-7276f20b3bbc',
          name: '本島',
          value: 0,
        },
        {
          id: '6e89dbb6-0347-405e-a4c7-9a219f057917',
          name: '大洋洲',
          value: 0,
        },
        {
          id: '68f6dcd1-9bd5-48af-a0f4-7db47f0c6dec',
          name: '亞洲',
          value: 0,
        },
        {
          id: '6b135c91-42d9-41cf-aceb-dde4b73e7a41',
          name: '北美洲',
          value: 0,
        },
        {
          id: '1576ccb6-dd4f-4520-84b8-6ecb0fe627dc',
          name: '南美洲',
          value: 0,
        },
        {
          id: '3700eb01-95b2-4176-a7b7-8c76b9d63a0e',
          name: '歐洲',
          value: 0,
        },
        {
          id: '7fbf837b-6369-418f-9d7e-3f8feef089f7',
          name: '非洲',
          value: 0,
        },
      ],
    )
    .filter(({ value }) => value !== 0)
    .sort((a, b) => b.value - a.value);

module.exports = memoizeOne(
  ({ items }) => {
    log(chalk`{green schema ➜} count data`);

    const networkIds = [];
    const data = items.filter(({ metadata: { network_id }, answers }) => {
      if (networkIds.includes(network_id)) return false;

      networkIds.push(networkIds);
      return true;
    });

    return {
      id: 'f5cbfdb7-d04a-4064-a4a4-76d621dac70e',
      statistics: getStatistics(data),
      area: getArea(data),
    };
  },
  (newData, prevData) =>
    newData.updateTime !== prevData.updateTime ||
    newData.items[0].token !== prevData.items[0].token,
);
