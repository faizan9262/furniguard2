import mongoose from "mongoose";

const mongoDBConnect = async () =>{
    mongoose.connection.on('connected' , () =>{
        console.log('Database connected');
    })
    await mongoose.connect(`${process.env.MONGODB_URI}`)
}

export default mongoDBConnect;