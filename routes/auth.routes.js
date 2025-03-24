import { Router } from "express";
import { signIn, signOut, signUp } from "../controllers/auth.controller.js";

const authRouter = Router(); 

// path: /api/v1/auth/sign-up (POST)
authRouter.post('/sign-up', signUp)
// make a form in the frontend and make a call in the api
// /api/v1/auth/sign-up -> POST body -> {name, email, password} -> creates a new user 


// path: /api/v1/auth/sign-in (POST)
authRouter.post('/sign-in', signIn)

// path: /api/v1/auth/sign-out (POST)
authRouter.post('/sign-out', signOut)

export default authRouter