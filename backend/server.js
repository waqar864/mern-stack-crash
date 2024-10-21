import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import Product from "./models/product.model.js";
import mongoose from "mongoose";


dotenv.config();
const app = express();


app.use(express.json());// this is the middle where to send request to body or allow us to accapt json data in the req.body

app.get("/api/products", async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json({ success: true, data: products });
    } catch (error) {
        console.log("Error in fetching products:", error.message);
        res.status(500).json({ success: false, message: "Internal Server Error" });
        
    }
    
});

app.post("/api/products", async (req, res) => {
    // res.send("Server is Ready");
    const product = req.body; // user will send this data 
    if(!product.name || !product.price || !product.description || !product.image) {
        return res.status(400).json({ Success: false, message: "Please fill all the fields" });
    }

    const newProduct = new Product(product);
    try {
        await newProduct.save();
        res.status(201).json({ success: true, data: newProduct });
    } catch (error) {
        console.log("Error in create product:", error.message);
        res.status(500).json({ success: false, message: "Internal Server Error" });
        
    } 

});

app.delete("/api/products/:id", async (req, res) => {
    const { id } = req.params;
    console.log("id",id);
    if(!id) {
        return res.status(400).json({ Success: false, message: "Please fill all the fields" });
    }
    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Product deleted successfully" });
    } catch (error) {
        console.log("Error in delete product:", error.message);
        res.status(500).json({ success: false, message: "Internal Server Error" });

    }

});

app.put("/api/products/:id", async (req, res) => {
    const { id } = req.params;
    const product = req.body;
    if(!id || !product) {
        return res.status(400).json({ Success: false, message: "Invalid Product Id" });
    }
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "No product with that id" });
    }
    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, product, {new: true});
        res.status(200).json({ success: true, data: updatedProduct });
    } catch (error) {
        console.log("Error in update product:", error.message);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
})

console.log(process.env.MONGO_URI);

app.listen(3000, () => {
    connectDB();
    console.log("Server started at http://localhost:3000 "); 
});

// yXs9968RFKHNDQeX
// waqarkhan864