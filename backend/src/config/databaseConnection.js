import { connect } from "mongoose"

export const connectDB = async()=>{
    try {
        await connect(process.env.MONGODB_URL)
    } catch (error) {
        console.log(error);
        throw new Error("Cannot connect to Database.")
    }
}