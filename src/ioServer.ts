import { Server, Socket } from "socket.io";

export const io = new Server();

io.on("connection", (socket: Socket) => {
  socket.on("note-update", async (data: string, callback) => {
    try {
      if (typeof callback !== "function") {
        return socket.emit("callback-error", "Hu ho, error during note-update");
      }
      const recipients: string[] = [];
      for (const specificSocket of io.sockets.sockets.values()) {
        if (socket.id !== specificSocket.id) {
          recipients.push(specificSocket.id);
        }
      }
      io.to(recipients).emit("incoming-data", data);
      callback("Ok");
    } catch (error) {
      callback("Error");
    }
  });
  socket.on("disconnect", async (reason) => {
    // this one trigger when user close the app
    console.log(`user left : ${reason}`);
  });
});
