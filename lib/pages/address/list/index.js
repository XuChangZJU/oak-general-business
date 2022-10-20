"use strict";
// index.ts
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
exports.default = OakComponent({
    entity: 'address',
    projection: {
        id: 1,
        name: 1,
        phone: 1,
        detail: 1,
        area: {
            id: 1,
            name: 1,
            parent: {
                id: 1,
                name: 1,
                parent: {
                    id: 1,
                    name: 1,
                },
            },
        },
    },
    isList: true,
    formData: function (_a) {
        var data = _a.data;
        return tslib_1.__awaiter(void 0, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_b) {
                return [2 /*return*/, ({
                        addresses: data.map(function (address) {
                            var _a, _b, _c, _d, _e, _f, _g;
                            return ({
                                name: address === null || address === void 0 ? void 0 : address.name,
                                phone: address === null || address === void 0 ? void 0 : address.phone,
                                districtName: (_a = address === null || address === void 0 ? void 0 : address.area) === null || _a === void 0 ? void 0 : _a.name,
                                areaText: (address === null || address === void 0 ? void 0 : address.area) &&
                                    "".concat((_d = (_c = (_b = address === null || address === void 0 ? void 0 : address.area) === null || _b === void 0 ? void 0 : _b.parent) === null || _c === void 0 ? void 0 : _c.parent) === null || _d === void 0 ? void 0 : _d.name).concat((_f = (_e = address === null || address === void 0 ? void 0 : address.area) === null || _e === void 0 ? void 0 : _e.parent) === null || _f === void 0 ? void 0 : _f.name).concat((_g = address === null || address === void 0 ? void 0 : address.area) === null || _g === void 0 ? void 0 : _g.name),
                                detail: address === null || address === void 0 ? void 0 : address.detail,
                            });
                        }),
                    })];
            });
        });
    },
    methods: {
        goNewAddress: function () {
            this.navigateTo({
                url: '/address/upsert',
            });
        },
    },
});
