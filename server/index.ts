import dotenv from 'dotenv';
dotenv.config();
console.log("API KEY:",
process.env.WORKOS_API_KEY);
console.log("CLIENT ID:",
process.env.WORKOS_CLIENT_ID);
//fixing issues above


console.log("Backend started");
import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth';
import userRoutes from "./routes/user";// phase 2 for admin and client

const app = express();
app.use (cors()); //to enable cors
app.use(express.json());
app.use("/api/users",userRoutes);
app.use('/api/auth',authRoutes); //admin and client.

const PORT = process.env.PORT || 3000; //process.env.PORT

app.listen(PORT, () =>{
    console.log(`Server is running on port ${PORT}`); //little display issues might coome.
});