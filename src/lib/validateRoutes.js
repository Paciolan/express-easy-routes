const zip = require("lodash.zip");

/**
 * Validates an Array of Routes. Throws an Error if a route is invalid.
 * @param {Object} param
 * @param {Array<string>} param.paths - Array of paths
 * @param {Array<string>} param.routes - Array of routes
 */
const validateRoutes = ({ paths, routes }) => {
  zip(paths, routes).reduce((_, [path, route]) => {
    if (typeof route !== "function") {
      throw new Error(`Router is invalid: ${path}`);
    }
  }, null);
};

module.exports = validateRoutes;
