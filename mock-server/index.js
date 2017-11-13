const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("./mock-server/db.json");
const middlewares = jsonServer.defaults({
  // static: "dist",
});

// Add middlewares
server.use(middlewares);

// Mount the router
server.use("/api", router);
// server.use(router);

// Simulate a server side error response
// router.render = (req, res) => {
//   res.status(500).jsonp({
//     error: "error message here",
//   });
// };

// Start listening
server.listen(5000, () => {
  console.log("JSON Server is running! Open the browser at http://localhost:5000");
});
