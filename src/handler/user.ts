import  express,{Request,Response}  from "express"
import {user,userStorage} from '../models/user';
import jwt from 'jsonwebtoken';

const userModel = new userStorage();

const userRoutes = (app: express.Application) => {
    app.get('/users', index)
    app.get('/users/:id', show)
    app.post('/users', create)
}
// Get All users
const index = async(req:Request,res:Response)=>{
    const user = await userModel.index();
    
    try { 
        const authorizationHeader = req.headers.authorization
        const token = (authorizationHeader as string).split(' ')[1]
        jwt.verify(token, process.env.TOKEN_SECRET as string)
        res.json(user);

    } catch(err) {
        res.status(401)
        res.json('Access denied, invalid token')
        return
    }
}

// Get Speciefied user
const show = async(req:Request,res:Response)=>{
    const user = await userModel.show(parseInt(req.params.id));
    try { 
        const authorizationHeader = req.headers.authorization
        const token = (authorizationHeader as string).split(' ')[1]
        jwt.verify(token, process.env.TOKEN_SECRET as string)
        res.json(user);
        
    } catch(err) {
        res.status(401)
        res.json('Access denied, invalid token')
        return
    }
}

// Add New user
const create = async(req:Request,res:Response)=>{
    const users : user ={
        firstName: req.body.firstName,
        lastName:  req.body.lastName,
        password:  req.body.password
    }
    try{
        const user = await userModel.create(users);
        const token = jwt.sign({firstName: users.firstName ,lastName: users.lastName}, process.env.TOKEN_SECRET as jwt.Secret);
        res.json({user,token});
    }
    catch(err){
        res.status(400)
        res.json(`${err} : ${users}`)
    }
}


export default userRoutes;
