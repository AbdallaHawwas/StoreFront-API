"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderStore = void 0;
const database_1 = require("../database");
class orderStore {
    // Get All orders
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connect = yield database_1.Client.connect();
                const sql = "SELECT * FROM orders";
                const result = yield connect.query(sql);
                connect.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Can't get orders ${err}`);
            }
        });
    }
    // Get Speciefied order
    show(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connect = yield database_1.Client.connect();
                const sql = 'SELECT * FROM orders WHERE id = $1';
                const result = yield connect.query(sql, [id]);
                connect.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Can't get order with id ${id} ${err}`);
            }
        });
    }
    // Add New order
    create(order) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connect = yield database_1.Client.connect();
                const sql = 'INSERT INTO orders (productId,userId) VALUES ($1,$2) RETURNING *';
                const result = yield connect.query(sql, [order.productId, order.userId]);
                connect.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Can't add order ${err}`);
            }
        });
    }
    // Update existing order
    update(id, order) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connect = yield database_1.Client.connect();
                const sql = 'UPDATE orders SET productId = $1,userId = $2 WHERE id = $3';
                const result = yield connect.query(sql, [order.productId, order.userId, id]);
                connect.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Can't Update order with id ${order.id} ${err}`);
            }
        });
    }
    // Delete existing user
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connect = yield database_1.Client.connect();
                const sql = 'DELETE FROM orders WHERE id = $1';
                const result = yield connect.query(sql, [id]);
                connect.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Can't Delete User with id ${id} ${err}`);
            }
        });
    }
}
exports.orderStore = orderStore;
