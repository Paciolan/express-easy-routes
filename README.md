# ![Route Icon](https://raw.githubusercontent.com/Paciolan/express-easy-routes/master/media/route_1604183-42x42.png) Express Easy Routes

[Convention over Configuration](https://en.wikipedia.org/wiki/Convention_over_configuration)
library to load Express Routes without having to configure each route.

This library is designed to have a perfect balance between configuration and flexibility.

## The Problem

Each route requires manual configuration with the `app`. This can become verbose.

```javascript
const routes = require("@paciolan/express-easy-routes");
const cors = require("cors");
const express = require("express");
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
const app = express();

const port = 8080;

// ✅ YES!
routes({ app, path: __dirname + "/middlewares/**/*.middleware.js" });
routes({ app, path: __dirname + "/controllers/**/*.controller.js" });

app.listen(port, () => console.log(`Listening on http://${ip}:${port}`));
```

## Install

```bash
npm install @paciolan/express-easy-routes
```

# Example Routes

## `middleware/cors.middleware.js`

In this example, I am going to add the CORS middlware.

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

## `controllers/index.controller.js`

Next let's create our main controller route.

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

## `middlewares/profiler.middleware.js`

Create a profiler that will first, create a timer, then finally log out the time.

note: middleware that needs to run first, should have a low `order`.

```javascript
const express = require("express");
const router = express.Router();

router.use((req, res, next) => {
  const start = process.hrtime();

  res.once("finish", () => {
    const [seconds, nanoseconds] = process.hrtime(start);
    const milliseconds = (seconds * 1000) + (nanoseconds / 1000000); // prettier-ignore

    console.info(
      `${req.method} ${req.url} ${res.statusCode} ${milliseconds}ms`
    );
  });

  next();
});

module.exports = {
  order: 1,
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
    profiler.middleware.js
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
