import express from 'express';
import cors from 'cors';
import 'dotenv/config'
import connectdb  from './config/mongodb.js';
import connectCloudnairy from './config/cloudinary.js';
import adminRouter from './routes/adminroute.js';
import { doctorrouter } from './routes/doctorroute.js';
import userRouter from './routes/userroute.js';

// app config
const app = express();
const port = process.env.PORT || 4000;
connectdb()
connectCloudnairy() //

//middleware
app.use(express.json())
app.use(cors({ origin: "*" }));

//api endpoint
try {
    app.use('/api/admin', adminRouter);
  } catch (error) {
    console.error("Failed to use adminRouter:", error.message);
}
try {
    app.use('/api/doctor', doctorrouter);
  } catch (error) {
    console.error("Failed to use adminRouter:", error.message);
}
try {
    app.use('/api/user', userRouter);
  } catch (error) {
    console.error("Failed to use adminRouter:", error.message);
}
//localhost:4000/api/admin
app.get('/' , (req , res) => {
    res.send("Badhia Chall raha hai Guru")
})

app.listen(port , () => {
    console.log(`Server is Listining on port ${port}`)
})