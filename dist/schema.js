"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SUser = void 0;
const mongoose_1 = require("mongoose");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const data_base_url = `${process.env.DATA_BASE_URL}`;
const connect = (0, mongoose_1.createConnection)(data_base_url);
const SchemaUser = new mongoose_1.Schema({
    _id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    url_graphcms: {
        type: String,
        required: true
    }
});
exports.SUser = connect.model("users", SchemaUser);
