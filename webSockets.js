import { WebSocketServer } from "ws";
import { User, UserSponsor } from "./src/users/users.model.js";
import { Chat } from "./src/chats/chats.model.js";
import { posts_notifications } from "./src/notifications/notifications.model.js";
import url from "url";

export default async function wsTogether(server) {
  const wsTogether = new WebSocketServer({
    server,
  });

  wsTogether.on("connection", (wsClient, req) => {
    const params = url.parse(req.url, true);
    const { userId } = params.query;
    wsClient.userId = userId;

    console.log(userId !== undefined ? `user with id ${userId} connected` : "listener connected");

    wsClient.on("message", async (message) => {
      try {
        const json = JSON.parse(message);

        if (json.event === "reg") {
          return wsClient.send("OK");
        }

        if (json.event === "transaction" && Number(json.userId)) {
          const receiver = await User.findByPk(Number(json.userId));
          if (!receiver) return wsClient.send("Пользователь не найден!");
          for await (const client of wsTogether.clients) {
            if (Number(client.userId) == Number(json.userId)) client.send(`${json.event} from userId: ${wsClient.userId}`);
          }
        }

        if (json.event === "changeRole" && Number(json.userId) && Number(json.role)) {
          const receiver = await User.findOne({
            where: {
              id: Number(json.userId),
            },
          });
          if (!receiver) return wsClient.send("Пользователь не найден!");
          for await (const client of wsTogether.clients) {
            if (Number(client.userId) == Number(json.userId)) client.send(`change role where roleId: ${json.role}`);
          }
        }

        if (json.event === "student" && Number(json.userId)) {
          console.log(Number(json.userId));
          const receiver = await User.findByPk(Number(json.userId));
          if (!receiver) return wsClient.send("Пользователь не найден!");
          const newStudent = await UserSponsor.findOne({
            where: {
              sponsorId: Number(json.userId),
            },
            order: [["createdAt", "DESC"]],
            attributes: ["userId"],
          });
          for await (const client of wsTogether.clients) {
            if (Number(client.userId) == Number(json.userId)) client.send(`${json.event} from sponsorId: ${newStudent.userId}`);
          }
        }

        if (json.event === "sponsor" && Number(json.userId)) {
          const receiver = await User.findByPk(Number(json.userId));
          if (!receiver) return wsClient.send("Пользователь не найден!");
          const newSponsor = await UserSponsor.findOne({
            where: {
              userId: Number(json.userId),
            },
            order: [["createdAt", "DESC"]],
            attributes: ["sponsorId"],
          });
          for await (const client of wsTogether.clients) {
            if (Number(client.userId) == Number(json.userId)) client.send(`${json.event} from userId: ${newSponsor.sponsorId}`);
          }
        }

        if (json.event === "msg" && Number(json.chatId)) {
          const data = await Chat.findByPk(Number(json.chatId), {
            include: {
              model: User,
              attributes: ["id"],
              through: { attributes: [] },
            },
          });
          if (!data) return wsClient.send("Чат не найден!");
          const { users } = data;
          const ids = [];
          await users.map((user) => ids.push(Number(user.id)));
          for await (const client of wsTogether.clients) {
            if (ids.includes(Number(client.userId))) client.send(`${json.event} on chatId: ${json.chatId}`);
          }
        }

        if (json.event === "post" && Number(json.postId)) {
          for await (const client of wsTogether.clients) {
            client.send(`${json.event} on postId: ${json.postId}`);
          }
        }

        return;
      } catch (e) {
        console.log(e);
        return wsClient.send("Unknown command");
      }
    });

    wsClient.on("close", () => {
      console.log(userId !== undefined ? `user with id ${userId} disconnected` : "listener disconnected");
    });
  });
}
