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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const controller_1 = require("./useCase/useCaseFindByUser/controller");
const controller_2 = require("./useCase/useCaseFindByUsers/controller");
const controller_3 = require("./useCase/useCaseCreateUser/controller");
const controller_4 = require("./useCase/useCaseUpdateUser/controller");
const controller_5 = require("./useCase/useCaseDeleteUser/controller");
const controller_6 = require("./useCase/useCaseAuth/controller");
const controller_7 = require("./useCase/useCaseLogin/controller");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Servidor em pé na porta ${port}`));
app.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, controller_2.findByUsersController)(req, res);
}));
app.post("/find-by-user", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, controller_1.findByUserController)(req, res);
}));
app.post("/create-user", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, controller_3.createUserController)(req, res);
}));
app.put("/update-user", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, controller_4.updateUserController)(req, res);
}));
app.delete("/delete-user", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, controller_5.deleteUserController)(req, res);
}));
app.post("/auth", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, controller_6.Auth)(req, res);
}));
app.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, controller_7.login)(req, res);
}));
