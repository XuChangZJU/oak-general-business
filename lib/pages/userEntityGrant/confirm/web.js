"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const antd_1 = require("antd");
const web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
const icons_1 = require("@ant-design/icons");
const utils_1 = require("oak-frontend-base/es/utils/utils");
const success_1 = tslib_1.__importDefault(require("../../../components/common/result/success"));
const fail_1 = tslib_1.__importDefault(require("../../../components/common/result/fail"));
function Render(props) {
    const { oakLoading, oakExecuting, type, expired, relation, expiresAt, granter, entity, hasConfirmed, //当前用户关系是否存在
    granteeId, number, confirmed, userId, redirectTo, redirectCounter, id, oakId, } = props.data;
    const { t, handleConfirm, redirectPage } = props.methods;
    const isOwner = !!(granteeId && userId === granteeId);
    const getRelationTip = () => {
        let str = `${granter?.name || granter?.nickname}`;
        const relationStr = relation?.display || relation
            ? t(`${entity}:r.${relation?.name}`)
            : '';
        if (type === 'grant') {
            str = str.concat('授予您【').concat(relationStr).concat('】');
            return str;
        }
        str = str.concat('转让您【').concat(relationStr).concat('】');
        return str;
    };
    const getDescTip = () => {
        if (hasConfirmed || isOwner) {
            return '您已领取';
        }
        if (expired) {
            return '已过期，请联系相关人员重新分享';
        }
        // number设置1个的时候
        if (number === 1 && confirmed > 0 && (!isOwner || !hasConfirmed)) {
            return '被他人已领取';
        }
        return '请您领取';
    };
    if (oakLoading) {
        return ((0, jsx_runtime_1.jsx)("div", { className: web_module_less_1.default.container, children: (0, jsx_runtime_1.jsx)(success_1.default, { icon: (0, jsx_runtime_1.jsx)(icons_1.LoadingOutlined, { className: web_module_less_1.default.brand_icon }), title: "\u52A0\u8F7D\u4E2D", description: "\u6B63\u5728\u83B7\u53D6\u6570\u636E\uFF0C\u8BF7\u7A0D\u540E" }) }));
    }
    if (oakId !== id) {
        return ((0, jsx_runtime_1.jsx)("div", { className: web_module_less_1.default.container, children: (0, jsx_runtime_1.jsx)(fail_1.default, { title: "\u6570\u636E\u975E\u6CD5", description: "\u62B1\u6B49\uFF0C\u8BE5\u6570\u636E\u4E0D\u5B58\u5728" }) }));
    }
    return ((0, jsx_runtime_1.jsxs)("div", { className: web_module_less_1.default.container, children: [(0, jsx_runtime_1.jsxs)("div", { className: web_module_less_1.default.content, children: [type === 'grant' ? ((0, jsx_runtime_1.jsx)(icons_1.UserAddOutlined, { className: web_module_less_1.default.icon })) : ((0, jsx_runtime_1.jsx)(icons_1.UserSwitchOutlined, { className: web_module_less_1.default.icon })), (0, jsx_runtime_1.jsx)("div", { className: web_module_less_1.default.title, children: getRelationTip() }), (0, jsx_runtime_1.jsx)("div", { className: web_module_less_1.default.description, children: getDescTip() })] }), (0, jsx_runtime_1.jsxs)(antd_1.Space, { direction: "vertical", children: [!oakLoading &&
                        !expired &&
                        !hasConfirmed &&
                        !isOwner &&
                        number > confirmed && ((0, jsx_runtime_1.jsx)(antd_1.Button, { size: "large", block: true, type: "primary", onClick: () => {
                            handleConfirm();
                        }, disabled: oakExecuting, children: "\u9886\u53D6" })), utils_1.isWeiXin && ((0, jsx_runtime_1.jsx)(antd_1.Button, { size: "large", block: true, onClick: () => {
                            WeixinJSBridge.call('closeWindow');
                        }, children: "\u5173\u95ED" }))] })] }));
}
exports.default = Render;
