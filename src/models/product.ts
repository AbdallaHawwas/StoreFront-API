import express,{Request,Response  } from "express";
import {Client} from "../database";

export type product = {
    id ?: Number,
    name : String,
    price: Number
}

export class productStore{
    // Get All products
    async index() :Promise<product> {
        try{
            const connect = await Client.connect();
            const sql = "SELECT * FROM products";
            const result = await connect.query(sql);
            connect.release();
            return result.rows as unknown as product;
        }catch(err){
            throw new Error(`Can't get products ${err}`)
        }
    }
    // Get Speciefied product
    async show(id:number) :Promise<product> {
        try{
            const connect = await Client.connect();
            const sql = 'SELECT * FROM products WHERE id = $1';
            const result = await connect.query(sql,[id]);
            connect.release();
            return result.rows[0];
        }catch(err){
            throw new Error(`Can't get product with id ${id} ${err}`)
        }
    }
    // Add New product
    async create(product:product) :Promise<product> {
        try{
            const connect = await Client.connect();
            const sql = 'INSERT INTO products (name,price) VALUES ($1,$2) RETURNING *';
            const result = await connect.query(sql,[product.name,product.price]);
            connect.release();
            return result.rows[0]; 
        }catch(err){
            throw new Error(`Can't add product ${err}`)
        }
    }
    // Update existing product
    async update(id:number,product:product) :Promise<product> {
        try{
            const connect = await Client.connect();
            const sql = 'UPDATE products SET name = $1,price = $2 WHERE id = $3 RETURNING *';
            const result = await connect.query(sql,[product.name,product.price,id]);
            connect.release();
            return result.rows[0]; 
        }catch(err){
            throw new Error(`Can't Update product with id ${product.id} ${err}`)
        }
    }
    // Delete existing user
    async delete(id:number) :Promise<product> {
        try{
            const connect = await Client.connect();
            const sql = 'DELETE FROM products WHERE id = $1';
            const result = await connect.query(sql,[id]);
            connect.release();
            return result.rows[0]; 
        }catch(err){
            throw new Error(`Can't Delete User with id ${id} ${err}`)
        }
    }
}