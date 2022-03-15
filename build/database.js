"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.Client = void 0;
var dotenv_1 = __importDefault(require("dotenv"));
var pg_1 = require("pg");
dotenv_1["default"].config();
exports.Client = new pg_1.Pool({
    user: process.env.ENV === 'test' ? process.env.PG_USER_TEST : process.env.PG_USER,
    password: process.env.PG_PASS,
    host: process.env.PG_HOST,
    port: parseInt(process.env.PG_PORT),
    database: process.env.ENV === 'test' ? process.env.PG_DB_TEST : process.env.PG_DB
});
