import  express,{Request,Response}  from "express"
import {order,orderStore} from '../models/order';
import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';

const orderModel = new orderStore();

const orderRoutes = (app: express.Application) => {
    app.get('/orders', index)
    app.get('/orders/:id', show)
    app.post('/orders', create)
    app.delete('/orders/:id', deleteorder)
    // add product
    app.post('/orders/:id/products', addProduct)
}
// Get All orders
const index = async(req:Request,res:Response)=>{
    const order = await orderModel.index();
    res.json(order);
}

// Get Speciefied order
const show = async(req:Request,res:Response)=>{
    const order = await orderModel.show(parseInt(req.params.id));
    res.json(order);
}

// Add New order
const create = async(req:Request,res:Response)=>{
    const orders : order ={
        productId: parseInt(req.body.productId),
        userId:    parseInt(req.body.userId),
        quantity:  req.body.quantity,
        status:    req.body.status
    }
    // Check user with jwt
    try{
        const authorizationHeader = req.headers.authorization
        const token = (authorizationHeader as string).split(' ')[1]
        jwt.verify(token, process.env.TOKEN_SECRET as string);

    } catch(err) {
        res.status(401)
        res.json('Access denied, invalid token')
        return
    }
    // Procced after auth
    try {
        const order = await orderModel.create(orders);
        res.json(order);
    } catch(err) {
        res.status(400)
        res.json(err)
        return
    }
}

// Delete order
const deleteorder = async(req:Request,res:Response)=>{

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
        const order = await orderModel.delete(parseInt(req.params.id));
        res.json(order);
    }catch(err){
        res.status(400)
        res.json(err)
    }
}
const addProduct = async(req:Request,res:Response)=>{

}

export default orderRoutes;
