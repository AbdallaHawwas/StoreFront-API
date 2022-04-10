import express, { Request, Response } from 'express';
import { DashboardQueries } from '../services/dashboard';
import jwt from 'jsonwebtoken';

const dashboardRoutes = (app: express.Application) => {
    app.get('/users-with-orders', usersWithOrders);
    app.get('/active-user-orders/:user_id', activeUserOrders);
    app.get('/completed-user-orders/:user_id', completedUserOrders);
    app.get('/current-user-order/:user_id', currentUserOrder);
}

const dashboard = new DashboardQueries();

const usersWithOrders = async (_req: Request, res: Response) => {
    const users = await dashboard.usersWithOrders()
    res.json(users)
  }

const activeUserOrders = async (req: Request, res: Response) => {
    // Check authorization
    try{
        const authorizationHeader = req.headers.authorization
        const token = (authorizationHeader as string).split(' ')[1]
        jwt.verify(token, process.env.TOKEN_SECRET as string);

    } catch(err) {
        res.status(401)
        res.json('Access denied, invalid token')
        return
    }
    // Execute query
    try {
        const orders = await dashboard.activeUserOrders(parseInt(req.params.user_id));
        res.json(orders)
    } catch(err) {
        res.status(400)
        res.json(err)
        return
    }
}
const completedUserOrders = async (req: Request, res: Response) => {
    // Check authorization
    try{
        const authorizationHeader = req.headers.authorization
        const token = (authorizationHeader as string).split(' ')[1]
        jwt.verify(token, process.env.TOKEN_SECRET as string);

    } catch(err) {
        res.status(401)
        res.json('Access denied, invalid token')
        return
    }
    // Execute query
    try {
        const orders = await dashboard.completedUserOrders(parseInt(req.params.user_id));
        res.json(orders)
    } catch(err) {
        res.status(400)
        res.json(err)
        return
    }
}
const currentUserOrder = async (req: Request, res: Response) => {
    // Check authorization
    try{
        const authorizationHeader = req.headers.authorization
        const token = (authorizationHeader as string).split(' ')[1]
        jwt.verify(token, process.env.TOKEN_SECRET as string);

    } catch(err) {
        res.status(401)
        res.json('Access denied, invalid token')
        return
    }
    // Execute query
    try {
        const orders = await dashboard.currentUserOrder(parseInt(req.params.user_id));
        res.json(orders)
    } catch(err) {
        res.status(400)
        res.json(err)
        return
    }
}
export default dashboardRoutes
