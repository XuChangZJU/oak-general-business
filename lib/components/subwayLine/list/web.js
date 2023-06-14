"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var antd_1 = require("antd");
var web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
function render(props) {
    var _this = this;
    var data = props.data, methods = props.methods;
    var t = methods.t, getStations = methods.getStations, getSubways = methods.getSubways, setCheckedList = methods.setCheckedList, cancel = methods.cancel, confirm = methods.confirm;
    var subways = data.subways, stations = data.stations, areaId = data.areaId, areas = data.areas, stationIds = data.stationIds, selectIds = data.selectIds;
    return ((0, jsx_runtime_1.jsxs)("div", tslib_1.__assign({ className: web_module_less_1.default.container }, { children: [(0, jsx_runtime_1.jsx)(antd_1.Tabs, { style: { minHeight: '40vh' }, tabPosition: 'left', type: "card", defaultActiveKey: areaId, onChange: function (value) {
                    getSubways(value);
                }, items: areas === null || areas === void 0 ? void 0 : areas.map(function (ele) { return ({
                    key: ele.id,
                    label: ele.name,
                    children: ((0, jsx_runtime_1.jsx)(antd_1.Tabs, { tabPosition: 'top', onChange: function (value) {
                            getStations(value);
                        }, items: subways === null || subways === void 0 ? void 0 : subways.map(function (ele) { return ({
                            key: ele.id,
                            label: ele.name,
                            children: ((0, jsx_runtime_1.jsx)(antd_1.Space, tslib_1.__assign({ size: [0, 16], wrap: true }, { children: stations === null || stations === void 0 ? void 0 : stations.map(function (ele) {
                                    return ((0, jsx_runtime_1.jsx)(antd_1.Checkbox, tslib_1.__assign({ disabled: selectIds === null || selectIds === void 0 ? void 0 : selectIds.includes(ele.value), onChange: function (e) {
                                            setCheckedList(e.target.value, e.target.checked);
                                        }, checked: stationIds
                                            .concat(selectIds || [])
                                            .includes(ele.value), value: ele.value }, { children: ele.label })));
                                }) }))),
                        }); }) })),
                }); }) }), (0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ style: { textAlign: 'center', marginTop: 16 } }, { children: (0, jsx_runtime_1.jsxs)(antd_1.Space, { children: [(0, jsx_runtime_1.jsx)(antd_1.Button, tslib_1.__assign({ onClick: function () {
                                cancel();
                            } }, { children: "\u53D6\u6D88" })), (0, jsx_runtime_1.jsx)(antd_1.Button, tslib_1.__assign({ type: "primary", onClick: function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                return tslib_1.__generator(this, function (_a) {
                                    confirm();
                                    return [2 /*return*/];
                                });
                            }); } }, { children: "\u786E\u5B9A" }))] }) }))] })));
}
exports.default = render;
