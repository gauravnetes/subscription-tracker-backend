import { Router } from "express";

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
subscriptionRouter.post('/', (req, res) => {
    res.send({
        title: "Create subscriptions"
    })
})
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
subscriptionRouter.get('/user/:id', (req, res) => {
    res.send({
        title: "Get all user subscriptions"
    })
})
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