import { createChat, getAllChats } from "@/controllers/chatController";
import dbConnect from "@/lib/database/conn";

export default async function handler(req, res) {
  dbConnect().catch((err) =>
    res.status(400).json({ error: "DB Connection Error" })
  );

  switch (req.method) {
    case "GET":
      await getAllChats(req, res);
      break;
    case "POST":
      await createChat(req, res);
      break;
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(400).json({ error: `Method ${req.method} not allowed` });
      break;
  }
}
