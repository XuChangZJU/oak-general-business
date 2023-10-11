"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const menu_1 = tslib_1.__importDefault(require("./menu"));
const conditionalMenu_1 = tslib_1.__importDefault(require("./conditionalMenu"));
const web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
const antd_1 = require("antd");
const tagList_1 = tslib_1.__importDefault(require("./tagList"));
function Render(props) {
    const { menuId, oakFullpath, is_menu_open, applicationId, isPlatform, tabKey } = props.data;
    const {} = props.methods;
    const [menuType, setMenuType] = (0, react_1.useState)('common');
    const [tag, setTag] = (0, react_1.useState)({});
    const getTag = (tag) => {
        setTag(tag);
    };
    const items = [
        {
            key: '1',
            label: '通用菜单',
            children: (0, jsx_runtime_1.jsx)(menu_1.default, { menuId: menuId ? menuId : undefined, oakPath: '$wechatMenu', applicationId: applicationId, oakAutoUnmount: true, menuType: menuType, tabKey: tabKey }),
        },
        {
            key: '2',
            label: '个性化菜单',
            children: (0, jsx_runtime_1.jsxs)("div", { className: web_module_less_1.default.conditionalMenu, children: [(0, jsx_runtime_1.jsx)("div", { className: web_module_less_1.default.tagList, children: (0, jsx_runtime_1.jsx)(tagList_1.default, { oakAutoUnmount: true, oakPath: '$wechatPublicTag', applicationId: applicationId, getTag: getTag }) }), tag.id ? ((0, jsx_runtime_1.jsx)(conditionalMenu_1.default, { oakPath: `$conditionalMenu-${tag.id}`, applicationId: applicationId, oakAutoUnmount: true, tagId: tag.id, wechatId: tag.wechatId, menuType: menuType, tabKey: tabKey })) : ((0, jsx_runtime_1.jsx)("div", { className: web_module_less_1.default.tagHelp, children: "\u8BF7\u9009\u62E9\u4E00\u4E2A\u6807\u7B7E" }))] }),
        },
    ];
    if (oakFullpath) {
        return ((0, jsx_runtime_1.jsx)("div", { children: is_menu_open ? ((0, jsx_runtime_1.jsx)("div", { className: web_module_less_1.default.tabs, children: isPlatform ? (0, jsx_runtime_1.jsx)(menu_1.default, { menuId: menuId ? menuId : undefined, oakPath: '$wechatMenu', applicationId: applicationId, oakAutoUnmount: true, menuType: menuType, tabKey: tabKey }) : (0, jsx_runtime_1.jsx)(antd_1.Tabs, { defaultActiveKey: '1', items: items, onChange: (key) => {
                        if (key === '1') {
                            setMenuType('common');
                        }
                        else {
                            setMenuType('conditional');
                        }
                    } }) })) : ((0, jsx_runtime_1.jsx)("div", { className: web_module_less_1.default.container, children: (0, jsx_runtime_1.jsx)("div", { className: web_module_less_1.default.warn, children: "\u5C1A\u672A\u5F00\u542F\u83DC\u5355\uFF0C\u8BF7\u5148\u524D\u5F80\u5FAE\u4FE1\u516C\u4F17\u5E73\u53F0\u5F00\u542F\u3002" }) })) }));
    }
    return null;
}
exports.default = Render;
