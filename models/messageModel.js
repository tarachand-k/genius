import mongoose from "mongoose";

const messageSchema = mongoose.Schema({
  question: String,
  answer: String,
  chat: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Chat",
  },
});

const Message =
  mongoose.models.Message || mongoose.model("Message", messageSchema);

export default Message;
