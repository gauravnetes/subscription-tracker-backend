import { Router } from "express";
import authorize from "../middlewares/auth.middleware.js";
import { createSuubscription, getUserSubscriptions } from "../controllers/subscription.controller.js";

const subscriptionRouter = Router(); 

subscriptionRouter.get('/', (req, res) => {
    res.send({ 
        title: "Get all subscriptions"
    })
})
subscriptionRouter.get('/:id', (req, res) => {
    res.send({
        title: "GET subscription details"
    })
})
subscriptionRouter.post('/', authorize, createSuubscription)

subscriptionRouter.put('/:id', (req, res) => {
    res.send({
        title: "Update subscriptions"
    })
})
subscriptionRouter.delete('/delete', (req, res) => {
    res.send({
        title: "Delete subscriptions"
    })
})
subscriptionRouter.get('/user/:id', authorize, getUserSubscriptions)

subscriptionRouter.put('/:id/cancel', (res, req) => {
    res.send({
        title: "Cancel subscriptions"
    })
})
subscriptionRouter.get('/upcoming-renewals', (res, req) => {
    res.send({
        title: "Get Upcoming subscription renewals"
    })
})

export default subscriptionRouter