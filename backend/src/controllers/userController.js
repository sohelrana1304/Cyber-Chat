import generateToken from "../config/generateToken.js";
import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import createError from "http-errors";

export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password, pic } = req.body;
  
    if (!name || !email || !password) {
      return res.status(400).send("Please fill all the fields");
      // throw createError(400, "Please fill all the fields");
    }

    const mailRegex = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;
    if (!email.match(mailRegex)) {
      // throw createError(400, "Email id is not valid.");
      return res.status(400).send("Email id is not valid.");
    }

    const emailExist = await userModel.findOne({ email });
    if (emailExist) {
      // throw createError(400, "Email id is already registered");
      return res.status(400).send("Email id is already registered");
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const user = await userModel.create({ name, email, password: hash, pic });

    if (user) {
      return res.status(201).send({
        _id: user._id,
        name: user.name,
        email: user.email,
        pic: user.pic,
        token: generateToken(user._id),
      });
    } else {
      return res.status(400).send("Faild to Signup");
    }
  } catch (error) {
    console.log("Error : ", error.message);
    // next(error);
    return res.status(500).send("Internal Server Error");
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send("Please fill all the fields");
      // throw createError(400, "Please fill all the fields");
    }

    const mailRegex = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;
    if (!email.match(mailRegex)) {
      return res.status(400).send("Email id is not valid.");
      // throw createError(400, "Email id is not valid.");
    }

    const findUser = await userModel.findOne({ email });
    if (!findUser) {
      // throw createError(400, "Email id is not registered try to Signup");
      return res.status(400).send("Email id is not registered try to Signup");
    }

    const isPasswordCorrect = bcrypt.compareSync(password, findUser.password);

    if (!isPasswordCorrect) {
      // throw createError(400, "Email or Password is wrong");
      return res.status(400).send("Email or Password is wrong");
    }

    return res.status(200).send({
      message: "User logged in successfully",
      _id: findUser._id,
      name: findUser.name,
      email: findUser.email,
      pic: findUser.pic,
      token: generateToken(findUser._id),
    });
  } catch (error) {
    console.log("Error : ", error.message);
    // next(error);
    return res.status(500).send("Internal Server Error");
  }
};

export const getAllUsers = async (req, res, next) => {
  try {
    const keyword = req.query.search
      ? {
          $or: [
            { name: { $regex: req.query.search, $options: "i" } },
            { email: { $regex: req.query.search, $options: "i" } },
          ],
        }
      : {};

    const users = await userModel
      .find(keyword)
      .find({ _id: { $ne: req.user } });
    res.send(users);
  } catch (error) {
    console.log("Error : ", error.message);
    next(error);
  }
};
