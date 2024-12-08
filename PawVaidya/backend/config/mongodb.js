import mongoose from 'mongoose';

const connectdb = async () =>{
    try {
        mongoose.connection.on('connected' , () => console.log("Database connected Successfully!"));
        await mongoose.connect(`${process.env.MONGODB_URI}/PawVaidya`)
    } catch (error) {
        console.error("Database connection failed:", error.message);
        process.exit(1);
    }
}

export default connectdb