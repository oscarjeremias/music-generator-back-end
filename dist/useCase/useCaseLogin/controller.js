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
exports.login = void 0;
const findByUserDB_1 = require("../../repositories/findByUserDB");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const api_key = `${process.env.API_KEY}`;
const jwt_key = `${process.env.JWT_KEY}`;
function login(req, res) {
    const { apiKey, token } = req.body;
    if (apiKey !== api_key) {
        return res.status(400).send("Api key invalida");
    }
    else {
        jsonwebtoken_1.default.verify(token, jwt_key, (error, decoded) => __awaiter(this, void 0, void 0, function* () {
            if (error)
                throw error;
            const user = yield (0, findByUserDB_1.findByUserDB)(decoded.email);
            return res.status(200).json(user);
        }));
    }
}
exports.login = login;
