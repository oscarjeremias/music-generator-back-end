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
exports.createUserController = void 0;
const createUserDB_1 = require("../../repositories/createUserDB");
const uuid_1 = require("uuid");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const api_key = `${process.env.API_KEY}`;
function createUserController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { name, email, password, url_graphcms, apiKey } = req.body;
        if (apiKey !== api_key) {
            return res.status(400).send("Api key invalida!");
        }
        else {
            const _id = (0, uuid_1.v4)();
            const sms = yield (0, createUserDB_1.createUserDB)({ _id, name, email, password, url_graphcms });
            return res.status(201).send(sms);
        }
    });
}
exports.createUserController = createUserController;
