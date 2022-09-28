"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var string_1 = require("oak-domain/lib/utils/string");
var extraFile_1 = require("../../../utils/extraFile");
var react_1 = tslib_1.__importDefault(require("../../../utils/react"));
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
                            nickname: 1,
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
                        _b.extraFile$entity = {
                            $entity: 'extraFile',
                            data: {
                                id: 1,
                                tag1: 1,
                                origin: 1,
                                bucket: 1,
                                objectId: 1,
                                filename: 1,
                                extra1: 1,
                                type: 1,
                                entity: 1,
                                extension: 1,
                            },
                            filter: {
                                tag1: 'avatar',
                            },
                            indexFrom: 0,
                            count: 1,
                        },
                        _b)];
            });
        });
    },
    filters: [
        // 由调用者注入oakFilter
        {
            filter: function (_a) {
                var features = _a.features, props = _a.props, onLoadOptions = _a.onLoadOptions;
                return tslib_1.__awaiter(void 0, void 0, void 0, function () {
                    var entityId, entity, entityStr;
                    var _b;
                    return tslib_1.__generator(this, function (_c) {
                        entityId = props.entityId, entity = props.entity;
                        entityStr = (0, string_1.firstLetterUpperCase)(entity);
                        return [2 /*return*/, {
                                id: {
                                    $in: {
                                        entity: "user".concat(entityStr),
                                        data: {
                                            userId: 1,
                                        },
                                        filter: (_b = {},
                                            _b["".concat(entity, "Id")] = entityId,
                                            _b),
                                    },
                                },
                            }];
                    });
                });
            },
        },
    ],
    isList: true,
    formData: function (_a) {
        var _b;
        var users = _a.data, props = _a.props, features = _a.features;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var entity, entityId, entityStr, filter, pagination;
            return tslib_1.__generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        entity = props.entity, entityId = props.entityId;
                        entityStr = (0, string_1.firstLetterUpperCase)(entity);
                        return [4 /*yield*/, this.getFilterByName('name')];
                    case 1:
                        filter = _c.sent();
                        pagination = this.getPagination();
                        return [2 /*return*/, {
                                users: users === null || users === void 0 ? void 0 : users.map(function (ele) {
                                    var _a, _b;
                                    var _c = ele || {}, mobile$user = _c.mobile$user, extraFile$entity = _c.extraFile$entity;
                                    var mobile = mobile$user && ((_a = mobile$user[0]) === null || _a === void 0 ? void 0 : _a.mobile);
                                    var relations = (_b = ele["user".concat(entityStr, "$user")]) === null || _b === void 0 ? void 0 : _b.filter(function (rt) { return rt["".concat(entity, "Id")] === entityId; }).map(function (rt2) { return rt2.relation; });
                                    var avatar = extraFile$entity &&
                                        extraFile$entity[0] &&
                                        (0, extraFile_1.composeFileUrl)(extraFile$entity[0]);
                                    var user2 = Object.assign({}, ele, {
                                        mobile: mobile,
                                        avatar: avatar,
                                        relations: relations,
                                    });
                                    return user2;
                                }),
                                searchValue: (filter === null || filter === void 0 ? void 0 : filter.$or) &&
                                    ((_b = filter.$or[0]) === null || _b === void 0 ? void 0 : _b.name.$includes),
                                pagination: pagination,
                            }];
                }
            });
        });
    },
    properties: {
        entity: String,
        entityId: String,
        userIds: Array,
        relations: Array,
    },
    data: {
        show: false,
        searchValue: '',
        deleteIndex: '',
        editableRowKeys: [],
        btnItems: [
            {
                label: '二维码授权',
            },
            {
                label: '添加授权',
            },
        ],
        visible: false,
    },
    lifetimes: {
        created: function () {
            if (process.env.OAK_PLATFORM === 'web') {
                this.tableRef = react_1.default.createRef();
                this.editMap = {};
                this.currentSaveId = '';
            }
        },
    },
    methods: {
        onAdd: function () {
            if (process.env.OAK_PLATFORM === 'web') {
                this.goUpsert();
            }
            else {
                this.setState({
                    visible: true,
                });
            }
        },
        goUpsert: function () {
            var _a = this.props, entity = _a.entity, entityId = _a.entityId, relations = _a.relations;
            this.navigateTo({
                url: '/userRelation/upsert',
                entity: entity,
                entityId: entityId,
                relations: relations,
            }, {
                relations: relations,
            });
        },
        goUserEntityGrantWithGrant: function () {
            var _a = this.props, entity = _a.entity, entityId = _a.entityId, relations = _a.relations;
            this.navigateTo({
                url: '/userEntityGrant/grant',
                entity: entity,
                entityId: entityId,
            }, {
                relations: relations,
            });
        },
        onActionSelect: function (e) {
            var _a = e.detail, index = _a.index, selected = _a.selected;
            switch (index) {
                case 0: {
                    this.goUserEntityGrantWithGrant();
                }
                case 1: {
                    this.goUpsert();
                }
            }
        },
        onActionCancel: function () {
            this.setState({
                visible: false,
            });
        },
        onActionClose: function () {
            this.onActionCancel();
        },
        bindClicked: function (e) {
            var id = e.currentTarget.dataset.id;
            this.goDetail(id);
        },
        goDetail: function (id) {
            var _a = this.props, relations = _a.relations, entity = _a.entity, entityId = _a.entityId;
            this.navigateTo({
                url: '/userRelation/detail2',
                oakId: id,
                relations: relations,
                entity: entity,
                entityId: entityId,
            });
        },
        searchChange: function (event) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var value;
                return tslib_1.__generator(this, function (_a) {
                    value = this.resolveInput(event).value;
                    this.addNamedFilter({
                        filter: {
                            id: {
                                $in: {
                                    entity: 'mobile',
                                    data: {
                                        userId: 1,
                                    },
                                    filter: {
                                        mobile: {
                                            $includes: value,
                                        },
                                    },
                                },
                            },
                        },
                        '#name': 'mobile',
                    });
                    return [2 /*return*/];
                });
            });
        },
        searchCancel: function () {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                return tslib_1.__generator(this, function (_a) {
                    this.removeNamedFilterByName('mobile');
                    return [2 /*return*/];
                });
            });
        },
        searchConfirm: function () {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                return tslib_1.__generator(this, function (_a) {
                    this.refresh();
                    return [2 /*return*/];
                });
            });
        },
        // web table methods
        onEdit: function (e) {
            var editableRowKeys = this.state.editableRowKeys;
            var id = e.currentTarget.dataset.id;
            if (!editableRowKeys.includes(id)) {
                this.setState({
                    editableRowKeys: editableRowKeys.concat(id),
                });
            }
        },
        updateEditRowKey: function (id) {
            var editableRowKeys = this.state.editableRowKeys;
            var index = editableRowKeys.findIndex(function (t) { return t === id; });
            editableRowKeys.splice(index, 1);
            this.setState({
                editableRowKeys: tslib_1.__spreadArray([], tslib_1.__read(editableRowKeys), false),
            });
        },
        onSave: function (e) {
            var id = e.currentTarget.dataset.id;
            this.currentSaveId = id;
            // 触发内部校验，而后在 onRowValidate 中接收异步校验结果
            this.tableRef.current.validateRowData(id);
        },
        onCancel: function (e) {
            var id = e.currentTarget.dataset.id;
            this.updateEditRowKey(id);
            this.tableRef.current.clearValidateData();
        },
        onRowValidate: function (params) {
            var _this = this;
            if (params.result.length) {
                var r = params.result[0];
                this.setMessage({
                    type: 'error',
                    content: "".concat(r.col.title, " ").concat(r.errorList[0].message),
                });
                return;
            }
            // 如果是 table 的父组件主动触发校验
            if (params.trigger === 'parent' && !params.result.length) {
                var users_1 = this.state.users;
                var _a = this.props, entity_1 = _a.entity, entityId_1 = _a.entityId;
                var entityStr_1 = (0, string_1.firstLetterUpperCase)(entity_1);
                var current_1 = this.editMap[this.currentSaveId];
                if (current_1) {
                    Object.keys(current_1.editedRow).forEach(function (ele) {
                        if (ele === 'relations') {
                            var userRelations_1 = users_1[current_1.rowIndex].relations;
                            userRelations_1.forEach(function (ele2) {
                                var _a;
                                if (!current_1.editedRow[ele].includes(ele2)) {
                                    _this.toggleNode((_a = {
                                            relation: ele2
                                        },
                                        _a["".concat(entity_1, "Id")] = entityId_1,
                                        _a), false, "".concat(current_1.rowIndex, ".user").concat(entityStr_1, "$user"));
                                }
                            });
                            current_1.editedRow[ele].forEach(function (ele2) {
                                var _a;
                                if (!userRelations_1.includes(ele2)) {
                                    _this.toggleNode((_a = {
                                            relation: ele2
                                        },
                                        _a["".concat(entity_1, "Id")] = entityId_1,
                                        _a), true, "".concat(current_1.rowIndex, ".user").concat(entityStr_1, "$user"));
                                }
                            });
                            _this.execute('grant');
                        }
                        else {
                            _this.setUpdateData("".concat(0, ".").concat(ele), current_1.editedRow[ele]);
                            _this.execute('update');
                        }
                    });
                }
                this.updateEditRowKey(this.currentSaveId);
            }
        },
        onRowEdit: function (params) {
            var _a;
            var row = params.row, col = params.col, value = params.value;
            this.editMap[row.id] = tslib_1.__assign(tslib_1.__assign({}, params), { editedRow: (_a = {}, _a[col.colKey] = value, _a) });
        },
    },
});
