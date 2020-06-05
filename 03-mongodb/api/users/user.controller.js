import Joi from "@hapi/joi";
import JoiObjectId from "joi-objectid";
Joi.objectId = JoiObjectId(Joi);

import { NotFound } from "../helpers/errorConstructors";
import { UserModel } from "./user.model";

function validateCreateUser(req, res, next) {
  const body = req.body;

  const userRules = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
    phone: Joi.string(),
    subscription: Joi.string(),
    token: Joi.string(),
  });

  const validationResult = userRules.validate(body);
  if (validationResult.error) {
    return res.status(400).json(validationResult.error);
  }

  next();
}

async function createUser(req, res, next) {
  try {
    // 1. Validate request body +
    // 2. create id for user +
    // 3. save user to usersDB +
    // 4. send 201 response +

    const createdUser = await UserModel.createUser(req.body);

    return res.status(201).json(createdUser);
  } catch (err) {
    next(err);
  }
}

async function getAllUsers(req, res, next) {
  // 1. return all users in response
  return res.status(200).json(await UserModel.getAllUsers());
}

async function getUser(req, res, next) {
  // 1. getUser from userDB by id
  // 2. if user not found - return 404 error
  // 3. if user found - send 200 response
  try {
    const userFound = await UserModel.getUserById(req.params.id);
    if (!userFound) {
      throw new NotFound("User not found");
    }

    return res.status(200).json(userFound);
  } catch (err) {
    next(err);
  }
}

function validateUpdateUser(req, res, next) {
  const toValidate = {
    body: req.body,
    params: req.params,
  };

  const userRules = Joi.object({
    params: { id: Joi.objectId() },
    body: {
      name: Joi.string(),
      email: Joi.string(),
      password: Joi.string(),
      phone: Joi.string(),
      subscription: Joi.string(),
      token: Joi.string(),
    },
  });

  const validationResult = userRules.validate(toValidate);
  if (validationResult.error) {
    return res.status(400).json(validationResult.error);
  }

  next();
}

async function updateUser(req, res, next) {
  try {
    // 1. validate request body +
    // 2. getUser index from userDB by id +
    // 3. if user not found - return 404 error +
    // 4. if user found - update user +
    // 5. send response with 200 and updated user
    const updatedUser = await UserModel.updateUser(req.params.id, req.body);
    if (!updatedUser) {
      throw new NotFound("User not found");
    }

    return res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
}

function validateDeleteUser(req, res, next) {
  const toValidate = {
    params: req.params,
  };

  const userRules = Joi.object({
    params: { id: Joi.objectId() },
  });

  const validationResult = userRules.validate(toValidate);
  if (validationResult.error) {
    return res.status(400).json(validationResult.error);
  }

  next();
}

async function deleteUser(req, res, next) {
  try {
    // 1. getUser index from userDB by id +
    // 2. if user not found - send 404 error +
    // 3. if user found - delete user from usersDB +
    // 4. send 204 response

    const deletedUser = await UserModel.deleteUser(req.params.id);
    if (!deletedUser) {
      throw new NotFound("User not found");
    }

    return res.status(204).send();
  } catch (err) {
    next(err);
  }
}

function validateGetUser(req, res, next) {
  const toValidate = {
    params: req.params,
  };

  const userRules = Joi.object({
    params: { id: Joi.objectId() },
  });

  const validationResult = userRules.validate(toValidate);
  if (validationResult.error) {
    return res.status(400).json(validationResult.error);
  }

  next();
}

export default {
  validateCreateUser,
  createUser,
  getAllUsers,
  getUser,
  validateUpdateUser,
  updateUser,
  validateDeleteUser,
  deleteUser,
  validateGetUser,
};
