import express,{Request,Response  } from "express";
import {Client} from "../database";
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

export type user = {
    id ?: Number,
    name : String,
    password: String,
    age?: Number
}

export class userStorage {
    // Get All users
    async index() :Promise<user> {
        try{
            const connect = await Client.connect();
            const sql = "SELECT * FROM users";
            const result = await connect.query(sql);
            connect.release();
            return result.rows[0];
        }catch(err){
            throw new Error(`Can't get users ${err}`)
        }
    }
    // Get Specified user
    async show(id:number) :Promise<user> {
        try{
            const connect = await Client.connect();
            const sql = "SELECT name,age FROM users WHERE id=$1";
            const result = await connect.query(sql,[id]);
            connect.release();
            return result.rows[0];
        }catch(err){
            throw new Error(`Can't get user with id ${id} : ${err}`)
        } 
    }
    // Get Specified user
    async create(user:user) :Promise<user> {
        try{
            const connect = await Client.connect();
            const sql = "INSERT INTO users (name,password,age) VALUES ($1,$2,$3)";
            const hashPass = bcrypt.hashSync(user.password + (process.env.BCRYPT_PASSWORD as string) ,parseInt(process.env.SALT_ROUNDS as string))
            const result = await connect.query(sql,[user.name,hashPass,user.age]);
            connect.release();
            return result.rows[0];
        }catch(err){
            throw new Error(`Can't create user with : ${err}`)
        } 
    }
    // Authenticate 
    async authenticate(name:string,password:string):Promise<user | null>{
        const connect = await Client.connect();
        const sql = "SELECT password FROM users WHERE name = $1";
        const result = await connect.query(sql,[name]);

        if(result.rows.length) {
    
            const user = result.rows[0]
          
            if (bcrypt.compareSync(password + (process.env.BCRYPT_PASSWORD as string), user.password)) {
              return user
            }
          }
      
          return null
    }
    // Update Specified user
    async update(id:number,user:user) :Promise<user> {
        try{
            const connect = await Client.connect();
            const sql = "UPDATE products SET name = $1,password = $2,age = $3 WHERE id = $4";
            const hashPass = bcrypt.hashSync(user.password + (process.env.BCRYPT_PASSWORD as string) ,parseInt(process.env.SALT_ROUNDS as string))
            const result = await connect.query(sql,[user.name,hashPass,user.age,id]);
            connect.release();
            return result.rows[0];
        }catch(err){
            throw new Error(`Can't update user with : ${err}`)
        } 
    }
    // Delete user
    async delete(id:number) :Promise<user> {
        try{
            const connect = await Client.connect();
            const sql = "DELETE FROM users WHERE id = $1";
            const result = await connect.query(sql,[id]);
            connect.release();
            return result.rows[0];
        }catch(err){
            throw new Error(`Can't Delete user with : ${err}`)
        }
    }
}