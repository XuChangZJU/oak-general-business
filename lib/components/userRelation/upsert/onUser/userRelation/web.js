"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var antd_mobile_1 = require("antd-mobile");
function Render(props) {
    var _a = props.data, entity = _a.entity, relations2 = _a.relations2;
    var _b = props.methods, t = _b.t, onRelationChange = _b.onRelationChange;
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: relations2 === null || relations2 === void 0 ? void 0 : relations2.map(function (_a) {
            var relation = _a.relation, isChecked = _a.isChecked;
            return ((0, jsx_runtime_1.jsx)(antd_mobile_1.Checkbox, tslib_1.__assign({ style: { marginRight: 20 }, checked: isChecked, onChange: function (checked) {
                    onRelationChange(relation, checked);
                } }, { children: relation.name ? t("".concat(entity, ":r.").concat(relation.name)) : relation.display })));
        }) }));
}
exports.default = Render;
