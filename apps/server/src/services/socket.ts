import { Server } from "socket.io";
import Redis from "ioredis";

const pub = new Redis({
  host:'',
  port:2,
  password:''
});
const sub = new Redis({
  host:'',
  port:1,
  password:''
});
class SocketService {
  private _io: Server;
  constructor() {
    console.log("Init constructor for socket server...");
    this._io = new Server({
      cors: {
        allowedHeaders: ["*"],
        origin: "*",
      },
    });
    sub.subscribe("MESSAGES");
  }

  public initListener() {
    console.log(`Init socket listeners.....`);
    const io = this.io;
    io.on("connect", (socket) => {
      console.log(`New Socket Connected`, socket.id);

      socket.on("event:message", async ({ message }: { message: string }) => {
        console.log(`Message received:: ${message}`);
        await pub.publish("MESSAGES", JSON.stringify({ message }));
      });
    });
    sub.on("message", (channel, message) => {
      if (channel === "MESSAGES") {
        io.emit("message", message);
      }
    });
  }
  get io() {
    return this._io;
  }
}

export default SocketService;
