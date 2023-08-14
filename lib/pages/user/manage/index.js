"use strict";
// index.ts
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
exports.default = OakComponent({
    entity: 'user',
    projection: {
        id: 1,
        nickname: 1,
        name: 1,
        userState: 1,
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
                entityId: 1,
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
    sorters: [
        {
            sorter: function () { return ({
                $attr: {
                    $$createAt$$: 1,
                },
                $direction: 'desc',
            }); },
        },
    ],
    isList: true,
    formData: function (_a) {
        var users = _a.data, features = _a.features;
        var pagination = this.getPagination();
        var userArr = users.map(function (user) {
            var _a;
            var _b = user || {}, id = _b.id, nickname = _b.nickname, userState = _b.userState, name = _b.name, mobile$user = _b.mobile$user, extraFile$entity = _b.extraFile$entity;
            var mobile = mobile$user && ((_a = mobile$user[0]) === null || _a === void 0 ? void 0 : _a.mobile);
            var avatar = features.extraFile.getUrl(extraFile$entity && extraFile$entity[0]);
            return {
                id: id,
                nickname: nickname,
                name: name,
                mobile: mobile,
                avatar: avatar,
                userState: userState,
            };
        });
        return {
            userArr: userArr,
            pagination: pagination,
        };
    },
    properties: {
        event: '',
    },
    data: {
        stateColor: {
            shadow: 'primary',
            normal: 'success',
            disabled: 'danger',
        },
    },
    methods: {
        bindClicked: function (input) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var _a, dataset, event, id;
                return tslib_1.__generator(this, function (_b) {
                    _a = this.resolveInput(input), dataset = _a.dataset, event = _a.event;
                    id = dataset.id;
                    this.onCellClicked(id, event);
                    return [2 /*return*/];
                });
            });
        },
        onCellClicked: function (id) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var event;
                return tslib_1.__generator(this, function (_a) {
                    event = this.props.event;
                    if (event) {
                        this.pub(event, this.state.userArr.find(function (ele) { return ele.id === id; }));
                        // this.navigateBack();
                    }
                    else {
                        this.navigateTo({
                            url: '/user/manage/detail',
                            oakId: id,
                        });
                    }
                    return [2 /*return*/];
                });
            });
        },
        goNewUser: function () {
            this.navigateTo({
                url: '/user/manage/upsert',
            });
        },
    },
    lifetimes: {
        detached: function () {
            this.unsubAll(this.props.event);
        },
    },
});
