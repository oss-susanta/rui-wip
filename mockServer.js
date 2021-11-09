const jsonServer = require("json-server");
const chance = require("chance").Chance();

function mock() {
  const identity = {
    id: chance.natural({ min: 1587700, max: 1600000 }),
    name: chance.name(),
    roles: ["ADMIN", "PSS", "USER"],
  };

  return {
    identity,
  };
}

const server = jsonServer.create();
const router = jsonServer.router(mock());
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 8081;

// server.use(function (req, res, next) {
//   setTimeout(next, 3000);
// });
server.use(middlewares);

server.get("/identityError", (req, res) => {
  res.status(500).jsonp({
    error: "Server Error",
  });
});

server.use(jsonServer.bodyParser);
server.use((req, res, next) => {
  if (req.method === "POST") {
    req.body.createdAt = Date.now();
  }
  next();
});

server.use(router);

server.listen(port, () => {
  console.log("JSON Server is running on http://localhost:" + port);
});
