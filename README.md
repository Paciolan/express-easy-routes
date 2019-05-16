# Express Easy Routes

[Convention over Configuration](https://en.wikipedia.org/wiki/Convention_over_configuration)
library to load Express Routes without having to configure each route.

This library is designed to have a perfect balance between configuration and flexibility.

## The Problem

Each route requires manual configuration with the `app`. This can become verbose.

```javascript
const routes = require("@paciolan/express-easy-routes");
const cors = require("cors");
const express = require("express");
const { join } = require("path");
const app = express();

const port = 8080;

app.use(express.json()); // ❌ NO!
app.use(express.static()); // ❌ NO!
app.use(cors()); // ❌ NO!

// ❌ NO!
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// ❌ NO!
app.get("/route-1", (req, res) => {
  res.send("Hello Route1!");
});

// ❌ NO!
app.get("/route-2", (req, res) => {
  res.send("Hello Route2!");
});

app.listen(port, () => console.log(`Listening on http://${ip}:${port}`));
```

## The Solution

Put middlewares and routes in specified directories (by Convention), then load all routes from those directories.

Now adding a route no longer requires manually configuration.

```javascript
const routes = require("@paciolan/express-easy-routes");
const express = require("express");
const { join } = require("path");
const app = express();

const port = 8080;

routes({ app, path: join(__dirname, "middlewares/**/*.middleware.js") }); // ✅ YES!
routes({ app, path: join(__dirname, "controllers/**/*.controller.js") }); // ✅ YES!

app.listen(port, () => console.log(`Listening on http://${ip}:${port}`));
```

## Install

```bash
npm install @paciolan/express-easy-routes
```

# Adding a Route

In this example, I am going to add the CORS middlware.

Create a new file `middleware/cors.middleware.js`:

```javascript
const express = require("express");
var cors = require("cors");
const router = express.Router();

router.use(cors());

module.exports = {
  order: 100, // optional
  router
};
```

That's it! We just added CORS into our express app!

Next let's create our main route in `controllers/index.controller.js`

```javascript
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello World!");
});

module.exports = {
  order: 100, // optional
  router
};
```

It is now easy to find the route in your directories. Copy and Paste to move routes from one project to another.

```
src/
  controllers/
    index.controller.js
  middlewares/
    cors.middleware.js
  app.js
```

## Unit Testing

Express Easy Routes also makes testing routes easy.

Create the file `controllers/__tests__/index.controller.test.js`.

```javascript
const { response: mockRes } = require("jest-mock-express");
const { router } = require("../index.route");

describe("route /", () => {
  test("returns 'Success!'", () => {
    const req = { method: "GET", url: "/" };
    const res = mockRes();
    router(req, res);
    expect(res.send).toHaveBeenCalledWith("Success!");
  });
});
```

## API

`RouteConfig` - Config passed into the `routes` function.

| Property | Required | Description                                                           |
| -------- | :------: | --------------------------------------------------------------------- |
| app      |    ✅    | Express `app` object. (the one returned from calling `express()`).    |
| path     |    ✅    | Absolute (full) [glob](https://www.npmjs.com/package/glob) to routes. |

`RouteModule` - Exports for the route files.

| Property | Required | Description                      |
| -------- | :------: | -------------------------------- |
| router   |    ✅    | Express Router object.           |
| order    |          | Sort (Ascending) order of route. |

# Contributors

Joel Thoms (https://twitter.com/joelnet)

Icons made by [Freepik](https://www.freepik.com) from [www.flaticon.com](https://www.flaticon.com) is licensed by [CC 3.0 BY](http://creativecommons.org/licenses/by/3.0)
