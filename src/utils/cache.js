const fs = require('fs');
const path = require('path');

const moment = require('moment');
const chalk = require('chalk');
const outputFileSync = require('output-file-sync');

const cacheStore = require('../../cache.json');

const MAX = 1000;
const { log } = console;

class Cache {
  constructor() {
    this.store = cacheStore;
    log(chalk`{cyan init} total:`, this.store.items.length);
    log(chalk`{cyan init} udpate time:`, this.store.updateTime);
  }

  async fetchData(query = '') {
    const url = `https://api.typeform.com/forms/pJAGob/responses?page_size=${MAX}&completed=true&${query}`;

    log(chalk`{blue request ➜} ${url}`);
    return await fetch(url, {
      headers: {
        Authorization: `Bearer ${process.env.TOKEN}`,
      },
    }).then(res => res.json());
  }

  async updateStore(token) {
    const { items, page_count } = await this.fetchData(`&after=${token}`);

    items.reverse();
    log(
      chalk`{blue items ➜} ${JSON.stringify(
        items.map(({ token: itemToken }) => itemToken),
        null,
        2,
      )}`,
    );
    log(chalk`{blue page_count ➜} ${page_count}`);

    if (page_count > 1)
      return [...(await this.updateStore(items[0].token)), ...items];

    return items;
  }

  async get() {
    try {
      if (
        moment()
          .subtract(1, 'seconds')
          .valueOf() > moment(this.store.updateTime).valueOf()
      ) {
        log(chalk`{green start ➜} update`);
        this.store.updateTime = moment().format();
        this.store.items = [
          ...(await this.updateStore(this.store.items[0].token)),
          ...this.store.items,
        ];
        log(chalk`{green end ➜} update`);
      }

      log(chalk`{cyan new ➜} total:`, this.store.items.length);
      log(chalk`{cyan new ➜} udpate time:`, this.store.updateTime);
      outputFileSync(
        path.resolve('cache.json'),
        JSON.stringify(this.store, null, 2),
      );
      return this.store.items;
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = new Cache();
