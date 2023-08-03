"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var uuid_1 = require("oak-domain/lib/utils/uuid");
var string_1 = require("oak-domain/lib/utils/string");
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
                var _a, entity, entityId, relation, userRelation, data;
                var _b;
                return tslib_1.__generator(this, function (_c) {
                    switch (_c.label) {
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
                            userRelation = "user".concat((0, string_1.firstLetterUpperCase)(entity));
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
                                        id: {
                                            $in: {
                                                entity: userRelation,
                                                data: {
                                                    userId: 1,
                                                },
                                                filter: (_b = {
                                                        relation: relation
                                                    },
                                                    _b["".concat(entity, "Id")] = entityId,
                                                    _b),
                                            },
                                        },
                                    },
                                })];
                        case 1:
                            data = (_c.sent()).data;
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
            var _a, _b;
            var _c = this.props, entityId = _c.entityId, entity = _c.entity, redirectTo = _c.redirectTo, relation = _c.relation, multiple = _c.multiple, nameRequired = _c.nameRequired, nameLabel = _c.nameLabel;
            var _d = this.state, period = _d.period, userId = _d.userId, searchValue = _d.searchValue;
            var nickname = searchValue;
            var time = period * 24 * 60 * 60 * 1000;
            if (nameRequired) {
                if (!userId && !searchValue) {
                    this.setMessage({
                        type: 'error',
                        content: "\u8BF7\u8F93\u5165".concat(nameLabel || '名称'),
                    });
                    return;
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
                return;
            }
            var userRelation = "user".concat((0, string_1.firstLetterUpperCase)(entity));
            var userRelationRelativePath = "".concat(userRelation, "$user");
            if (userId) {
                this.update({
                    userId: userId,
                });
            }
            else {
                this.update({
                    user: {
                        id: (0, uuid_1.generateNewId)(),
                        action: 'create',
                        data: (_a = {
                                id: (0, uuid_1.generateNewId)(),
                                nickname: nickname
                            },
                            _a["".concat(userRelationRelativePath)] = [
                                {
                                    id: (0, uuid_1.generateNewId)(),
                                    action: 'create',
                                    data: (_b = {
                                            id: (0, uuid_1.generateNewId)(),
                                            relation: relation
                                        },
                                        _b["".concat(entity, "Id")] = entityId,
                                        _b),
                                },
                            ],
                            _a),
                    },
                });
            }
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
            var id = this.getId();
            this.execute();
            this.setState({
                parasiteId: id,
            });
        },
    },
});
