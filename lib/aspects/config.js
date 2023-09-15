"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateApplicationConfig = exports.updateConfig = void 0;
const uuid_1 = require("oak-domain/lib/utils/uuid");
async function updateConfig(params, context) {
    const { entity, entityId, config } = params;
    await context.operate(entity, {
        id: (0, uuid_1.generateNewId)(),
        action: 'update',
        data: {
            config,
        },
        filter: {
            id: entityId,
        }
    }, {});
}
exports.updateConfig = updateConfig;
async function updateApplicationConfig(params, context) {
    const { entity, entityId, config } = params;
    await context.operate(entity, {
        id: (0, uuid_1.generateNewId)(),
        action: 'update',
        data: {
            config,
        },
        filter: {
            id: entityId,
        },
    }, {});
}
exports.updateApplicationConfig = updateApplicationConfig;
