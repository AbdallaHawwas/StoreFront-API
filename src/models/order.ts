import express,{Request,Response  } from "express";
import {Client} from "../database";

export type order = {
    id ?: Number,
    productId : Number,
    userId: Number
}

export class orderStore{
    // Get All orders
    async index() :Promise<order> {
        try{
            const connect = await Client.connect();
            const sql = "SELECT * FROM orders";
            const result = await connect.query(sql);
            connect.release();
            return result.rows[0];
        }catch(err){
            throw new Error(`Can't get orders ${err}`)
        }
    }
    // Get Speciefied order
    async show(id:number) :Promise<order> {
        try{
            const connect = await Client.connect();
            const sql = 'SELECT * FROM orders WHERE id = $1';
            const result = await connect.query(sql,[id]);
            connect.release();
            return result.rows[0];
        }catch(err){
            throw new Error(`Can't get order with id ${id} ${err}`)
        }
    }
    // Add New order
    async create(order:order) :Promise<order> {
        try{
            const connect = await Client.connect();
            const sql = 'INSERT INTO orders (productId,userId) VALUES ($1,$2) RETURNING *';
            const result = await connect.query(sql,[order.productId,order.userId]);
            connect.release();
            return result.rows[0]; 
        }catch(err){
            throw new Error(`Can't add order ${err}`)
        }
    }
    // Update existing order
    async update(id:number,order:order) :Promise<order> {
        try{
            const connect = await Client.connect();
            const sql = 'UPDATE orders SET productId = $1,userId = $2 WHERE id = $3';
            const result = await connect.query(sql,[order.productId,order.userId,id]);
            connect.release();
            return result.rows[0]; 
        }catch(err){
            throw new Error(`Can't Update order with id ${order.id} ${err}`)
        }
    }
    // Delete existing user
    async delete(id:number) :Promise<order> {
        try{
            const connect = await Client.connect();
            const sql = 'DELETE FROM orders WHERE id = $1';
            const result = await connect.query(sql,[id]);
            connect.release();
            return result.rows[0]; 
        }catch(err){
            throw new Error(`Can't Delete User with id ${id} ${err}`)
        }
    }
}