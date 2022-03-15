import  express,{Request,Response}  from "express"
import {product,productStore} from '../models/product';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

const productModel = new productStore();

const productRoutes = (app: express.Application) => {
    app.get('/products', index)
    app.get('/products/:id', show)
    app.post('/products', create)
    app.put('/products/:id', update)
    app.delete('/products/:id', deleteproduct)
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
        const product = await productModel.create(products);
        const token = jwt.sign({products:product}, process.env.TOKEN_SECRET as jwt.Secret)
        console.log('req.body =', req.body);
        res.json({product,token,});
    } catch(err) {
        res.status(400)
        res.json(err)
        return
    }
}

// update product
const update = async(req:Request,res:Response)=>{
    const products : product ={
        name: req.body.name,
        price:req.body.price
    }
    const product = await productModel.update(parseInt(req.params.id),products);
    res.json(product);
}

// Delete product
const deleteproduct = async(req:Request,res:Response)=>{
    try{
        const product = await productModel.delete(parseInt(req.params.id));
        res.json(`Product with id ${req.params.id} Deleted Successfully`);
    }catch(err){
        res.status(400)
        res.json(err)
    }
}

export default productRoutes;
