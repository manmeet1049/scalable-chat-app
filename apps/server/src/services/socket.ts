import { Server } from "socket.io";

class SocketService {
  private _io: Server;
  constructor() {
    console.log("Init constructor for socket server...");
    this._io = new Server();
  }

  public initListener() {
    console.log(`Init socket listeners.....`)
    const io = this.io;
    io.on("connect", (socket) => {
      console.log(`New Socket Connected`, socket.id);

      socket.on("event:message", async ({ message }: { message: string }) => {
        console.log(`Message received:: ${message}`);
      });
    });
  }
  get io() {
    return this._io;
  }
}

export default SocketService;
