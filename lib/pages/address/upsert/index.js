"use strict";
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
    isList: false,
    formData: function (_a) {
        var _b, _c, _d, _e, _f, _g, _h;
        var address = _a.data;
        return {
            name: address === null || address === void 0 ? void 0 : address.name,
            phone: address === null || address === void 0 ? void 0 : address.phone,
            // areaName: `${address?.area?.parent.parent.name}${address?.area?.parent.name}${address?.area?.name}`,
            // provinceName: address?.area?.parent.parent.name,
            districtName: (_b = address === null || address === void 0 ? void 0 : address.area) === null || _b === void 0 ? void 0 : _b.name,
            area: address === null || address === void 0 ? void 0 : address.area,
            areaText: (address === null || address === void 0 ? void 0 : address.area) &&
                "".concat((_e = (_d = (_c = address === null || address === void 0 ? void 0 : address.area) === null || _c === void 0 ? void 0 : _c.parent) === null || _d === void 0 ? void 0 : _d.parent) === null || _e === void 0 ? void 0 : _e.name).concat((_g = (_f = address === null || address === void 0 ? void 0 : address.area) === null || _f === void 0 ? void 0 : _f.parent) === null || _g === void 0 ? void 0 : _g.name).concat((_h = address === null || address === void 0 ? void 0 : address.area) === null || _h === void 0 ? void 0 : _h.name),
            detail: address === null || address === void 0 ? void 0 : address.detail,
        };
    },
    methods: {
        setValue: function (input) {
            var _a;
            var _b = this.resolveInput(input), dataset = _b.dataset, value = _b.value;
            var attr = dataset.attr;
            this.update((_a = {},
                _a[attr] = value,
                _a));
        },
        callAreaPicker: function () {
            var _this = this;
            var event = 'address:upsert:selectArea';
            this.subEvent(event, function (_a) {
                var id = _a.id;
                _this.update({
                    areaId: id,
                });
                _this.navigateBack();
            });
            this.navigateTo({
                url: '/pickers/area',
            }, {
                itemSelectedEvent: event,
                depth: 3,
            });
        },
        confirm: function () {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.execute()];
                        case 1:
                            _a.sent();
                            this.navigateBack();
                            return [2 /*return*/];
                    }
                });
            });
        },
        reset: function () {
            this.clean();
        },
    },
});
