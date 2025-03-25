import { createRequire } from 'module'
const require = createRequire(import.meta.url)
const { serve } = require("@upstash/workflow/express");


import Subscription from '../models/subscription.model.js'
import dayjs from 'dayjs'
import { sendReminderEmail } from '../utils/send-email.js';

const REMINDERS = [7, 5, 2, 1]

export const sendReminder = serve(async (context) => {
    const { subscriptionId } = context.requestPayload;
    
    const subscription = await fetchSubscription(context, subscriptionId)
    // if subscripition doesn't exist, don't send the reminder return the function
    if (!subscription || subscription.status !== "active") {
        return; 
    }

    const renewalDate = dayjs(subscription.renewalDate)
    // check if renewal date is before the current date and time
    if (renewalDate.isBefore(dayjs())) {
        console.log(`Renewal date has passed for subscription ${subscriptionId}. Stopping Workflow`);
        return; 
    }

    for(const daysBefore of REMINDERS) {
        const reminderDate = renewalDate.subtract(daysBefore, 'day')
        // renewal Date -> 22 Feb, reminder date -> 15 feb, 17, 20, 21 

        if (reminderDate.isAfter(dayjs())) { 
            // sleep function
            await sleepUntilReminder(context, `Reminder ${daysBefore} days before`, reminderDate)
        }

        if (dayjs().isSame(reminderDate, 'day')) {
            await triggerReminder(context, `${daysBefore} days before reminder`, subscription)
        }
    }
})

const fetchSubscription = async (context, subscriptionId) => {
    return await context.run('get subscription', async () => {
        const subscription =  await Subscription.findById(subscriptionId).populate('user', 'name email'); 
        return subscription?.toObject(); 
    })
}

const sleepUntilReminder = async (context, label, date) => {
    console.log(`Sleeping until ${label} remiinder at ${date}`)
    await context.sleepUntil(label, date.toDate()); 
}

const triggerReminder = async (context, label, subscription) => { 
    return await context.run(label, async () => {
        console.log(`Triggering ${label} reminder`);
        // send email, sms, notification
        await sendReminderEmail({
            to: subscription.user.email, 
            type: label, 
            subscription, 
        })

    })
}