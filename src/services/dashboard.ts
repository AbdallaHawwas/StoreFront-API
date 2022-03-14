import {Client} from '../database'

export class DashboardQueries {
  // Get all users that have made orders
  async usersWithOrders(): Promise<{name: string}[]> {
    try {
        
      const conn = await Client.connect()
      const sql = 'SELECT name FROM users INNER JOIN orders ON users.id = orders.user_id'

      const result = await conn.query(sql)

      conn.release()

      return result.rows
    } catch (err) {
      throw new Error(`unable get users with orders: ${err}`)
    } 
  }
  async productsInOrders(): Promise<{name: string}[]> {
    try {
        
      const conn = await Client.connect()
      const sql = 'SELECT name FROM products INNER JOIN orders ON product.id = orders.product_id'

      const result = await conn.query(sql)

      conn.release()

      return result.rows
    } catch (err) {
      throw new Error(`unable get products with orders: ${err}`)
    } 
  }
}