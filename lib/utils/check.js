"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAttributesScope = exports.checkAttributesNotNull = void 0;
const types_1 = require("oak-domain/lib/types");
function checkAttributesNotNull(data, attributes, allowEmpty) {
    const attrs = attributes.filter((attr) => {
        if (data[attr] === null || data[attr] === '') {
            return true;
        }
        if (!allowEmpty && !data.hasOwnProperty(attr)) {
            return true;
        }
    });
    if (attrs.length > 0) {
        throw new types_1.OakInputIllegalException(attrs, '属性不能为空');
    }
}
exports.checkAttributesNotNull = checkAttributesNotNull;
;
function checkAttributesScope(data, attributes) {
    const attrs = attributes.filter(attr => !data.hasOwnProperty(attr));
    if (attrs.length > 0) {
        throw new types_1.OakInputIllegalException(attrs, '多余的属性');
    }
}
exports.checkAttributesScope = checkAttributesScope;
