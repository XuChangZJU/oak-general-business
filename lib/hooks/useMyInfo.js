"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = require("react");
var useFeatures_1 = tslib_1.__importDefault(require("./useFeatures"));
function useMyInfo() {
    var features = (0, useFeatures_1.default)();
    var getMyInfo = function () {
        var _a, _b;
        var userInfo = features.token.getUserInfo();
        var mobile = (userInfo === null || userInfo === void 0 ? void 0 : userInfo.mobile$user) && ((_a = userInfo === null || userInfo === void 0 ? void 0 : userInfo.mobile$user[0]) === null || _a === void 0 ? void 0 : _a.mobile) || '';
        var extraFile = (_b = userInfo === null || userInfo === void 0 ? void 0 : userInfo.extraFile$entity) === null || _b === void 0 ? void 0 : _b.find(function (ele) { return ele.tag1 === 'avatar'; });
        var avatarUrl = features.extraFile.getUrl(extraFile);
        return {
            avatarUrl: avatarUrl,
            name: (userInfo === null || userInfo === void 0 ? void 0 : userInfo.name) || '',
            nickname: (userInfo === null || userInfo === void 0 ? void 0 : userInfo.nickname) || '',
            mobile: mobile,
        };
    };
    var myInfo = getMyInfo();
    var _a = tslib_1.__read((0, react_1.useState)(myInfo.avatarUrl || ''), 2), avatarUrl = _a[0], setAvatarUrl = _a[1];
    var _b = tslib_1.__read((0, react_1.useState)(myInfo.nickname || ''), 2), nickname = _b[0], setNickname = _b[1];
    var _c = tslib_1.__read((0, react_1.useState)(myInfo.name || ''), 2), name = _c[0], setName = _c[1];
    var _d = tslib_1.__read((0, react_1.useState)(myInfo.mobile || ''), 2), mobile = _d[0], setMobile = _d[1];
    (0, react_1.useEffect)(function () {
        var appUnsub = features.application.subscribe(function () {
            var _a = getMyInfo(), avatarUrl = _a.avatarUrl, nickname = _a.nickname, name = _a.name, mobile = _a.mobile;
            setAvatarUrl(avatarUrl);
            setNickname(nickname);
            setName(name);
            setMobile(mobile);
        });
        var tokenUnsub = features.token.subscribe(function () {
            var _a = getMyInfo(), avatarUrl = _a.avatarUrl, nickname = _a.nickname, name = _a.name, mobile = _a.mobile;
            setAvatarUrl(avatarUrl);
            setNickname(nickname);
            setName(name);
            setMobile(mobile);
        });
        return function () {
            appUnsub();
            tokenUnsub();
        };
    }, []);
    return {
        avatarUrl: avatarUrl,
        name: name,
        nickname: nickname,
        mobile: mobile,
    };
}
exports.default = useMyInfo;
