"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var antd_1 = require("antd");
var web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
var icons_1 = require("@ant-design/icons");
var utils_1 = require("oak-frontend-base/lib/utils/utils");
function render() {
    var _this = this;
    var _a = this.state, oakLoading = _a.oakLoading, oakExecuting = _a.oakExecuting, type = _a.type, expired = _a.expired, relation = _a.relation, expiresAt = _a.expiresAt, granter = _a.granter, entity = _a.entity, isExists = _a.isExists, //当前用户关系是否存在
    granteeId = _a.granteeId, number = _a.number, confirmed = _a.confirmed, userId = _a.userId;
    var isOwner = !!(granteeId && userId === granteeId);
    var getRelationTip = function () {
        var str = "".concat((granter === null || granter === void 0 ? void 0 : granter.name) || (granter === null || granter === void 0 ? void 0 : granter.nickname));
        var relationStr = relation ? _this.t("".concat(entity, ":r.").concat(relation)) : '';
        if (type === 'grant') {
            str = str.concat('授予您【').concat(relationStr).concat('】权限');
            return str;
        }
        str = str.concat('转让您【').concat(relationStr).concat('】权限');
        return str;
    };
    var getDescTip = function () {
        if (isExists || isOwner) {
            return '您已领取';
        }
        if (expired) {
            return '已过期，请联系相关人员重新分享';
        }
        // number设置1个的时候 
        if (number === 1 && confirmed > 0 && (!isOwner || !isExists)) {
            return '被他人已领取';
        }
        return '请您领取';
    };
    return ((0, jsx_runtime_1.jsxs)("div", tslib_1.__assign({ className: web_module_less_1.default.container }, { children: [(0, jsx_runtime_1.jsxs)("div", tslib_1.__assign({ className: web_module_less_1.default.content }, { children: [type === 'grant' ? ((0, jsx_runtime_1.jsx)(icons_1.UserAddOutlined, { className: web_module_less_1.default.icon })) : ((0, jsx_runtime_1.jsx)(icons_1.UserSwitchOutlined, { className: web_module_less_1.default.icon })), (0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_module_less_1.default.title }, { children: getRelationTip() })), (0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: web_module_less_1.default.description }, { children: getDescTip() }))] })), (0, jsx_runtime_1.jsxs)(antd_1.Space, tslib_1.__assign({ direction: "vertical" }, { children: [!oakLoading && !expired && !isExists && !isOwner && ((0, jsx_runtime_1.jsx)(antd_1.Button, tslib_1.__assign({ block: true, type: "primary", onClick: function () {
                            _this.handleConfirm();
                        }, disabled: oakExecuting }, { children: "\u9886\u53D6" }))), utils_1.isWeiXin && ((0, jsx_runtime_1.jsx)(antd_1.Button, tslib_1.__assign({ block: true, onClick: function () {
                            WeixinJSBridge.call('closeWindow');
                        } }, { children: "\u5173\u95ED" })))] }))] })));
}
exports.default = render;
