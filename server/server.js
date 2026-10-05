import "dotenv/config"
import express from "express"
import {connectDB} from "./config/db.js"
import cors from "cors";
import authRoutes from "./routes/authRoutes.js"
import vehicleRoutes from "./routes/vehicleRoutes.js"
import bookingRoutes from "./routes/bookingRoutes.js"


connectDB();        //database connect

const app = express();   //server create

app.use(cors({ origin: process.env.CLIENT_URL}));  //frontend allow
app.use(express.json());        //JSON Read

app.get("/", (req,res)=>res.send("Api running"));  //Test Route

app.use("/api/auth",authRoutes);
app.use("/api/vehicles", vehicleRoutes);
app.use("/api/bookings", bookingRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT,()=> console.log(`Server is running on port ${PORT}`));

