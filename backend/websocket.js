const ws = require("ws");

ws.on("connection", (e) => {
  console.log(e);
});
