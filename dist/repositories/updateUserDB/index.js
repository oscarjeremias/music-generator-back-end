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
exports.updateUserDB = void 0;
const mongoose_1 = require("mongoose");
const schema_1 = require("../../schema");
const findByUserDB_1 = require("../findByUserDB");
const crypto_1 = __importDefault(require("crypto"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const data_base_url = `${process.env.DATA_BASE_URL}`;
const crypto_key = `${process.env.CRYPTO_KEY}`;
function updateUserDB(prop) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield (0, mongoose_1.connect)(`${data_base_url}`);
            //update password
            if (prop.password) {
                const passwordCrypto = crypto_1.default.createHmac('sha256', crypto_key)
                    .update(prop.password)
                    .digest("hex");
                const userUpdate = yield schema_1.SUser.updateOne({ email: prop.email }, { password: passwordCrypto });
                return !userUpdate && "there is no user with these emails";
                // update email
            }
            if (prop.emailExits) {
                const userExits = yield (0, findByUserDB_1.findByUserDB)(prop.emailExits);
                if (!userExits) {
                    return "there is no user with these emails";
                }
                else if ((userExits === null || userExits === void 0 ? void 0 : userExits.email) === prop.email) {
                    return "there is already a user with this email";
                }
                else {
                    yield schema_1.SUser.updateOne({ email: prop.emailExits }, { email: prop.email });
                }
                // udape outras props
            }
            else {
                const keyObject = Object.keys(prop)[1];
                const userUpdate = yield schema_1.SUser.updateOne({ email: prop.email }, { [keyObject]: prop[keyObject] });
                return !userUpdate && "there is no user with these emails";
            }
        }
        catch (error) {
            console.log(error);
        }
    });
}
exports.updateUserDB = updateUserDB;
