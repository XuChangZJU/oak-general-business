"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateConfig = void 0;
var tslib_1 = require("tslib");
function updateConfig(params, context) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var rowStore, entity, entityId, config, _a, _b, _c;
        var _d;
        return tslib_1.__generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    rowStore = context.rowStore;
                    entity = params.entity, entityId = params.entityId, config = params.config;
                    _b = (_a = rowStore).operate;
                    _c = [entity];
                    _d = {};
                    return [4 /*yield*/, generateNewId()];
                case 1: return [4 /*yield*/, _b.apply(_a, _c.concat([(_d.id = _e.sent(),
                            _d.action = 'update',
                            _d.data = {
                                config: config,
                            },
                            _d.filter = {
                                id: entityId,
                            },
                            _d), context, {}]))];
                case 2:
                    _e.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.updateConfig = updateConfig;
