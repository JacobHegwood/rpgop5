import feathers from "@feathersjs/client";
import socketio from "@feathersjs/socketio-client";
import io from "socket.io-client";

const socket = io("https://rpgop.loca.lt/");

const app = feathers();

app.configure(socketio(socket));

app.configure(
  feathers.authentication({
    storage: window.localStorage
  })
);

// repeat this line for every service in our backend
export const moduleService = app.service("modules");

export const userService = app.service("users");

export default app;
