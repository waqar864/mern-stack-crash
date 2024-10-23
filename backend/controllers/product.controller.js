import Product from "../models/product.model.js";
import mongoose from "mongoose";

// get all products
export const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json({ success: true, data: products });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

// create product
export const createProduct = async (req, res) => {
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

}

// update product

export const updateProduct = async (req, res) => {
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
}

// delete product
export const deleteProduct =  async (req, res) => {
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

}