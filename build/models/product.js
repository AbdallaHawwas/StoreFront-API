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
exports.productStore = void 0;
const database_1 = require("../database");
class productStore {
    // Get All products
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connect = yield database_1.Client.connect();
                const sql = "SELECT * FROM products";
                const result = yield connect.query(sql);
                connect.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Can't get products ${err}`);
            }
        });
    }
    // Get Speciefied product
    show(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connect = yield database_1.Client.connect();
                const sql = 'SELECT * FROM products WHERE id = $1';
                const result = yield connect.query(sql, [id]);
                connect.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Can't get product with id ${id} ${err}`);
            }
        });
    }
    // Add New product
    create(product) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connect = yield database_1.Client.connect();
                const sql = 'INSERT INTO products (name,price) VALUES ($1,$2) RETURNING *';
                const result = yield connect.query(sql, [product.name, product.price]);
                connect.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Can't add product ${err}`);
            }
        });
    }
    // Update existing product
    update(id, product) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connect = yield database_1.Client.connect();
                const sql = 'UPDATE products SET name = $1,price = $2 WHERE id = $3';
                const result = yield connect.query(sql, [product.name, product.price, id]);
                connect.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Can't Update product with id ${product.id} ${err}`);
            }
        });
    }
    // Delete existing user
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connect = yield database_1.Client.connect();
                const sql = 'DELETE FROM products WHERE id = $1';
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
exports.productStore = productStore;
