const path = require("path");
const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, "db.json"));
const middlewares = jsonServer.defaults({
  static: "dist",
});

// Add middlewares
server.use(middlewares);

// Mount the router
server.use("/api", router);

// Simulate a server side error response
server.use(jsonServer.bodyParser);
router.render = (req, res, next) => {

  const randomOutcome = Math.random();
  if (req.method === 'POST') {
    req.body.createdAt = Date.now()
  }
  // Continue to JSON Server router
  next()

  res.status(500).jsonp({
    error: "error message here",
  });
};

// Start listening
server.listen(5000, () => {
  console.log("JSON Server is running! Open the browser at http://localhost:5000");
});
