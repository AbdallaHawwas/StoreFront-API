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
const product_1 = require("../models/product");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const productModel = new product_1.productStore();
const productRoutes = (app) => {
    app.get('/products', index);
    app.get('/products/:id', show);
    app.post('/products', create);
    app.put('/products/:id', update);
    app.delete('/products/:id', deleteproduct);
};
// Get All products
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield productModel.index();
    res.json(product);
});
// Get Speciefied product
const show = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield productModel.show(req.body.id);
    res.json(product);
});
// Add New product
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
        const products = {
            name: req.body.name,
            price: req.body.price
        };
        const product = yield productModel.create(products);
        res.json(product);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
// Add New product
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const products = {
        name: req.body.name,
        price: req.body.price
    };
    const product = yield productModel.update(req.body.id, products);
    res.json(product);
});
// Delete product
const deleteproduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const product = yield productModel.delete(req.body.id);
        res.json(product);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
exports.default = productRoutes;
