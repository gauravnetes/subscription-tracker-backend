import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: [true, 'user name is required'], 
        trim: true, 
        minLength: 2, 
        maxLength: 50,
    }, 
    email: {
        type: String, 
        required: [true, "User email is required"], 
        trim: true, 
        unique: true, 
        lowercase: true,
        // Regex for email validation
        match: [/\S+@\S+\.\S+/, 'Please provide a valid email address'], 
    }, 
    password: {
        type: String, 
        required: {true: 'User Password is required'}, 
        minLength: 6,
    }
}, {timestamps: true})

const User = mongoose.model('User', userSchema)
export default User

// User.create(pass the required infos)
// {name: 'gourav', email: 'gourav@gmail.com', password: 'password' }