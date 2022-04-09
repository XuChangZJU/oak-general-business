"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.area = void 0;
const area_json_1 = __importDefault(require("./area.json"));
const area_debug_json_1 = __importDefault(require("./area-debug.json"));
const area = process.env.NODE_ENV === 'production' ? area_json_1.default : area_debug_json_1.default;
exports.area = area;
