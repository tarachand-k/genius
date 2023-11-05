import Chat from "@/models/chatModel";

// get all rooms
export async function getAllChats(req, res) {
  try {
    const { uid } = req.query;

    console.log("UID query", uid);

    if (!uid)
      return res
        .status(400)
        .json({ status: "fail", message: "User Id not provided!" });

    const chat = await Chat.find({ user: uid });
    console.log(chat);

    if (!chat)
      return res.status(400).json({ status: "fail", message: "NO chat found" });

    return res
      .status(200)
      .json({ status: "success", success: true, data: chat });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ status: "fail", message: err });
  }
}

// GET: get a room
export async function getChat(req, res) {
  try {
    const { chatId } = req.query;
    console.log(chatId);
    if (!chatId)
      return res
        .status(400)
        .json({ status: "fail", message: "NO Chat Id Present" });

    const chat = await Chat.findById(id).populate("messages");

    console.log(chat);

    if (!chat)
      return res.status(400).json({ status: "fail", message: "NO chat found" });

    return res.status(200).json({ success: true, data: chat });
  } catch (err) {
    return res.status(400).json({ status: "fail", data: err });
  }
}

// POST: create a chat

export async function createChat(req, res) {
  try {
    const { uid } = req.body;
    const len = await (await Chat.find({ user: uid })).length;
    console.log(len);
    if (!uid)
      return res
        .status(400)
        .json({ status: "fail", message: "User Id not provided!" });

    const defaultChat = {
      name: `Chat ${len + 1}`,
      user: uid,
      messages: [],
    };

    const chat = await Chat.create(defaultChat);
    return res.status(200).json({ success: true, data: chat });
  } catch (err) {
    return res.status(400).json({ status: "fail", message: err.message });
  }
}

// PATCH: update a cha
export async function updateChatName(req, res) {
  try {
    const { chatId } = req.query;
    const { name } = req.body;

    console.log("name: ", name);
    console.log("chat id", chatId);
    if (!name)
      return res
        .status(400)
        .json({ status: "fail", message: "name not provided!" });

    const updatedChat = await Chat.findByIdAndUpdate({ _id: chatId }, { name });
    // updatedChat.messages = undefined;
    // updatedChat.user = undefined;
    console.log(updatedChat);
    if (!updatedChat)
      res
        .status(400)
        .json({ success: "fail", messages: "Error while updating chat name." });

    return res.json(200).json({ success: true, data: updatedChat });
  } catch (err) {
    return res.status(400).json({ status: "fail", message: err.message });
  }
}

// DELETE: delete a room

export async function deleteChat(req, res) {
  try {
    const { chatId } = req.query;

    if (!chatId)
      return res
        .status(400)
        .json({ status: "fail", message: "NO Chat Id Present" });

    await Chat.findByIdAndDelete(chatId);

    return res.status(200).json({ success: true, deleted: chatId });
  } catch (err) {
    return res.status(400).json({ status: "fail", message: err.message });
  }
}
