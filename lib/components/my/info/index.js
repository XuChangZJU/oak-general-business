"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var assert_1 = tslib_1.__importDefault(require("assert"));
var uuid_1 = require("oak-domain/lib/utils/uuid");
exports.default = OakComponent({
    isList: false,
    formData: function (_a) {
        var features = _a.features;
        var userInfo = features.token.getUserInfo();
        if (userInfo) {
            var id = userInfo.id, nickname = userInfo.nickname, name_1 = userInfo.name, mobile$user = userInfo.mobile$user, idState = userInfo.idState, userState = userInfo.userState, gender = userInfo.gender;
            var mobileText = mobile$user.length > 1 ? this.t('moreThanOne') : (mobile$user.length == 1 ? mobile$user[0].mobile : this.t('unset'));
            return {
                nameText: nickname || name_1,
                mobileText: mobileText,
                userId: id,
                nickname: nickname,
                name: name_1,
                idState: idState,
                userState: userState,
                gender: gender,
            };
        }
        return {};
    },
    properties: {
        hideLogout: Boolean,
    },
    lifetimes: {
        attached: function () {
            var _this = this;
            this.subscribed.push(this.features.token.subscribe(function () { return _this.reRender(); }));
            this.subscribed.push(this.features.cache.subscribe(function () { return _this.reRender(); }));
        }
    },
    methods: {
        logout: function () {
            this.features.token.logout();
        },
        updateAttribute: function (attr, value) {
            var _a;
            var userId = this.state.userId;
            (0, assert_1.default)(userId);
            return this.features.cache.operate('user', {
                id: (0, uuid_1.generateNewId)(),
                action: 'update',
                data: (_a = {},
                    _a[attr] = value,
                    _a),
                filter: {
                    id: userId,
                }
            });
        }
    }
});
