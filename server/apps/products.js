import { Router } from "express";
import { db } from "../utils/db.js";
import { ObjectId } from "mongodb";

const productRouter = Router();

productRouter.get("/", async (req, res) => {
    const collection = db.collection("products");

    const productData = await collection.find().toArray();

    return res.json({
        data: productData
    });
});

productRouter.get("/:productId", (req, res) => {});

productRouter.post("/", async (req, res) => {
    const collection = db.collection("products");
    const productData = { ...req.body };

    await collection.insertOne(productData);
    
    return res.json({
        "message": "Product has been created successfully"
    });
});

productRouter.put("/:productId", async (req, res) => {
    const collection = db.collection("products");
    const newProductData = { ...req.body };
    const productId = new ObjectId(req.params.productId);
   
    await collection.updateOne(
        { _id: productId },
        { $set: newProductData }
    );

    return res.json({
        message: "Product has been updated successfully"
    });
});

productRouter.delete("/:productId", async (req, res) => {
    const collection = db.collection("products");
    const productId = new ObjectId(req.params.productId);

    await collection.deleteOne({ _id: productId })
    return res.json({
        message: "Product has been deleted successfully"
    });
});

export default productRouter;
