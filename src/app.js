const glob = require("glob");
const { getRouteStack } = require("./lib/getRouteStack");
const sortAllModules = require("./lib/sortAllModules");
const validateRoutes = require("./lib/validateRoutes");

const requireAllPaths = paths => paths.map(require);
const getRouter = module => module.router;
const getAllRoutes = modules => modules.map(getRouter);

const initRoutes = ({ app, path }) => {
  const paths = glob.sync(path);
  const modules = requireAllPaths(paths);
  const sorted = sortAllModules(modules);
  const routes = getAllRoutes(sorted);
  validateRoutes({ paths, routes });
  const stack = getRouteStack(routes);

  app.use(routes);

  return stack;
};

module.exports = initRoutes;
