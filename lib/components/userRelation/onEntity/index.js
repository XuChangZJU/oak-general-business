"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var string_1 = require("oak-domain/lib/utils/string");
exports.default = OakComponent({
    isList: true,
    formData: function (_a) {
        var _this = this;
        var data = _a.data;
        var _b = this.props, nameProperty = _b.nameProperty, oakEntity = _b.oakEntity;
        var entityStr = (0, string_1.firstLetterUpperCase)(oakEntity);
        var rows = data === null || data === void 0 ? void 0 : data.map(function (ele) {
            var _a = ele, id = _a.id, _b = nameProperty, name = _a[_b], _c = "user".concat(entityStr, "$").concat(oakEntity), userEntity = _a[_c];
            var relations = userEntity === null || userEntity === void 0 ? void 0 : userEntity.map(function (ele) { return ele.relation; });
            var hasRelation = _this.props.relations.map(function (ele2) {
                return relations.includes(ele2);
            });
            return {
                id: id,
                name: name,
                hasRelation: hasRelation,
            };
        });
        return {
            rows: rows,
        };
    },
    properties: {
        nameProperty: '',
        user: {},
        relations: [],
        oakEntity: '',
    },
    methods: {
        onChange: function (input) {
            var _a = this.resolveInput(input, ['checked']), dataset = _a.dataset, checked = _a.checked;
            var _b = dataset, entityId = _b.id, relation = _b.relation, index = _b.index;
            var _c = this.props, oakEntity = _c.oakEntity, user = _c.user;
            var entityStr = (0, string_1.firstLetterUpperCase)(oakEntity);
            // todo 需要修改为最新写法
            // this.toggleNode(
            //     {
            //         relation,
            //         userId: user.id,
            //     },
            //     checked,
            //     `${index}.user${entityStr}$${oakEntity}`
            // );
        },
        confirm: function () {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.execute()];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, this.navigateBack()];
                        case 2:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        },
    },
});
