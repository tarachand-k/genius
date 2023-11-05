import mongoose from "mongoose";

const chatSchema = mongoose.Schema({
  name: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  messages: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
  ],
});

const Chat = mongoose.models.Chat || mongoose.model("Chat", chatSchema);

export default Chat;
