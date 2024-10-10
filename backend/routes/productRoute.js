import express from "express";
import { addProduct, removeProduct, listProducts, singleProduct } from '../controllers/productController.js'
import upload from "../middleware/multer.js";

const productRouter = express.Router();

productRouter.post('/add', upload.fields(
    [
        { name: "imaage1", maxCount: 1 },
        { name: "imaage2", maxCount: 1 },
        { name: "imaage3", maxCount: 1 },
        { name: "imaage4", maxCount: 1 }
    ]
), addProduct)
productRouter.post('/remove', removeProduct)
productRouter.post('/single', singleProduct)
productRouter.get('/list', listProducts)

export default productRouter;