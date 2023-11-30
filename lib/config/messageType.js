"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registMessageType = void 0;
const lodash_1 = require("oak-domain/lib/utils/lodash");
let messageTypes = [];
exports.default = messageTypes;
function registMessageType(messageType) {
    let messageTypes2 = messageTypes.concat(messageType);
    messageTypes = (0, lodash_1.uniq)(messageTypes2);
}
exports.registMessageType = registMessageType;
