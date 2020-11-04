const router = require('express').Router();

const routes = ['users', 'session', 'profiles', 'content', 'watchlists', 'tvtrailer', 'csrf'];

for (let route of routes) {
  router.use(`/${route}`, require(`./${route}`));
}

module.exports = router;
