"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.select = exports.operate = void 0;
async function operate(options, context) {
    const { entity, operation, params } = options;
    return context.rowStore.operate(entity, operation, context, params);
}
exports.operate = operate;
async function select(options, context) {
    const { entity, selection, params } = options;
    return context.rowStore.select(entity, selection, context, params);
}
exports.select = select;
