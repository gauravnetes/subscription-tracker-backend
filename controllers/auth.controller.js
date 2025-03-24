import mongoose from "mongoose";
import User from "../models/user.model.js"
// req.body? -> an obj containing data from the client (POST request)
export const signUp = async (req, res, next) => {
  const session = await mongoose.startSession(); // session of a mongoose transaction

  try {
    // logic to create a new user
    const { name, email, password } = req.body 
    
    const existingUser = await User.findOne()
    
    commitTransaction(); // commit to all of the actions we've done above
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    next(error);
  }
};
export const signIn = async (req, res, next) => {};
export const signOut = async (req, res, next) => {};
