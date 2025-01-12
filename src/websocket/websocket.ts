import { SocketMessage } from "@/types/sockets/socketTypes";

export const mainSocket = new WebSocket("ws://localhost:8080");

mainSocket.addEventListener("open", () => {
  console.log("socket connection opened");
  const msg: SocketMessage = {
    key: "authenticate",
    content: "user",
    sentAt: Date.now(),
  };
  mainSocket.send(JSON.stringify(msg));
  mainSocket.addEventListener("message", () => {
    console.log("received message");
  });
});

mainSocket.addEventListener("close", () => {
  console.log("socket closed");
});

mainSocket.addEventListener("error", (e) => {
  console.log("socket error", e);
});
