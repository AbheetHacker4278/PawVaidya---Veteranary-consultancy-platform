import mongoose from 'mongoose';

export const connectdb = async () =>{
    try{
        console.log("mongo url: " , process.env.MONGO_URL)
        const conn = await mongoose.connect(process.env.MONGO_URL)
        console.log(`Mongo Db Connection Established: ${conn.connection.host}`)
    }catch(error){
        console.log("Getting error while connection to MongoDB: " , error.message)
        process.exit(1) // 1 is faliure , 0 is success code
    }
}