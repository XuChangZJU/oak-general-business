"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initialize = void 0;
const token_1 = require("./token");
function initialize() {
    const token = new token_1.Token();
    return {
        token,
    };
}
exports.initialize = initialize;
