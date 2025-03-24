import { Router } from "express";

const userRouter = Router(); 

// GET /users -> get all users
// GET /users/:id -> get user by id       
userRouter.get('/', (req, res) => {
    res.send("GET All Users")
})
userRouter.get('/:id', (req, res) => {
    res.send("GET User Details")
})
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