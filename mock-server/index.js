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

  if (randomOutcome < 0.15) {
    res.status(500).jsonp({
      error: "Error message here",
    });
  }

  // Continue to JSON Server router
  next();
};

// Start listening
server.listen(5000, () => {
  console.log("JSON Server is running! Open the browser at http://localhost:5000");
});
