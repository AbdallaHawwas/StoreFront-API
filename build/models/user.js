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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userStorage = void 0;
const database_1 = require("../database");
const bcrypt_1 = __importDefault(require("bcrypt"));
class userStorage {
    // Get All users
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connect = yield database_1.Client.connect();
                const sql = "SELECT * FROM users";
                const result = yield connect.query(sql);
                connect.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Can't get users ${err}`);
            }
        });
    }
    // Get Specified user
    show(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connect = yield database_1.Client.connect();
                const sql = "SELECT name,age FROM users WHERE id=$1";
                const result = yield connect.query(sql, [id]);
                connect.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Can't get user with id ${id} : ${err}`);
            }
        });
    }
    // Get Specified user
    create(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connect = yield database_1.Client.connect();
                const sql = "INSERT INTO users (name,password,age) VALUES ($1,$2,$3)";
                const hashPass = bcrypt_1.default.hashSync(user.password + process.env.BCRYPT_PASSWORD, parseInt(process.env.SALT_ROUNDS));
                const result = yield connect.query(sql, [user.name, hashPass, user.age]);
                connect.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Can't create user with : ${err}`);
            }
        });
    }
    // Authenticate 
    authenticate(name, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const connect = yield database_1.Client.connect();
            const sql = "SELECT password FROM users WHERE name = $1";
            const result = yield connect.query(sql, [name]);
            if (result.rows.length) {
                const user = result.rows[0];
                if (bcrypt_1.default.compareSync(password + process.env.BCRYPT_PASSWORD, user.password)) {
                    return user;
                }
            }
            return null;
        });
    }
    // Update Specified user
    update(id, user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connect = yield database_1.Client.connect();
                const sql = "UPDATE products SET name = $1,password = $2,age = $3 WHERE id = $4";
                const hashPass = bcrypt_1.default.hashSync(user.password + process.env.BCRYPT_PASSWORD, parseInt(process.env.SALT_ROUNDS));
                const result = yield connect.query(sql, [user.name, hashPass, user.age, id]);
                connect.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Can't update user with : ${err}`);
            }
        });
    }
    // Delete user
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connect = yield database_1.Client.connect();
                const sql = "DELETE FROM users WHERE id = $1";
                const result = yield connect.query(sql, [id]);
                connect.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Can't Delete user with : ${err}`);
            }
        });
    }
}
exports.userStorage = userStorage;
