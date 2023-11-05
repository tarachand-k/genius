import Message from "@/models/messageModel";
// import Room from "@/models/roomModel";
import Chat from "@/models/chatModel";
import { OpenAI } from "openai";
// import { OpenAIStream, StreamingTextResponse } from "ai";
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// GET: get messages from a room
export async function getMessages(req, res) {
  try {
    const { chatId } = req.query;
    if (!chatId)
      return res
        .status(400)
        .json({ success: false, message: "No chat id present" });

    const messages = await Message.find(
      { chat: chatId },
      {
        __v: 0,
        chat: 0,
      }
    );

    if (!messages)
      return res
        .status(400)
        .json({ success: false, messages: "No messages found..." });

    return res.status(200).json({ success: true, data: messages });
  } catch (err) {
    return res.status(400).json({ status: "fail", message: err.message });
  }
}

// POST crate a message
export async function createMessage(req, res) {
  const { chatId } = req.query;
  const { question, answer } = req.body;

  if (!chatId)
    return res
      .status(400)
      .json({ success: false, message: "No chat id present" });

  if (!question && !answer)
    return res
      .status(400)
      .json({ success: false, message: "Cannot get data from the user" });

  // get current chat
  const chat = await Chat.findById({ _id: chatId });

  if (!chat)
    return res.status(400).json({ success: false, message: "No chat found" });

  const completion = await openai.completions.create({
    model: "gpt-3.5-turbo-instruct",
    prompt: question,
    temperature: 1,
    max_tokens: 2000,
    top_p: 1,
  });
  console.log(completion);

  // Convert the response into a friendly text-stream
  // const stream = OpenAIStream(response);
  // return new StreamingTextResponse(stream);

  // create a new message
  const message = new Message({
    question,
    answer: completion.choices[0].text,
    chat: chatId,
  });
  await message.save();

  // add message to messages array of current chat
  chat.messages.push(message._id);
  await chat.save();

  return res.status(200).json({ success: true, data: message });
}
