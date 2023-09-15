"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var antd_1 = require("antd");
var pageHeader_1 = tslib_1.__importDefault(require("../../../components/common/pageHeader"));
var web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
var upsertSubway_1 = tslib_1.__importDefault(require("../upsertSubway"));
var upsertStation_1 = tslib_1.__importDefault(require("../upsertStation"));
function Render(props) {
    var data = props.data, methods = props.methods;
    var oakFullpath = data.oakFullpath, treeData = data.treeData, areaOptions = data.areaOptions, areaId = data.areaId;
    var t = methods.t, setAreaId = methods.setAreaId, setFilterByAreaId = methods.setFilterByAreaId;
    var _a = tslib_1.__read((0, react_1.useState)(false), 2), openSubway = _a[0], setSubway = _a[1];
    var _b = tslib_1.__read((0, react_1.useState)(false), 2), openStation = _b[0], setStation = _b[1];
    var _c = tslib_1.__read((0, react_1.useState)(''), 2), subwayId = _c[0], setSubwayId = _c[1];
    var _d = tslib_1.__read((0, react_1.useState)(''), 2), stationId = _d[0], setStationId = _d[1];
    return ((0, jsx_runtime_1.jsx)(pageHeader_1.default, { title: "\u5730\u94C1\u7EBF\u8DEF\u7BA1\u7406", children: (0, jsx_runtime_1.jsxs)("div", { className: web_module_less_1.default.container, children: [(0, jsx_runtime_1.jsxs)("div", { children: ["\u70B9\u51FB\u5207\u6362\u57CE\u5E02\uFF1A", (0, jsx_runtime_1.jsx)(antd_1.Select, { placeholder: '切换城市', value: areaId, onChange: function (value) {
                                setAreaId(value);
                                setFilterByAreaId(value);
                            }, style: { width: '20%' }, options: areaOptions, allowClear: true })] }), (0, jsx_runtime_1.jsx)(antd_1.Tree, { className: web_module_less_1.default.tree, blockNode: true, treeData: treeData, titleRender: function (nodeData) {
                        return ((0, jsx_runtime_1.jsxs)(antd_1.Row, { align: "middle", style: { flex: 1 }, children: [(0, jsx_runtime_1.jsx)(antd_1.Col, { flex: "auto", children: nodeData.title }), (0, jsx_runtime_1.jsx)(antd_1.Col, { flex: "none", children: (0, jsx_runtime_1.jsx)(antd_1.Space, { children: !nodeData.isLeaf ? (0, jsx_runtime_1.jsx)(antd_1.Button, { onClick: function () {
                                                setSubwayId(nodeData.key);
                                                setSubway(true);
                                            }, children: "\u7F16\u8F91" }) :
                                            (0, jsx_runtime_1.jsx)(antd_1.Button, { onClick: function () {
                                                    var index = nodeData.key.indexOf('/') + 1;
                                                    var temp = nodeData.key.substr(index);
                                                    setStationId(temp);
                                                    setStation(true);
                                                }, children: "\u7F16\u8F91" }) }) })] }));
                    } }), openSubway && ((0, jsx_runtime_1.jsx)(upsertSubway_1.default, { onClose: function () { return setSubway(false); }, openSubway: openSubway, oakId: subwayId, oakPath: "".concat(oakFullpath, ".").concat(subwayId), oakAutoUnmount: true })), openStation && ((0, jsx_runtime_1.jsx)(upsertStation_1.default, { onClose: function () { return setStation(false); }, openStation: openStation, oakId: stationId, subwayId: subwayId, oakPath: "$subwayLine/upsertStation,".concat(stationId), oakAutoUnmount: true }))] }) }));
}
exports.default = Render;
