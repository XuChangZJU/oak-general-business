"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const address_1 = __importDefault(require("./address"));
const token_1 = __importDefault(require("./token"));
const user_1 = __importDefault(require("./user"));
exports.default = [...address_1.default, ...token_1.default, ...user_1.default];
