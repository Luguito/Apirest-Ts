"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const User_1 = __importDefault(require("../models/User"));
class ApiUser {
    constructor() {
        this.router = express_1.Router();
        this.routes();
    }
    getUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield User_1.default.find({ state: true });
                res.status(200).json(user);
            }
            catch (error) {
                res.json(error);
            }
        });
    }
    createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let body = req.body;
            const newUser = yield new User_1.default({
                name: body.name,
                lastname: body.lastname,
                email: body.email,
                password: body.password,
            });
            yield newUser.save();
            res.status(200).json(newUser);
        });
    }
    deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let email = req.params.email;
            let newState = req.body.state;
            try {
                const deleteUser = yield User_1.default.findOneAndUpdate({ email: email }, { state: newState }, { new: true });
                res.status(200).json(deleteUser);
            }
            catch (e) {
                res.json(e);
            }
        });
    }
    routes() {
        this.router.get('/api/user', this.getUser);
        this.router.post('/api/user', this.createUser);
        this.router.put('/api/user/:email', this.deleteUser);
    }
}
const apiUser = new ApiUser();
exports.default = apiUser.router;
