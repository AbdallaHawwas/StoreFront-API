import  express,{Request,Response}  from "express"
import {user,userStorage} from '../models/user';

const userModel = new userStorage();

const userRoutes = (app: express.Application) => {
    app.get('/users', index)
    app.get('/users/:id', show)
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

    const user = await userModel.create(users);
    res.json(user);
}

// Add New user
const update = async(req:Request,res:Response)=>{
    const users : user ={
        name: req.body.name,
        password:req.body.password,
        age:req.body.age
    }

    const user = await userModel.update(req.body.id,users);
    res.json(user);
}

// Delete user
const deleteuser = async(req:Request,res:Response)=>{

    const user = await userModel.delete(req.body.id);
    res.json(user);
}

export default userRoutes;
