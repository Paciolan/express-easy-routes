const routes = require("../app");
const exampleRouter = require("./routes/example.route").router;

describe("app.routes", () => {
  let app;

  beforeEach(() => {
    app = { use: jest.fn().mockImplementation(x => x) };
  });

  test("does not fail with missing path", () => {
    const path = __dirname + "/**/no-routes/*.route.js";
    routes({ app, path });
    const expected = [];
    expect(app.use).toHaveBeenCalledWith(expected);
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
