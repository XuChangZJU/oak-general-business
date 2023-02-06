"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var antd_1 = require("antd");
var confirm = antd_1.Modal.confirm;
var commonAction = ['create', 'update', 'remove', 'confirm', 'cancel', 'grant', 'revoke'];
function ItemComponent(props) {
    var type = props.type, entity = props.entity, label = props.label, action = props.action, buttonProps = props.buttonProps, custom = props.custom, t = props.t, onClick = props.onClick;
    var text;
    if (action) {
        if (commonAction.includes(action)) {
            text = t("common:action.".concat(action));
        }
        else {
            text = t("".concat(entity, ":action.").concat(action));
        }
    }
    else {
        text = label;
    }
    if (type === 'button') {
        return ((0, jsx_runtime_1.jsx)(antd_1.Button, tslib_1.__assign({}, buttonProps, { onClick: onClick }, { children: text })));
    }
    if (custom) {
        return ((0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ onClick: onClick }, { children: custom })));
    }
    return ((0, jsx_runtime_1.jsx)("a", tslib_1.__assign({ onClick: onClick }, { children: text })));
}
function Render(props) {
    var methods = props.methods, data = props.data;
    var t = methods.t;
    var items = data.items, oakLegalActions = data.oakLegalActions, spaceProps = data.spaceProps, entity = data.entity;
    return ((0, jsx_runtime_1.jsx)(antd_1.Space, tslib_1.__assign({}, spaceProps, { children: items && items.map(function (ele, index) {
            var _a = ele.auth, auth = _a === void 0 ? true : _a;
            if (
                !auth ||
                (auth && (
                    oakLegalActions === null || oakLegalActions === void 0
                        ? void 0
                        : oakLegalActions.includes(ele.action)
                ))
            ) {
                var onClick = function () {
                    if (ele.onClick) {
                        ele.onClick();
                        return;
                    }
                    methods.execute(ele.action);
                };
                if (ele.alerted) {
                    onClick = function () {
                        confirm({
                            title: ele.alertTitle,
                            content: ele.alertContent,
                            okText: ele.confirmText || '确定',
                            cancelText: ele.cancelText || '取消',
                            onOk: function () {
                                if (ele.onClick) {
                                    ele.onClick();
                                    return;
                                }
                                methods.execute(ele.action);
                                if (ele.callBack) {
                                    ele.callBack(index);
                                }
                            },
                        });
                    };
                }
                return (0, jsx_runtime_1.jsx)(
                    ItemComponent,
                    tslib_1.__assign({}, ele, {
                        entity: entity,
                        t: t,
                        onClick: onClick,
                    })
                );
            }
        }) })));
}
exports.default = Render;
