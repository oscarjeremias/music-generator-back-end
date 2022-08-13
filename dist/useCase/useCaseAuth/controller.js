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
exports.Auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const crypto_1 = __importDefault(require("crypto"));
const findByUserDB_1 = require("../../repositories/findByUserDB");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const api_key = `${process.env.API_KEY}`;
const jwt_key = `${process.env.JWT_KEY}`;
const crypto_key = `${process.env.CRYPTO_KEY}`;
function Auth(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, password, apiKey } = req.body;
        if (apiKey !== api_key) {
            res.status(400).send("Api key invalida");
        }
        else {
            const userExits = yield (0, findByUserDB_1.findByUserDB)(email);
            const passwordCrypto = crypto_1.default.createHmac('sha256', crypto_key)
                .update(password)
                .digest("hex");
            if ((userExits === null || userExits === void 0 ? void 0 : userExits.password) === passwordCrypto) {
                jsonwebtoken_1.default.sign({
                    exp: Math.floor(Date.now() / 1000) + (60 * 60 * 60),
                    email
                }, jwt_key, { algorithm: "HS256" }, (error, token) => {
                    if (error)
                        throw error;
                    return res.status(200).json({ token });
                });
            }
            else {
                return "password ou email invalido";
            }
        }
    });
}
exports.Auth = Auth;
