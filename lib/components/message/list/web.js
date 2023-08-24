"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var mobile_module_less_1 = tslib_1.__importDefault(require("./mobile.module.less"));
var cell_1 = tslib_1.__importDefault(require("../../../components/message/cell"));
var empty_1 = tslib_1.__importDefault(require("../../../components/common/empty"));
function Render(props) {
    var data = props.data, methods = props.methods;
    var messages = data.messages, oakFullpath = data.oakFullpath;
    var goDetailById = methods.goDetailById;
    return ((0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: mobile_module_less_1.default.container }, { children: (messages === null || messages === void 0 ? void 0 : messages.length) > 0 ? ((0, jsx_runtime_1.jsx)("div", { children: messages === null || messages === void 0 ? void 0 : messages.map(function (message, index) { return ((0, jsx_runtime_1.jsx)(cell_1.default, { oakId: message.id, oakPath: oakFullpath
                    ? "".concat(oakFullpath, ".").concat(message.id)
                    : '', onItemClicked: function (item) {
                    goDetailById(item.id);
                } }, message.id)); }) })) : ((0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ className: mobile_module_less_1.default.noData }, { children: (0, jsx_runtime_1.jsx)(empty_1.default, { description: "\u6682\u65E0\u6D88\u606F", image: empty_1.default.PRESENTED_IMAGE_SIMPLE }) }))) })));
}
exports.default = Render;
