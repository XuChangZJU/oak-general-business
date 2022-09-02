"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var extraFile_1 = require("../../../utils/extraFile");
exports.default = OakPage({
    path: 'userRelation:detail',
    entity: 'user',
    projection: {
        id: 1,
        nickname: 1,
        name: 1,
        userState: 1,
        idState: 1,
        extraFile$entity: {
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
        mobile$user: {
            $entity: 'mobile',
            data: {
                id: 1,
                mobile: 1,
            },
        },
    },
    filters: [
        // 由调用者注入oakFilter
        {
            filter: function (_a) {
                var features = _a.features, props = _a.props, onLoadOptions = _a.onLoadOptions;
                return tslib_1.__awaiter(void 0, void 0, void 0, function () {
                    var userIds;
                    return tslib_1.__generator(this, function (_b) {
                        userIds = props.userIds;
                        return [2 /*return*/, {
                                id: {
                                    $in: userIds,
                                },
                            }];
                    });
                });
            },
        },
    ],
    isList: true,
    formData: function (_a) {
        var users = _a.data, props = _a.props, features = _a.features;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var filter;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.getFilterByName('name')];
                    case 1:
                        filter = _b.sent();
                        return [2 /*return*/, {
                                users: users === null || users === void 0 ? void 0 : users.map(function (ele) {
                                    var _a;
                                    var _b = ele || {}, mobile$user = _b.mobile$user, extraFile$entity = _b.extraFile$entity;
                                    var mobile = mobile$user && ((_a = mobile$user[0]) === null || _a === void 0 ? void 0 : _a.mobile);
                                    var avatar = extraFile$entity &&
                                        extraFile$entity[0] &&
                                        (0, extraFile_1.composeFileUrl)(extraFile$entity[0]);
                                    var user2 = Object.assign({}, ele, {
                                        mobile: mobile,
                                        avatar: avatar,
                                    });
                                    return user2;
                                }),
                                searchValue: (filter === null || filter === void 0 ? void 0 : filter.$or)[0].name.$includes,
                            }];
                }
            });
        });
    },
    properties: {
        userIds: Array,
    },
    methods: {
        onCellClicked: function (e, options) {
            var id = options.id;
        },
        addUserRelation: function () {
        }
    },
});
