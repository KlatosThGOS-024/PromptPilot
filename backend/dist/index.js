"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app_1 = __importDefault(require("./app"));
const dotenv_1 = __importDefault(require("dotenv"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const db_1 = __importDefault(require("./db/db"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config({
    path: "./.env",
});
/////////////////////////////////////
const port = process.env.PORT;
const app = (0, express_1.default)();
/////////////////////////////////////
app.use((0, cors_1.default)({
    origin: "*",
    credentials: true,
}));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.urlencoded());
app.use(app_1.default);
/////////////////////////////////////
/////////////////////////////////////
(0, db_1.default)().then((response) => {
    console.log(response);
    app.listen(port, () => {
        console.log(`Server has been started on port ${port}`);
    });
});
