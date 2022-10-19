"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
exports.default = OakPage({
    entity: 'userEntityGrant',
    projection: {
        id: 1,
        relation: 1,
    },
    isList: false,
    formData: function (_a) {
        var userEntityGrant = _a.data;
        return tslib_1.__awaiter(void 0, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_b) {
                return [2 /*return*/, {
                        relation: userEntityGrant === null || userEntityGrant === void 0 ? void 0 : userEntityGrant.relation,
                    }];
            });
        });
    },
    methods: {
        handleConfirm: function () {
            this.execute('confirm');
        },
    },
});
