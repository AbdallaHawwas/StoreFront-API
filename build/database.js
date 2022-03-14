"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const pg_1 = require("pg");
dotenv_1.default.config();
exports.Client = new pg_1.Pool({
    user: process.env.ENV === 'test' ? process.env.PG_USER_TEST : process.env.PG_USER,
    password: process.env.PG_PASS,
    host: process.env.PG_HOST,
    port: parseInt(process.env.PG_PORT),
    database: process.env.ENV === 'test' ? process.env.PG_DB_TEST : process.env.PG_DB
});
