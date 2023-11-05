import dbConnect from "@/lib/database/conn";
import { getMessages, createMessage } from "@/controllers/messageController";
import { deleteChat, updateChatName } from "@/controllers/chatController";

export default async function handler(req, res) {
  dbConnect().catch((err) =>
    res.status(400).json({ error: "DB Connection Error" })
  );

  switch (req.method) {
    case "GET":
      await getMessages(req, res);
      break;
    case "POST":
      await createMessage(req, res);
      break;
    case "PATCH":
      await updateChatName(req, res);
      break;
    case "DELETE":
      await deleteChat(req, res);
      break;
    default:
      res.setHeader("Allow", ["GET", "POST", "PATCH", "DELETE"]);
      res.status(400).json({ error: `Method ${req.method} not allowed` });
      break;
  }
}
