"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSessionMessage = void 0;
async function createSessionMessage(params, context) {
    const { data, type, entity, entityId } = params;
    // const [application] = await context.select('application', {
    //     data: {
    //         id: 1,
    //         systemId: 1,
    //         type: 1,
    //     },
    //     filter: {
    //         systemId,
    //         type: 'web'
    //     }
    // }, {});
}
exports.createSessionMessage = createSessionMessage;
