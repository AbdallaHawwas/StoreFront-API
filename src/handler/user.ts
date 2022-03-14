import  express,{Request,Response}  from "express"
import {user,userStorage} from '../models/user';
import jwt from 'jsonwebtoken';

const userModel = new userStorage();

const userRoutes = (app: express.Application) => {
    app.get('/users', index)
    app.get('/users/:id', show)
    app.post('/user-auth', authenticate)
    app.post('/users', create)
    app.put('/users/:id', update)
    app.delete('/users/:id', deleteuser)
}
// Get All users
const index = async(req:Request,res:Response)=>{
    const user = await userModel.index();
    res.json(user);
}

// Get Speciefied user
const show = async(req:Request,res:Response)=>{
    const user = await userModel.show(req.body.id);
    res.json(user);
}

// Add New user
const create = async(req:Request,res:Response)=>{
    const users : user ={
        name: req.body.name,
        password:req.body.password,
        age:req.body.age
    }
    try{
        const user = await userModel.create(users);
        const token = jwt.sign({users : user}, process.env.TOKEN_SECRET as jwt.Secret);
        res.json(token);
    }
    catch(err){
        res.status(400)
        res.json(`${err} : ${users}`)
    }
}
// Authenticate User
const authenticate = async (req:Request,res:Response)=>{
    const users : user ={
        name: req.body.name,
        password: req.body.password
    }
    try{
        const user = await userModel.authenticate(users.name as string ,users.password as string);
        const token = jwt.sign({users : user}, process.env.TOKEN_SECRET as jwt.Secret);
        res.json(token);
    }
    catch(err){
        res.status(401)
        res.json({err})
    }
}
// Add New user
const update = async(req:Request,res:Response)=>{
    const users : user ={
        id: parseInt(req.params.id),
        name: req.body.name,
        password:req.body.password,
        age:req.body.age
    }
    try {
        const authorizationHeader = req.headers.authorization
        const token = (authorizationHeader as string).split(' ')[1]
        jwt.verify(token, process.env.TOKEN_SECRET as jwt.Secret)
    } catch(err) {
        res.status(401)
        res.json(err)
        return
    }

    try {
        const user = await userModel.update(req.body.id,users);
        const token = jwt.sign({users : user}, process.env.TOKEN_SECRET as jwt.Secret);
        res.json(token);    
    } catch(err) {
        res.status(400)
        res.json(err as string + users)
    }

}

// Delete user
const deleteuser = async(req:Request,res:Response)=>{
    try {
        const authorizationHeader = req.headers.authorization
        const token = (authorizationHeader as string).split(' ')[1]
        jwt.verify(token, process.env.TOKEN_SECRET as string)
    } catch(err) {
        res.status(401)
        res.json('Access denied, invalid token')
        return
    }
    try{
        const user = await userModel.delete(req.body.id);
        res.json(user);
    }catch(err){
        res.status(400)
        res.json(err)
    }
}

export default userRoutes;
