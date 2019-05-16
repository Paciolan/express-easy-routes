const sortAllModules = require("../sortAllModules");

describe("lib/sortAllModules", () => {
  test("is immutable", () => {
    const modules = [{ order: 1 }, { order: 2 }];
    const sorted = sortAllModules(modules);
    expect(sorted).not.toBe(modules);
  });

  test("no order", () => {
    const modules = [{ name: "first" }, { name: "second" }];
    const sorted = sortAllModules(modules);
    expect(sorted.length).toBe(modules.length);
  });

  test("no norder sorts as last", () => {
    const modules = [{ name: "first" }, { name: "second", order: 100 }];
    const expected = [modules[1], modules[0]];
    const actual = sortAllModules(modules);
    expect(actual).toMatchObject(expected);
  });

  test("sorts", () => {
    const modules = [
      { name: "last", order: 300 },
      { name: "first", order: 100 },
      { name: "second", order: 200 }
    ];
    const expected = [modules[1], modules[2], modules[0]];
    const actual = sortAllModules(modules);
    expect(actual).toMatchObject(expected);
  });
});
