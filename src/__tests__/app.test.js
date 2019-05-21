const routes = require("../app");
const exampleRouter = require("./routes/example.route").router;

describe("app.routes", () => {
  let app;
  let originalConsole = {};

  beforeEach(() => {
    originalConsole.error = global.console.error;
    global.console.error = jest.fn();
    app = { use: jest.fn().mockImplementation(x => x) };
  });

  afterEach(() => {
    global.console.error = originalConsole.error;
  });

  test("does not fail with missing path", () => {
    const path = __dirname + "/**/no-routes/*.route.js";
    routes({ app, path });
    expect(app.use).not.toBeCalled();
  });

  test("logs with missing path", () => {
    const path = __dirname + "/**/no-routes/*.route.js";
    routes({ app, path });
    const expected = `Error: No routes found matching (${path})`;
    expect(console.error).toHaveBeenCalledWith(expected);
  });

  test("throws with invalid routes", () => {
    const path = __dirname + "/**/invalid-routes/*.route.js";
    const actual = () => routes({ app, path });
    const expected = new Error(
      `Router is invalid: ${__dirname}/invalid-routes/invalid.route.js`
    );
    expect(actual).toThrowError(expected);
  });

  test("loads routes", () => {
    const path = __dirname + "/**/routes/*.route.js";
    routes({ app, path });
    const expected = [exampleRouter];
    expect(app.use).toHaveBeenCalledWith(expected);
  });
});
