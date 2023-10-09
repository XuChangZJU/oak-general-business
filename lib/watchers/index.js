"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const token_1 = tslib_1.__importDefault(require("./token"));
const extraFile_1 = tslib_1.__importDefault(require("./extraFile"));
exports.default = [...token_1.default, ...extraFile_1.default];
