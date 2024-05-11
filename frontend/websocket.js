const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 8080 });

wss.on("connection", function connection(ws) {
  console.log("Client connected");
  console.log(ws.readyState);
  console.log(WebSocket.OPEN);
  ws.on("message", function incoming(message) {
    console.log("Received: %s", message);
    // Echo message back to client
    ws.send("Echo: " + message);
  });

  ws.on("close", function close() {
    console.log("Client disconnected");
  });
});
