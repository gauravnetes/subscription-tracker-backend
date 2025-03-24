import mongoose from "mongoose";
import { DB_URI, NODE_ENV } from "../config/env.js";

if (!DB_URI) {
    throw new Error("Please define the MONGODB_URI env variable inside .env.development.local")

}

const connectToDB = async() => {
    try {
        await mongoose.connect(DB_URI); 
        console.log(`connected to DB in ${NODE_ENV} mode`);
        
    } catch (error) {
        console.error("Error connecting to DB: ", error)
        process.exit(1); 
    }
}

export default connectToDB