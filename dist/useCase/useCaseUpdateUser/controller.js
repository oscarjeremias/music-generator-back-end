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
exports.updateUserController = void 0;
const updateUserDB_1 = require("../../repositories/updateUserDB");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const api_key = `${process.env.API_KEY}`;
function updateUserController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const data_user = req.body;
        if (data_user.apiKey !== api_key) {
            return res.status(400).send("Api key invalida");
        }
        else {
            const sms = yield (0, updateUserDB_1.updateUserDB)(data_user);
            return res.status(201).send(sms || "update user sucess");
        }
    });
}
exports.updateUserController = updateUserController;
