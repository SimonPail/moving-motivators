const { createServer } = require("node:http");
const next = require("next");
const { Server } = require("socket.io");

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

const activeSessions = new Map();

app.prepare().then(() => {
 const httpServer = createServer(handler);
 const io = new Server(httpServer);

 io.on("connection", (socket) => {
  let sessionId;

  socket.on("create-session", (id) => {
   sessionId = id;
   activeSessions.set(sessionId, []);
   console.log(`Session created: ${sessionId}`);
  });

  socket.on("join-session", (id, callback) => {
   sessionId = id;
   if (!activeSessions.has(sessionId)) {
    callback("Invalid session");
    return;
   }
   socket.join(sessionId);
   console.log(`Client joined session: ${sessionId}`);

   const currentItems = activeSessions.get(sessionId);
   callback(null, currentItems);
  });

  socket.on("move-card", (data) => {
   if (sessionId) {
    socket.to(sessionId).emit("card-moved", data);

    const items = activeSessions.get(sessionId);
    activeSessions.set(
     sessionId,
     items.map((item) => {
      if (data.name === item.name) {
       item.y = data.y;
      }
      return item;
     })
    );
   }
  });

  socket.on("update-items", (newItemsOrder) => {
   if (sessionId) {
    activeSessions.set(sessionId, newItemsOrder);
    socket.to(sessionId).emit("items-updated", newItemsOrder);
   }
  });

  socket.on("disconnect", () => {
   console.log("Client disconnected");
  });
 });

 httpServer
  .once("error", (err) => {
   console.error(err);
   process.exit(1);
  })
  .listen(port, () => {
   console.log(`> Ready on http://${hostname}:${port}`);
  });
});
