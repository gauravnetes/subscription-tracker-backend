import express from "express"
import { PORT } from "./config/env.js"
import userRouter from "./routes/user.routes.js";
import authRouter from "./routes/auth.routes.js";
import subscriptionRouter from "./routes/subscription.routes.js";
import connectToDB from "./database/mongodb.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import cookieParser from "cookie-parser";
import arcjetMiddleware from "./middlewares/arcjet.middleware.js";
import workflowRouter from "./routes/workflow.routes.js";

const app = express()

// built in middlewares of express
app.use(express.json()); // allow app to handle json data sent to request 
app.use(express.urlencoded({extended: false})) // parse URL-encoded request bodies. used to process HTML form data in simple format. without this req.body will be undefined
app.use(cookieParser()); // read cookies from incoming request 
app.use(arcjetMiddleware)

// we use app.use to specify which route we'll use too other than for middleware
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/users', userRouter)
app.use('/api/v1/subscriptions', subscriptionRouter)
app.use('/api/v1/workflows', workflowRouter)

app.use(errorMiddleware)

app.get('/', (req, res) => {
    res.send("Welcome to the subscription tracker API")  
}); 

app.listen(PORT, async () => {
    console.log(`Subscription tracker listening on Port http://localhost:${PORT}`);
    await connectToDB()
})

export default app 