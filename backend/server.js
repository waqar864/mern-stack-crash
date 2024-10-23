import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/product.route.js";


dotenv.config();
const app = express();
const port = process.env.PORT || 3000;  


app.use(express.json());// this is the middle where to send request to body or allow us to accapt json data in the req.body

app.use("/api/products", productRoutes);

console.log(process.env.MONGO_URI);

app.listen(port, () => {
    connectDB();
    console.log("Server started at http://localhost:" + port); 
});

 