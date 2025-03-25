import nodemailer from 'nodemailer'
import { EMAIL_PASSWORD } from './env'

export const accountEmail = 'gouravchandra935@gmail.com'
const transporter = nodemailer.createTransport({
    service: 'gmail', 
    auth: {
        user: accou, 
        pass: EMAIL_PASSWORD
    }
})

export default transporter