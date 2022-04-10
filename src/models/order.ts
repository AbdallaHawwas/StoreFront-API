import express,{Request,Response  } from "express";
import {pool} from "../database";
import { user } from "./user";
import { product } from "./product";

export type order = {
    id ?: Number,
    productId : Number,
    userId: Number,
    quantity: Number,
    status: Number // [1 => active, 2 => complete]
}

export class orderStore{
    // Get All orders
    async index() :Promise<order> {
        try{
            const connect = await pool.connect();
            const sql = "SELECT * FROM orders";
            const result = await connect.query(sql);
            connect.release();
            return result.rows as unknown as order;
        }catch(err){
            throw new Error(`Can't get orders ${err}`)
        }
    }
    // Get Speciefied order
    async show(id:number) :Promise<order> {
        try{
            const connect = await pool.connect();
            const sql = 'SELECT * FROM orders WHERE id = $1';
            const result = await connect.query(sql,[id]);
            connect.release();
            return result.rows[0];
        }catch(err){
            throw new Error(`Can't get order with id ${id} ${err}`)
        }
    }
    // Add New order
    async create(order : order) :Promise<order>{
        try{
            const connect = await pool.connect();
            const sql = 'INSERT INTO orders (product_id,user_id,quantity,status) VALUES ($1,$2,$3,$4) RETURNING *';
            const result = await connect.query(sql,[order.productId,order.userId,order.quantity,order.status]);
            connect.release();
            return result.rows[0]; 
        }catch(err){
            throw new Error(`Can't add order ${err}`)
        }
}

    // Delete existing user
    async delete(id:number) :Promise<order> {
        try{
            const connect = await pool.connect();
            const sql = 'DELETE FROM orders WHERE id = $1';
            const result = await connect.query(sql,[id]);
            connect.release();
            return result.rows[0]; 
        }catch(err){
            throw new Error(`Can't Delete User with id ${id} ${err}`)
        }
    }
}