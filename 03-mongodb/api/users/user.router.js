import { Router } from "express";
import userController from "./user.controller";

const usersRouter = Router();

// C - Create
usersRouter.post(
  "/contacts",
  userController.validateCreateUser,
  userController.createUser
);

// R - Read
usersRouter.get("/contacts", userController.getAllUsers);
usersRouter.get(
  "/contacts/:id",
  userController.validateGetUser,
  userController.getUser
);

// U - Update
usersRouter.patch(
  "/contacts/:id",
  userController.validateUpdateUser,
  userController.updateUser
);

// D - Delete
usersRouter.delete(
  "/contacts/:id",
  userController.validateDeleteUser,
  userController.deleteUser
);

export default usersRouter;
