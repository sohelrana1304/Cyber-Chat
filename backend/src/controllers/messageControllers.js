import chatModel from "../models/chatModel.js";
import messageModel from "../models/messageModel.js";
import userModel from "../models/userModel.js";

export const sendMessage = async (req, res) => {
  try {
    const { content, chatId } = req.body;

    if (!content || !chatId) {
      console.log("Invalid data passed into request");
      return res.sendStatus(400);
    }

    const newMessage = {
      sender: req.user,
      content: content,
      chat: chatId,
    };

    let message = await messageModel.create(newMessage);

    message = await message.populate("sender", "name pic");
    message = await message.populate("chat");
    message = await userModel.populate(message, {
      path: "chat.users",
      select: "name pic email",
    });

    await chatModel.findByIdAndUpdate(chatId, {
      latestMessage: message,
    });

    return res.status(201).send({ message });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send("Something went wrong");
  }
};

export const allMessages = async (req, res) => {
  try {
    const messages = await messageModel
      .find({ chat: req.params.chatId })
      .populate("sender", "name email pic")
      .populate("chat");

    return res.status(201).send(messages);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send("Something went wrong");
  }
};
