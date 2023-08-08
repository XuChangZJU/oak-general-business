"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var uuid_1 = require("oak-domain/lib/utils/uuid");
exports.default = OakComponent({
    entity: 'parasite',
    isList: false,
    data: {
        period: 7,
        parasiteId: '',
        options: [],
        searchValue: '',
    },
    properties: {
        entity: '',
        entityId: '',
        relation: '',
        redirectTo: undefined,
        multiple: false,
        nameLabel: '',
        nameRequired: true
    },
    lifetimes: {
        ready: function () { },
    },
    formData: function (_a) {
        var data = _a.data;
        return {
            userId: data === null || data === void 0 ? void 0 : data.userId,
            user: data === null || data === void 0 ? void 0 : data.user,
        };
    },
    methods: {
        onSearch: function (value) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var _this = this;
                return tslib_1.__generator(this, function (_a) {
                    if (this.timer) {
                        clearTimeout(this.timer);
                    }
                    this.timer = setTimeout(function () {
                        _this.search(value);
                    }, 500);
                    return [2 /*return*/];
                });
            });
        },
        search: function (value) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var _a, entity, entityId, relation, data;
                return tslib_1.__generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            while (value.indexOf("'") !== -1) {
                                value = value.replace("'", '');
                            }
                            if (!value) {
                                this.setState({
                                    options: []
                                });
                                return [2 /*return*/];
                            }
                            _a = this.props, entity = _a.entity, entityId = _a.entityId, relation = _a.relation;
                            return [4 /*yield*/, this.features.cache.refresh('user', {
                                    data: {
                                        id: 1,
                                        userState: 1,
                                        nickname: 1,
                                    },
                                    filter: {
                                        nickname: {
                                            $startsWith: value,
                                        },
                                        userState: 'shadow',
                                        userRelation$user: {
                                            relation: {
                                                name: relation,
                                            },
                                            entityId: entityId,
                                        }
                                    },
                                })];
                        case 1:
                            data = (_b.sent()).data;
                            this.setState({
                                options: data.map(function (ele) { return ({
                                    id: ele.id,
                                    value: ele.nickname,
                                }); }),
                            });
                            return [2 /*return*/];
                    }
                });
            });
        },
        onSelect: function (value) {
            var _a;
            var option = (_a = this.state.options) === null || _a === void 0 ? void 0 : _a.find(function (ele) { return ele.value === value; });
            if (option) {
                this.setState({
                    userId: option.id,
                });
            }
            else {
                this.setState({
                    userId: '',
                });
            }
        },
        setSearchValue: function (value) {
            this.setState({
                searchValue: value,
            });
        },
        setPeriod: function (period) {
            this.setState({
                period: period,
            });
        },
        setInit: function () {
            this.setState({
                parasiteId: '',
                userId: '',
                searchValue: '',
                period: 7,
            });
        },
        confirm: function () {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var _a, entityId, entity, redirectTo, relation, multiple, nameRequired, nameLabel, _b, period, userId, searchValue, nickname, time, userRelation, userRelationRelativePath, relationId, id;
                var _c;
                return tslib_1.__generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            _a = this.props, entityId = _a.entityId, entity = _a.entity, redirectTo = _a.redirectTo, relation = _a.relation, multiple = _a.multiple, nameRequired = _a.nameRequired, nameLabel = _a.nameLabel;
                            _b = this.state, period = _b.period, userId = _b.userId, searchValue = _b.searchValue;
                            nickname = searchValue;
                            time = period * 24 * 60 * 60 * 1000;
                            if (nameRequired) {
                                if (!userId && !searchValue) {
                                    this.setMessage({
                                        type: 'error',
                                        content: "\u8BF7\u8F93\u5165".concat(nameLabel || '名称'),
                                    });
                                    return [2 /*return*/];
                                }
                            }
                            else {
                                nickname = searchValue || 'shadow_user';
                            }
                            if (!period) {
                                this.setMessage({
                                    type: 'error',
                                    content: '请选择',
                                });
                                return [2 /*return*/];
                            }
                            userRelation = "userRelation";
                            userRelationRelativePath = "".concat(userRelation, "$user");
                            if (!userId) return [3 /*break*/, 1];
                            this.update({
                                userId: userId,
                            });
                            return [3 /*break*/, 3];
                        case 1: return [4 /*yield*/, this.features.relationAuth.getRelationIdByName(entity, relation)];
                        case 2:
                            relationId = _d.sent();
                            this.update({
                                user: {
                                    id: (0, uuid_1.generateNewId)(),
                                    action: 'create',
                                    data: (_c = {
                                            id: (0, uuid_1.generateNewId)(),
                                            nickname: nickname
                                        },
                                        _c["".concat(userRelationRelativePath)] = [
                                            {
                                                id: (0, uuid_1.generateNewId)(),
                                                action: 'create',
                                                data: {
                                                    id: (0, uuid_1.generateNewId)(),
                                                    entityId: entityId,
                                                    entity: entity,
                                                    relationId: relationId
                                                },
                                            },
                                        ],
                                        _c),
                                },
                            });
                            _d.label = 3;
                        case 3:
                            this.update({
                                entityId: entityId,
                                entity: entity,
                                expiresAt: Date.now() + time,
                                expired: false,
                                redirectTo: redirectTo,
                                multiple: multiple,
                                showTip: false,
                                tokenLifeLength: time,
                            });
                            id = this.getId();
                            this.execute();
                            this.setState({
                                parasiteId: id,
                            });
                            return [2 /*return*/];
                    }
                });
            });
        },
    },
});
