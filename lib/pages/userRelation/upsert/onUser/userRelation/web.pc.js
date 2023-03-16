"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var antd_1 = require("antd");
function Render(props) {
    var _a = props.data, entity = _a.entity, relations = _a.relations;
    var _b = props.methods, t = _b.t, onRelationChange = _b.onRelationChange, isChecked = _b.isChecked;
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: relations === null || relations === void 0 ? void 0 : relations.map(function (relation) { return ((0, jsx_runtime_1.jsx)(antd_1.Checkbox, tslib_1.__assign({ checked: isChecked(relation), value: relation, onChange: function (_a) {
                var target = _a.target;
                var checked = target.checked;
                onRelationChange(relation, checked);
            } }, { children: (t("".concat(entity, ":r.").concat(relation))) || relation }))); }) }));
}
exports.default = Render;
