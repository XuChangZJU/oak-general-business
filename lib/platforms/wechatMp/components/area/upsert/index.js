"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// index.ts
// 获取应用实例
const polyfill_1 = require("../../../../../typings/polyfill");
(0, polyfill_1.OakComponent)({
    entity: 'area',
    formData: ([area]) => ({
        name: area?.name,
    }),
}, {});
