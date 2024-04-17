// import { type Date } from "mongoose";
import User from "../models/user";
import { RequestHandler } from "express";
import createHttpError from "http-errors";
import bcrypt from "bcrypt";

interface createUserBody {
  name?: string;
  surname?: string;
  studentNum?: number;
  birthday?: string;
  phoneNumber?: number;
  password?: string;
}

export const createUser: RequestHandler<
  unknown,
  unknown,
  createUserBody,
  unknown
> = async (req, res, next) => {
  const { name, surname, studentNum, birthday, phoneNumber } = req.body;

  const passwordRow = req.body.password;
  try {
    if (!name || name.trim() === "") {
      throw createHttpError(400, "Name field can't be empty");
    }
    if (!surname || surname.trim() === "") {
      throw createHttpError(400, "Surname field can't be empty");
    }
    if (!studentNum) {
      throw createHttpError(400, "Student Number field can't be empty");
    }
    if (!birthday || birthday.trim() === "") {
      throw createHttpError(400, "Birthday field can't be empty");
    }
    if (!passwordRow || passwordRow.trim() === "") {
      throw createHttpError(400, "Password field can't be empty");
    }

    const existingStudentNum = await User.findOne({
      studentNum: studentNum,
    }).exec();

    const existingPhoneNum = await User.findOne({
      phoneNumber: phoneNumber,
    }).exec();
    if (existingStudentNum) {
      throw createHttpError(409, "This student number already exists");
    }
    if (existingPhoneNum) {
      throw createHttpError(409, "This phone number already exists");
    }

    const hashedPassword = await bcrypt.hash(passwordRow, 10);

    const newUser = await User.create({
      name,
      surname,
      studentNum,
      phoneNumber,
      birthday,
      password: hashedPassword,
    });

    req.session.userId = newUser.id; // Storing user id in session so that we can authenticate user when he signed up.
  } catch (error) {
    next(error);
  }
};

export const getUsers: RequestHandler = async (req, res, next) => {
  try {
    const users = await User.find().exec();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

interface LoginBody {
  studentNum?: string;
  password?: string;
}

export const login: RequestHandler<
  unknown,
  unknown,
  LoginBody,
  unknown
> = async (req, res, next) => {
  const studentNum = req.body.studentNum;
  const password = req.body.password;

  try {
    if (!studentNum || !password) {
      throw createHttpError(400, "Parameters missing");
    }
    const user = await User.findOne({ studentNum: studentNum }).select(
      "+studentNum + password"
    );

    if (!user) {
      throw createHttpError(401, "Invalid Credentials");
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw createHttpError(401, "Invalid Credentials");
    }

    req.session.userId = user.id;

    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

export const getAuthenticatedUser: RequestHandler = async (req, res, next) => {
  const authenticatedId = req.session.userId;
  try {
    if (!authenticatedId) {
      throw createHttpError(401, "User not authenticated");
    }

    const user = await User.findById(authenticatedId)
      .select("+studentNum")
      .exec();

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const logout: RequestHandler = async (req, res, next) => {
  req.session.destroy((error) => {
    if (error) {
      next(error);
    } else {
      res.sendStatus(200);
    }
  });
};
