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
exports.createUserDB = void 0;
const mongoose_1 = require("mongoose");
const schema_1 = require("../../schema");
const findByUserDB_1 = require("../findByUserDB");
const crypto_1 = __importDefault(require("crypto"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const data_base_url = `${process.env.DATA_BASE_URL}`;
const crypto_key = `${process.env.CRYPTO_KEY}`;
function createUserDB({ _id, name, email, password, url_graphcms }) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield (0, mongoose_1.connect)(`${data_base_url}`);
            const userExist = yield (0, findByUserDB_1.findByUserDB)(email);
            if (userExist) {
                return "there is already a user with this email!";
            }
            else {
                const passwordCrypto = crypto_1.default.createHmac('sha256', crypto_key)
                    .update(password)
                    .digest("hex");
                const user = new schema_1.SUser({
                    _id,
                    name,
                    email,
                    password: passwordCrypto,
                    url_graphcms
                });
                yield user.save();
                return "create user sucess!";
            }
        }
        catch (error) {
            console.log(error);
        }
    });
}
exports.createUserDB = createUserDB;
