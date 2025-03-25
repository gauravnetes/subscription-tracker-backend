import dayjs from "dayjs";
import { emailTemplates } from "./emails.template.js"
import transporter, { accountEmail } from "../config/nodemailer.js";

export const sendReminderEmail = async((to, type, subscription) => {
    if (!to || !type) {
        throw new Error("Miissing required parameters")
    }

    const template = emailTemplates.find((t) => t.label === type); 

    if (!template) {
        throw new Error("Invalid Email type"); 
    }

    const mailInfo = {
        userName: subscription.user.name, 
        subscriptionName: subscription.name, 
        renewalDate: dayjs(subscription.renewalDate).format('MMM D, YYYY'), 
        planName: subscription.name, 
        price: `${subscription.currency} ${subscription.price} (${subscription.frequency})`,
        paymentMethod: subscription.paymentMethod

    }

    const message = template.generateBody(mailInfo)
    const subject = template.generateSubject(mailInfo)

    const mailOptions = {
        from: accountEmail,  
        to: to, 
        subject: subject, 
        html: message
    }

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            return console.log(err, "Error sending the Email"); 
        }

        console.log('Email sent: ' + info.response)
    })
})