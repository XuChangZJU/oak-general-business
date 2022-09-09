"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var string_1 = require("oak-domain/lib/utils/string");
exports.default = OakPage({
    entity: 'user',
    projection: function (_a) {
        var props = _a.props;
        return tslib_1.__awaiter(void 0, void 0, void 0, function () {
            var entity, entityId, entityStr;
            var _b, _c;
            return tslib_1.__generator(this, function (_d) {
                entity = props.entity, entityId = props.entityId;
                entityStr = (0, string_1.firstLetterUpperCase)(entity);
                return [2 /*return*/, (_b = {
                            id: 1,
                            name: 1,
                            password: 1,
                            mobile$user: {
                                $entity: 'mobile',
                                data: {
                                    id: 1,
                                    userId: 1,
                                    mobile: 1,
                                },
                            }
                        },
                        _b["user".concat(entityStr, "$user")] = {
                            $entity: "user".concat(entityStr),
                            data: (_c = {
                                    id: 1,
                                    userId: 1
                                },
                                _c["".concat(entity, "Id")] = 1,
                                _c.relation = 1,
                                _c),
                        },
                        _b)];
            });
        });
    },
    isList: false,
    formData: function (_a) {
        var user = _a.data, props = _a.props;
        return tslib_1.__awaiter(void 0, void 0, void 0, function () {
            var entity, relations, _b, id, name, mobile$user, password, mobile;
            var _c;
            return tslib_1.__generator(this, function (_d) {
                entity = props.entity, relations = props.relations;
                _b = user || {}, id = _b.id, name = _b.name, mobile$user = _b.mobile$user, password = _b.password;
                mobile = mobile$user && ((_c = mobile$user[0]) === null || _c === void 0 ? void 0 : _c.mobile);
                return [2 /*return*/, {
                        id: id,
                        name: name,
                        mobile: mobile,
                        password: password,
                    }];
            });
        });
    },
    properties: {
        entity: String,
        entityId: String,
        relations: Array,
    },
    data: {
        mobile: '',
        relationArr: [],
    },
    methods: {
        setValue: function (input) {
            var _a = this.resolveInput(input), dataset = _a.dataset, value = _a.value, Context = _a.Context;
            this.setUpdateData(dataset.attr, value);
        },
        onMobileChange: function (event) {
            var value = event.detail.value;
            this.setState({
                mobile: value,
            });
            this.setUpdateData('mobile$user.0.mobile', value);
        },
        onCheckBoxChange: function (event) {
            var value = event.detail.value;
            this.setRelationValue(value);
        },
        setRelationValue: function (value) {
            var _this = this;
            var _a = this.props, entity = _a.entity, entityId = _a.entityId, relations = _a.relations;
            var entityStr = (0, string_1.firstLetterUpperCase)(entity);
            var relationArr = this.state.relationArr;
            //由于是根据index 进行删除, 所以将之前设置的node从头开始删除
            relationArr.forEach(function (ele, index) {
                _this.removeNode("user".concat(entityStr, "$user"), '0');
            });
            value.forEach(function (ele, index) {
                _this.setUpdateData("user".concat(entityStr, "$user.").concat(index, ".").concat(entity, "Id"), entityId);
                _this.setUpdateData("user".concat(entityStr, "$user.").concat(index, ".relation"), ele);
            });
            this.setState({
                relationArr: value,
            });
        },
        onConfirm: function () {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.execute('create')];
                        case 1:
                            _a.sent();
                            this.navigateBack();
                            return [2 /*return*/];
                    }
                });
            });
        },
    },
});
