const { Router } = require("express");
const Joi = require("@hapi/joi");

const usersRouter = Router();

const usersDB = require("./db/contacts.json");

//read all users
usersRouter.get("/contacts", getAllUsers);

//read user by id
usersRouter.get("/contacts/:contactId", getUserById);

//create user
usersRouter.post("/contacts", validateCreateUser, createUser);

// delete user
// usersRouter.delete("/contacts/:contactId", removeUser);

// update user
// usersRouter.patch("/contacts/:contactId", updateUser);

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

function validateCreateUser(req, res, next) {
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

 function createUser(req, res, next) {
  try {
    console.log('userDB', usersDB);
    // 1. Validate request body +
    // 2. create id for user +
    // 3. save user to usersDB +
    // 4. send 201 response +

    const id = Number(usersDB[usersDB.length - 1].id) + 1;

    const createdUser = {
      ...req.body,
      id,
    };
    usersDB.push(createdUser);

    console.log('userDB after', usersDB);

    return res.status(201).json(createdUser);
  } catch (err) {
    next(err);
  }
}
