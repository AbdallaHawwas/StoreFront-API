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
const order_1 = require("../models/order");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const orderModel = new order_1.orderStore();
const orderRoutes = (app) => {
    app.get('/orders', index);
    app.get('/orders/:id', show);
    app.post('/orders', create);
    app.put('/orders/:id', update);
    app.delete('/orders/:id', deleteorder);
};
// Get All orders
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield orderModel.index();
    res.json(order);
});
// Get Speciefied order
const show = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield orderModel.show(req.body.id);
    res.json(order);
});
// Add New order
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authorizationHeader = req.headers.authorization;
        const token = authorizationHeader.split(' ')[1];
        jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET);
    }
    catch (err) {
        res.status(401);
        res.json('Access denied, invalid token');
        return;
    }
    try {
        const orders = {
            productId: req.body.productId,
            userId: req.body.userId
        };
        const order = yield orderModel.create(orders);
        res.json(order);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
// Add New order
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orders = {
        productId: req.body.productId,
        userId: req.body.userId
    };
    const order = yield orderModel.update(req.body.id, orders);
    res.json(order);
});
// Delete order
const deleteorder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authorizationHeader = req.headers.authorization;
        const token = authorizationHeader.split(' ')[1];
        jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET);
    }
    catch (err) {
        res.status(401);
        res.json('Access denied, invalid token');
        return;
    }
    try {
        const order = yield orderModel.delete(req.body.id);
        res.json(order);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
exports.default = orderRoutes;
