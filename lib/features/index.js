"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initialize = void 0;
const token_1 = require("./token");
const extraFile_1 = require("./extraFile");
function initialize() {
    const token = new token_1.Token();
    const extraFile = new extraFile_1.ExtraFile();
    return {
        token,
        extraFile,
    };
}
exports.initialize = initialize;
