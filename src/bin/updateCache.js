#! /usr/bin/env node

require('isomorphic-unfetch');

const cache = require('../utils/cache');

(async () => {
  await cache.get();
})();
