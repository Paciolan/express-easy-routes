/**
 * Immutably sorts objects based on `order` property
 * @param {Array} modules Modules to be sorted
 * @returns {Array} Sorted modules
 * @example
 * const myModules = [ { name: 'module1', order: 200 }, { name: 'module2', order: 100 } ]
 * sortAllModules(myModules)
 * //=> [ { name: 'module2', order: 100 }, { name: 'module1', order: 200 } ]
 */
const sortAllModules = modules =>
  modules
    .slice()
    .sort(
      (a, b) => (a.order || Number.MAX_VALUE) - (b.order || Number.MAX_VALUE)
    );

module.exports = sortAllModules;
