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
    const product = await productModel.show(req.body.id);
    res.json(product);
}

// Add New product
const create = async(req:Request,res:Response)=>{
    try {
        const authorizationHeader = req.headers.authorization
        const token = (authorizationHeader as string).split(' ')[1]
        jwt.verify(token, process.env.TOKEN_SECRET as jwt.Secret)
    } catch(err) {
        res.status(401)
        res.json('Access denied, invalid token')
        return
    }
    
    try{
        const products : product ={
            name: req.body.name,
            price:req.body.price
            
        }
        const product = await productModel.create(products);
        res.json(product);
    }catch(err){
        res.status(400)
        res.json(err)
    }

}

// Add New product
const update = async(req:Request,res:Response)=>{
    const products : product ={
        name: req.body.name,
        price:req.body.price
    }

    const product = await productModel.update(req.body.id,products);
    res.json(product);
}

// Delete product
const deleteproduct = async(req:Request,res:Response)=>{

    try {
        const authorizationHeader = req.headers.authorization
        const token = (authorizationHeader as string).split(' ')[1]
        jwt.verify(token, process.env.TOKEN_SECRET as jwt.Secret)
    } catch(err) {
        res.status(401)
        res.json('Access denied, invalid token')
        return
    }

    try{
        const product = await productModel.delete(req.body.id);
        res.json(product);
    }catch(err){
        res.status(400)
        res.json(err)
    }
}

export default productRoutes;
