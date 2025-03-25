import { Router } from "express";
import { getUser, getUsers } from "../controllers/user.controller.js";
import authorize from "../middlewares/auth.middleware.js"
const userRouter = Router(); 

// GET /users -> get all users
// GET /users/:id -> get user by id       
userRouter.get('/', getUsers)
userRouter.get('/:id', authorize, getUser) // using the authorize middleware

userRouter.post('/', (req, res) => {
    res.send("CREATE New Users")
})
userRouter.put('/:id', (req, res) => {
    res.send("UPDATE An Users")
})
userRouter.delete('/:id', (req, res) => {
    res.send("DELETE An User")
})

export default userRouter