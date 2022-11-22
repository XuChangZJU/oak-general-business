"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateConfig = void 0;
var tslib_1 = require("tslib");
var uuid_1 = require("oak-domain/lib/utils/uuid");
function updateConfig(params, context) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var entity, entityId, config;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    entity = params.entity, entityId = params.entityId, config = params.config;
                    return [4 /*yield*/, context.operate(entity, {
                            id: (0, uuid_1.generateNewId)(),
                            action: 'update',
                            data: {
                                config: config,
                            },
                            filter: {
                                id: entityId,
                            }
                        }, {})];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.updateConfig = updateConfig;
