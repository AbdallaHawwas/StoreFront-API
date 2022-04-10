import {pool} from '../database'
import { order,orderStore } from '../models/order'


export class DashboardQueries {

   // Get all products that have been included in orders
   async usersWithOrders(): Promise<{name: string, price: number, order_id: string}[]> {
    try {
      const conn = await pool.connect()
      const sql = 'SELECT DISTINCT users.id,users.firstName,users.lastName FROM orders INNER JOIN users ON orders.user_id = users.id'

      const result = await conn.query(sql)

      conn.release()

      return result.rows
    } catch (err) {
      throw new Error(`unable get products and orders: ${err}`)
    } 
  }
  // Get Current Active User Orders
  async activeUserOrders(user_id:number) : Promise<order>{
    try {
      const conn = await pool.connect()
      const sql = 'SELECT orders.*,users.id FROM orders INNER JOIN users ON users.id = orders.user_id  WHERE user_id = $1 AND status = 1';
      const result = await conn.query(sql,[user_id]);

      conn.release()

      return result.rows as unknown as order
    } catch (err) {
      throw new Error(`unable get orders: ${err}`)
    }
  }
  // Get Current Completed User Orders
  async completedUserOrders(user_id:number) : Promise<order>{
    try {
      const conn = await pool.connect()
      const sql = 'SELECT orders.*,users.id FROM orders INNER JOIN users ON orders.user_id = users.id WHERE user_id = $1 AND status = 2';
      const result = await conn.query(sql,[user_id]);

      conn.release()

      return result.rows as unknown as order
    } catch (err) {
      throw new Error(`unable get orders: ${err}`)
    }
  }
    // Get Current User Order
  async currentUserOrder(user_id:number) : Promise<order>{
    try {
      const conn = await pool.connect()
      const sql = 'SELECT orders.*,users.id FROM orders INNER JOIN users ON orders.user_id = users.id WHERE user_id = $1 AND status = 1 ORDER BY orders.id DESC LIMIT 1';
      const result = await conn.query(sql,[user_id]);

      conn.release()

      return result.rows as unknown as order
    } catch (err) {
      throw new Error(`unable get orders: ${err}`)
    }
  }
}