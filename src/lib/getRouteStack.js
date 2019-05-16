const express = require("express-serve-static-core"); // eslint-disable-line no-unused-vars
const push = require("./push");

const getRouter = module => module.router;

/**
 * Get's a list of flattened Routers from an Array of Routes.
 * @param {Array<{stack: Array<express.Router>}>} routes Array of express Routers
 * @returns {Array<express.Router>}
 * @example
 * const routes = [
 *   { stack: [ { router: Router } ]},
 *   { stack: [ { router: Router } ]}
 * ]
 * const stack = getRouteStack(routes)
 * //=> [ Router, Router ]
 */
const getRouteStack = routes =>
  routes.reduce((acc, route) => push(route.stack.map(getRouter), acc), []);

module.exports = {
  getRouteStack
};
