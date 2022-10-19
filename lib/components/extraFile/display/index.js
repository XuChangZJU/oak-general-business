"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var mockId_1 = require("oak-frontend-base/lib/utils/mockId");
var extraFile_1 = require("../../../utils/extraFile");
OakComponent({
    entity: 'extraFile',
    isList: false,
    formData: function (_a) {
        var extraFile = _a.data, features = _a.features;
        return tslib_1.__awaiter(void 0, void 0, void 0, function () {
            var application, isTmp;
            var _b;
            return tslib_1.__generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, features.application.getApplication()];
                    case 1:
                        application = _c.sent();
                        isTmp = (extraFile === null || extraFile === void 0 ? void 0 : extraFile.id) && (0, mockId_1.isMockId)(extraFile.id);
                        return [2 /*return*/, {
                                src: extraFile && (0, extraFile_1.composeFileUrl)(extraFile, (_b = application === null || application === void 0 ? void 0 : application.system) === null || _b === void 0 ? void 0 : _b.config),
                                isTmp: isTmp,
                            }];
                }
            });
        });
    },
    properties: {
        // 图片显示模式
        mode: {
            type: String,
            value: 'aspectFit',
        },
    },
});
