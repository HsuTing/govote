const memoizeOne = require('memoize-one');
const chalk = require('chalk');
const uuid = require('uuid/v4');

const cache = require('../utils/cache');

const { log } = console;
const IDS = {
  timeFieldId: '67f05b89-605b-48ea-a5f0-a7a46c6006f5',
  priceFieldId: '6d0bcbae-937a-435a-9564-d7a78b4792d5',
  distanceFieldId: 'ea69d4ee-f765-4d98-b699-8c20719b5d9e',

  areaFieldId: 'db43093f-80cb-49f2-bf9d-1e1b0821fdaf',
  targetFieldId: 'b6feb806-2f1d-4e71-a5e6-e8f34134bfea',

  fromCityFieldId: 'fab3af2b-970c-4d48-af55-7dbad56067f2',
  fromOtherCityFieldId: '8de505e3-d39d-477f-b17e-f483e45f1abc',
  toCityFieldId: 'b6feb806-2f1d-4e71-a5e6-e8f34134bfea',
  nameFieldId: 'aacda15a-dab4-4c1c-b3f5-22e57e785954',
  messageFieldId: '97ace451-18fa-4d06-9823-dfb6340609e7',

  transportationFieldId: '1bc18458-9f1f-4d41-9a8b-3f583cbb54a7',
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
        ) /
          60,
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
      id: uuid(),
      total: data.length,
    },
  );

const getArea = data =>
  data
    .reduce(
      (result, { answers }) => {
        const {
          choice: { label },
        } = answers.find(({ field: { ref } }) => ref === IDS.areaFieldId);
        const area = result.find(({ name }) =>
          RegExp(name === '本島' ? '台灣及離島地區' : name).test(label),
        );

        area.value += 1;

        return result;
      },
      [
        {
          id: uuid(),
          name: '本島',
          value: 0,
          list: [],
        },
        {
          id: uuid(),
          name: '大洋洲',
          value: 0,
          list: [],
        },
        {
          id: uuid(),
          name: '亞洲',
          value: 0,
        },
        {
          id: uuid(),
          name: '北美洲',
          value: 0,
          list: [],
        },
        {
          id: uuid(),
          name: '南美洲',
          value: 0,
          list: [],
        },
        {
          id: uuid(),
          name: '歐洲',
          value: 0,
          list: [],
        },
        {
          id: uuid(),
          name: '非洲',
          value: 0,
          list: [],
        },
      ],
    )
    .filter(({ value }) => value !== 0)
    .sort((a, b) => b.value - a.value);

const getUsers = data =>
  data
    .map(({ token, answers }) => {
      try {
        return {
          id: token,
          fromCity: (
            answers.find(({ field: { ref } }) => ref === IDS.fromCityFieldId) ||
            answers.find(
              ({ field: { ref } }) => ref === IDS.fromOtherCityFieldId,
            )
          ).text,
          toCity: answers.find(
            ({ field: { ref } }) => ref === IDS.toCityFieldId,
          ).text,
          name: answers.find(({ field: { ref } }) => ref === IDS.nameFieldId)
            .text,
          message: answers.find(
            ({ field: { ref } }) => ref === IDS.messageFieldId,
          ).text,
        };
      } catch (e) {
        return null;
      }
    })
    .filter(value => value);

const getTransportation = data => {
  const total = data.reduce((result, { answers }) => {
    const {
      choices: { labels },
    } = answers.find(({ field: { ref } }) => ref === IDS.transportationFieldId);

    labels.forEach(value => {
      const transportation = result.find(({ name }) => name === value) || {
        id: uuid(),
        name: value,
        count: 0,
      };

      if (transportation.count === 0) result.push(transportation);

      transportation.count += 1;
    });

    return result;
  }, []);
  const max = total.reduce((result, { count }) => result + count, 0);

  return total.map(({ count, ...result }) => ({
    ...result,
    value: (count / max) * 100,
  }));
};

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
      id: uuid(),
      statistics: getStatistics(data),
      area: getArea(data),
      users: getUsers(data),
      transportation: getTransportation(data),
    };
  },
  (newData, prevData) => newData.items[0].token === prevData.items[0].token,
);
