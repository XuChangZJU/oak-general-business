"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var antd_1 = require("antd");
function render() {
    var _this = this;
    var oakLegalActions = this.state.oakLegalActions;
    return (oakLegalActions === null || oakLegalActions === void 0 ? void 0 : oakLegalActions.length) > 0
        ? oakLegalActions.map(function (ele) {
            var btnName = _this.t("userEntityGrant:action.".concat(ele));
            if (ele === 'remove') {
                btnName = _this.t("common:action.".concat(ele));
            }
            return ((0, jsx_runtime_1.jsx)(antd_1.Button, tslib_1.__assign({ type: "link", onClick: function (event) {
                    var modal = antd_1.Modal.confirm({
                        title: "\u786E\u8BA4".concat(btnName, "\u8BE5\u6388\u6743\u8BB0\u5F55\u5417\uFF1F"),
                        okText: '确定',
                        cancelText: '取消',
                        onOk: function (e) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                            return tslib_1.__generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, this.tapAction(ele)];
                                    case 1:
                                        _a.sent();
                                        modal.destroy();
                                        return [2 /*return*/];
                                }
                            });
                        }); },
                        onCancel: function (e) {
                            modal.destroy();
                        },
                    });
                } }, { children: btnName })));
        })
        : null;
}
exports.default = render;
