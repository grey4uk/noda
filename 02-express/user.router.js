const { Router } = require("express");
const Joi = require("@hapi/joi");
const fs = require("fs");
const { promises: fsPromises } = fs;
const path = require("path");
const contactsPath = path.join(__dirname, "./db/contacts.json");

const usersRouter = Router();

const usersDB = require("./db/contacts.json");

//read all users
usersRouter.get("/contacts", getAllUsers);

//read user by id
usersRouter.get("/contacts/:contactId", getUserById);

//create user
usersRouter.post("/contacts", validateCreateFields, createUser);

// delete user
usersRouter.delete("/contacts/:contactId", removeUser);

// update user
usersRouter.patch("/contacts/:contactId", validateUpdateFields, updateUser);

module.exports = usersRouter;

function getAllUsers(req, res, next) {
  // 1. return all users in response
  try {
    return res.status(200).json(usersDB);
  } catch (err) {
    next(err);
  }
}

function getUserById(req, res, next) {
  const userFound = usersDB.find(
    (user) => Number(user.id) === Number(req.params.contactId)
  );
  if (!userFound) {
    return res.status(404).send("User not found");
  }

  return res.status(200).json(userFound);
}

function validateCreateFields(req, res, next) {
  const body = req.body;

  const userRules = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required(),
  });

  const validationResult = userRules.validate(body);
  if (validationResult.error) {
    return res.status(400).send("missing required field");
  }

  next();
}

async function createUser(req, res, next) {
  try {
    // 1. Validate request body +
    // 2. create id for user +
    // 3. save user to usersDB +
    // 4. send 201 response +

    const id = Number(usersDB[usersDB.length - 1].id) + 1;

    const createdUser = {
      ...req.body,
      id,
    };
    // usersDB.push(createdUser);
    await fsPromises.writeFile(
      contactsPath,
      JSON.stringify([...usersDB, createdUser])
    );

    return res.status(201).json(createdUser);
  } catch (err) {
    next(err);
  }
}

function validateUpdateFields(req, res, next) {
  const body = req.body;

  if (body.name||body.email||body.phone) {
    const userRules = Joi.object({
      name: Joi.string(),
      email: Joi.string(),
      phone: Joi.string(),
    });

    const validationResult = userRules.validate(body);
    if (validationResult.error) {
      return res.status(400).json(validationResult.error);
    }
    next();
  } else return res.status(400).send("missing fields");
}

async function updateUser(req, res, next) {
  try {
    // 1. validate request body +
    // 2. getUser index from userDB by id +
    // 3. if user not found - return 404 error +
    // 4. if user found - update user +
    // 5. send response with 200 and updated user

    const userIndexFound = findUserIndex(req.params.contactId);

    usersDB[userIndexFound] = {
      ...usersDB[userIndexFound],
      ...req.body,
    };

    await fsPromises.writeFile(contactsPath, JSON.stringify([...usersDB]));

    return res.status(200).json(usersDB[userIndexFound]);
  } catch (err) {
    next(err);
  }
}

function findUserIndex(userId) {
  const userIndexFound = usersDB.findIndex(
    (user) => Number(user.id) === Number(userId)
  );
  if (userIndexFound === -1) {
    const err = new Error("User not found");
    err.status = 404;
    throw err;
  }

  return userIndexFound;
}

async function removeUser(req,res,next) {
  try {
    // 1. getUser index from userDB by id +
    // 2. if user not found - send 404 error +
    // 3. if user found - delete user from usersDB +
    // 4. send 204 response

    const userIndexFound = findUserIndex(req.params.contactId);

    usersDB.splice(userIndexFound, 1);

    await fsPromises.writeFile(contactsPath, JSON.stringify([...usersDB]));

    return res.status(200).send("Contact deleted");
  } catch (err) {
    next(err);
  }
}