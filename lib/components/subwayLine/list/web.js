"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var antd_1 = require("antd");
var web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
function render(props) {
    var data = props.data, methods = props.methods;
    var t = methods.t, getStations = methods.getStations, getSubways = methods.getSubways;
    var oakLoading = data.oakLoading, oakDirty = data.oakDirty, oakExecuting = data.oakExecuting, subways = data.subways, stations = data.stations, subwayId = data.subwayId, areaId = data.areaId, areas = data.areas;
    var _a = tslib_1.__read((0, react_1.useState)([]), 2), stationsList = _a[0], setCheckedList = _a[1];
    return ((0, jsx_runtime_1.jsxs)("div", tslib_1.__assign({ className: web_module_less_1.default.container }, { children: [(0, jsx_runtime_1.jsx)(antd_1.Tabs, { style: { height: '40vh' }, tabPosition: 'left', type: "card", defaultActiveKey: areaId, onChange: function (value) {
                    getSubways(value);
                }, items: areas === null || areas === void 0 ? void 0 : areas.map(function (ele) { return ({
                    key: ele.id,
                    label: ele.name,
                    children: ((0, jsx_runtime_1.jsx)(antd_1.Tabs
                    // type="card"
                    , { 
                        // type="card"
                        style: { height: '40vh' }, tabPosition: 'top', onChange: function (value) {
                            getStations(value);
                        }, items: subways === null || subways === void 0 ? void 0 : subways.map(function (ele) { return ({
                            key: ele.id,
                            label: ele.name,
                            children: (
                            // <Checkbox.Group
                            //     options={stations}
                            // />
                            (0, jsx_runtime_1.jsx)(antd_1.Checkbox.Group, tslib_1.__assign({ onChange: setCheckedList, value: stationsList }, { children: (0, jsx_runtime_1.jsx)(antd_1.Row, tslib_1.__assign({ gutter: [0, 8] }, { children: stations === null || stations === void 0 ? void 0 : stations.map(function (ele) {
                                        return ((0, jsx_runtime_1.jsx)(antd_1.Col, tslib_1.__assign({ span: 4 }, { children: (0, jsx_runtime_1.jsx)(antd_1.Checkbox, tslib_1.__assign({ value: ele.value }, { children: ele.label })) })));
                                    }) })) }))),
                        }); }) })),
                }); }) }), (0, jsx_runtime_1.jsx)("div", tslib_1.__assign({ style: { textAlign: 'center' } }, { children: (0, jsx_runtime_1.jsxs)(antd_1.Space, { children: [(0, jsx_runtime_1.jsx)(antd_1.Button
                        // onClick={() => {
                        // }}
                        , { children: "\u53D6\u6D88" }), (0, jsx_runtime_1.jsx)(antd_1.Button, tslib_1.__assign({ type: "primary" }, { children: "\u786E\u5B9A" }))] }) }))] })));
}
exports.default = render;
