import  express,{Request,Response}  from "express"
import {order,orderStore} from '../models/order';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

const orderModel = new orderStore();

const orderRoutes = (app: express.Application) => {
    app.get('/orders', index)
    app.get('/orders/:id', show)
    app.post('/orders', create)
    app.put('/orders/:id', update)
    app.delete('/orders/:id', deleteorder)
}
// Get All orders
const index = async(req:Request,res:Response)=>{
    const order = await orderModel.index();
    res.json(order);
}

// Get Speciefied order
const show = async(req:Request,res:Response)=>{
    const order = await orderModel.show(req.body.id);
    res.json(order);
}

// Add New order
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
        const orders : order ={
            productId: req.body.productId,
            userId:req.body.userId   
        }
        const order = await orderModel.create(orders);
        res.json(order);
    }catch(err){
        res.status(400)
        res.json(err)
    }

}

// Add New order
const update = async(req:Request,res:Response)=>{
    const orders : order ={
        productId: req.body.productId,
        userId:req.body.userId
    }

    const order = await orderModel.update(req.body.id,orders);
    res.json(order);
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
        const order = await orderModel.delete(req.body.id);
        res.json(order);
    }catch(err){
        res.status(400)
        res.json(err)
    }
}

export default orderRoutes;
