import Subscription from '../models/subscription.model.js'

export const createSuubscription = async(req, res, next) => {
    try {
        const subscription = await Subscription.create({
            ...req.body,
            user: req.user._id,
        })
    } catch (error) {
        next(error)
    }
}