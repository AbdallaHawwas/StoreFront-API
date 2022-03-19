import  express,{Request,Response}  from "express"
import {product,productStore} from '../models/product';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

const productModel = new productStore();

const productRoutes = (app: express.Application) => {
    app.get('/products', index)
    app.get('/products/:id', show)
    app.post('/products', create)
}
// Get All products
const index = async(req:Request,res:Response)=>{
    const product = await productModel.index();
    res.json(product);
}

// Get Speciefied product
const show = async(req:Request,res:Response)=>{
    const product = await productModel.show(parseInt(req.params.id));
    res.json(product);
}

// Add New product
const create = async(req:Request,res:Response)=>{
    const products : product ={
        name: req.body.name,
        price: req.body.price   
    }
    try { 
        const authorizationHeader = req.headers.authorization
        const token = (authorizationHeader as string).split(' ')[1]
        jwt.verify(token, process.env.TOKEN_SECRET as string)
    
    } catch(err) {
        res.status(401)
        res.json('Access denied, invalid token')
        return
    }
    try {
        const product = await productModel.create(products);
       res.json({product});
    } catch(err) {
        res.status(400)
        res.json(err)
        return
    }
}



export default productRoutes;
