import createHttpError from "http-errors";
import chatModel from "../models/chatModel.js";
import userModel from "../models/userModel.js";
import messageModel from "../models/messageModel.js";

export const accessChat = async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    console.log("UserId param not sent with request");
    return res.sendStatus(400);
  }

  let isChat = await chatModel
    .find({
      isGroupChat: false,
      $and: [
        { users: { $elemMatch: { $eq: req.user } } },
        { users: { $elemMatch: { $eq: userId } } },
      ],
    })
    .populate("users", "-password")
    .populate("latestMessage");

  isChat = await userModel.populate(isChat, {
    path: "latestMessage.sender",
    select: "name pic email",
  });

  if (isChat.length > 0) {
    res.send(isChat[0]);
  } else {
    let chatData = {
      chatName: "sender",
      isGroupChat: false,
      users: [req.user, userId],
    };

    try {
      const createdChat = await chatModel.create(chatData);
      const FullChat = await chatModel
        .findOne({ _id: createdChat._id })
        .populate("users", "-password");

      return res.status(200).send(FullChat);

    } catch (error) {
      console.log(error.message);
      return res.status(500).send("Internal Server Error");
    }
  }
};

export const fetchChats = async (req, res) => {
  try {
    let data = await chatModel
      .find({ users: { $elemMatch: { $eq: req.user } } })
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .sort({ updatedAt: -1 });
    data = await chatModel.populate(data, {
      path: "latestMessage",
      // model : "Message",
      populate:{
        path: "sender",
        select: "name pic email",
      }
    });

    return res.status(200).send(data);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send("Internal Server Error");
  }
};

export const createGroupChat = async (req, res) => {
  try {
    const { users, name } = req.body;

    if (!users || !name) {
      return res.status(400).send({ message: "Please Fill all the feilds" });
    }

    let parseUser = JSON.parse(users);

    if (parseUser.length < 2) {
      return res
        .status(400)
        .send("More than 2 users are required to form a group chat");
    }

    parseUser.push(req.user);

    try {
      const groupChat = await chatModel.create({
        chatName: name,
        users: parseUser,
        isGroupChat: true,
        groupAdmin: req.user,
      });

      const fullGroupChat = await chatModel
        .findOne({ _id: groupChat._id })
        .populate("users", "-password")
        .populate("groupAdmin", "-password");

      return res.status(200).json(fullGroupChat);
    } catch (error) {
      return res.status(400).send(error.message);
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).send("Internal Server Error");
  }
};

export const renameGroup = async (req, res) => {
  try {
    const { chatId, chatName } = req.body;

    const updatedChat = await chatModel
      .findByIdAndUpdate(
        chatId,
        {
          chatName: chatName,
        },
        {
          new: true,
        }
      )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    if (!updatedChat) {
      return res.status(404).send({ message: "Chat Not Found" });
    } else {
      return res.status(200).send(updatedChat);
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).send("Internal Server Error");
  }
};

export const addToGroup = async (req, res) => {
  try {
    const { chatId, userId } = req.body;

    // check if the requester is admin

    const added = await chatModel
      .findByIdAndUpdate(
        chatId,
        {
          $push: { users: userId },
        },
        {
          new: true,
        }
      )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    if (!added) {
      return res.status(404).send({ message: "Chat Not Found" });
    } else {
      return res.status(200).send(added);
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).send("Internal Server Error");
  }
};

export const removeFromGroup = async (req, res) => {
  try {
    const { chatId, userId } = req.body;

    // check if the requester is admin

    const removed = await chatModel
      .findByIdAndUpdate(
        chatId,
        {
          $pull: { users: userId },
        },
        {
          new: true,
        }
      )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    if (!removed) {
      return res.status(404).send({ message: "Chat Not Found" });
    } else {
      return res.status(200).send(removed);
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).send("Internal Server Error");
  }
};
