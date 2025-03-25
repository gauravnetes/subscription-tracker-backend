import Subscription from '../models/subscription.model.js'
import { workFlowClient } from '../config/upstash.js'
import { SERVER_URL } from '../config/env.js';

export const createSuubscription = async(req, res, next) => {
    try {
        console.log("Request user in createSubscription:", req.user); 

        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized, user not found in request" });
        }

        const subscription = await Subscription.create({
            ...req.body,
            user: req.user._id, // if they're not authorized they won't be able to create a subscription
        })

        // subscription reminder workflow
        await workFlowClient.trigger({
            url: `${SERVER_URL}/api/v1/workflows/subscription/reminder`,
            body: {
                subscriptionId: subscription.id
            }, 
            headers: {
                'content-type': 'application/json'
            }, 
            retries: 0,
        })

        res.status(201).json({ success: true, data: subscription})
    } catch (error) {
        next(error)
    }
}

export const getUserSubscriptions = async(req, res, next) => {
    try {
        if (req.user.id !== req.params.id) {
            const error = new Error("You aren't the owner of the account");; 
            error.status = 401; 
            throw error; 
        }

        const subscriptions = await Subscription.find(
            {user: req.params.id}
        )

        res.status(200).json({ success: true, data: subscriptions })
    } catch (error) {
        next(error)
    }
}