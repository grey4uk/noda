import mongoose, { Schema } from "mongoose";

// id - string
// username - string
// email - string
// password - string

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  phone: { type: String },
  subscription: { type: String },
  token: { type: String },
});

userSchema.statics.createUser = createUser;
userSchema.statics.getAllUsers = getAllUsers;
userSchema.statics.getUserById = getUserById;
userSchema.statics.updateUser = updateUser;
userSchema.statics.deleteUser = deleteUser;

// collection name -> contacts
export const UserModel = mongoose.model("Contact", userSchema);

async function createUser(userParams) {
  return this.create(userParams);
}

async function getAllUsers() {
  return this.find();
}

async function getUserById(userId) {
  return this.findById(userId);
}

async function updateUser(userId, userParams) {
  return this.findByIdAndUpdate(
    userId,
    {
      $set: userParams,
    },
    { new: true }
  );
}

async function deleteUser(userId) {
  return this.findByIdAndDelete(userId);
}
