#! /usr/bin/env node

require('isomorphic-unfetch');

const cacheRequest = require('../utils/cacheRequest');

(async () => {
  await cacheRequest.get(true);
})();
