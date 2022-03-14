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
const user_1 = require("../models/user");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel = new user_1.userStorage();
const userRoutes = (app) => {
    app.get('/users', index);
    app.get('/users/:id', show);
    app.post('/users', create);
    app.put('/users/:id', update);
    app.delete('/users/:id', deleteuser);
};
// Get All users
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userModel.index();
    res.json(user);
});
// Get Speciefied user
const show = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userModel.show(req.body.id);
    res.json(user);
});
// Add New user
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = {
        name: req.body.name,
        password: req.body.password,
        age: req.body.age
    };
    try {
        const user = yield userModel.create(users);
        const token = jsonwebtoken_1.default.sign({ users: user }, process.env.TOKEN_SECRET);
        res.json(token);
    }
    catch (err) {
        res.status(400);
        res.json(`${err} : ${users}`);
    }
});
// Authenticate User
const authenticate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = {
        name: req.body.name,
        password: req.body.password
    };
    try {
        const user = yield userModel.authenticate(users.name, users.password);
        const token = jsonwebtoken_1.default.sign({ users: user }, process.env.TOKEN_SECRET);
        res.json(token);
    }
    catch (err) {
        res.status(401);
        res.json({ err });
    }
});
// Add New user
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = {
        id: parseInt(req.params.id),
        name: req.body.name,
        password: req.body.password,
        age: req.body.age
    };
    try {
        const authorizationHeader = req.headers.authorization;
        const token = authorizationHeader.split(' ')[1];
        jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET);
    }
    catch (err) {
        res.status(401);
        res.json(err);
        return;
    }
    try {
        const user = yield userModel.update(req.body.id, users);
        const token = jsonwebtoken_1.default.sign({ users: user }, process.env.TOKEN_SECRET);
        res.json(token);
    }
    catch (err) {
        res.status(400);
        res.json(err + users);
    }
});
// Delete user
const deleteuser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const user = yield userModel.delete(req.body.id);
        res.json(user);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
exports.default = userRoutes;
