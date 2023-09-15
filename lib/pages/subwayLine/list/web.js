"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const antd_1 = require("antd");
const pageHeader_1 = tslib_1.__importDefault(require("../../../components/common/pageHeader"));
const web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
const upsertSubway_1 = tslib_1.__importDefault(require("../upsertSubway"));
const upsertStation_1 = tslib_1.__importDefault(require("../upsertStation"));
function Render(props) {
    const { data, methods } = props;
    const { oakFullpath, treeData, areaOptions, areaId } = data;
    const { t, setAreaId, setFilterByAreaId } = methods;
    const [openSubway, setSubway] = (0, react_1.useState)(false);
    const [openStation, setStation] = (0, react_1.useState)(false);
    const [subwayId, setSubwayId] = (0, react_1.useState)('');
    const [stationId, setStationId] = (0, react_1.useState)('');
    return ((0, jsx_runtime_1.jsx)(pageHeader_1.default, { title: "\u5730\u94C1\u7EBF\u8DEF\u7BA1\u7406", children: (0, jsx_runtime_1.jsxs)("div", { className: web_module_less_1.default.container, children: [(0, jsx_runtime_1.jsxs)("div", { children: ["\u70B9\u51FB\u5207\u6362\u57CE\u5E02\uFF1A", (0, jsx_runtime_1.jsx)(antd_1.Select, { placeholder: '切换城市', value: areaId, onChange: (value) => {
                                setAreaId(value);
                                setFilterByAreaId(value);
                            }, style: { width: '20%' }, options: areaOptions, allowClear: true })] }), (0, jsx_runtime_1.jsx)(antd_1.Tree, { className: web_module_less_1.default.tree, blockNode: true, treeData: treeData, titleRender: (nodeData) => {
                        return ((0, jsx_runtime_1.jsxs)(antd_1.Row, { align: "middle", style: { flex: 1 }, children: [(0, jsx_runtime_1.jsx)(antd_1.Col, { flex: "auto", children: nodeData.title }), (0, jsx_runtime_1.jsx)(antd_1.Col, { flex: "none", children: (0, jsx_runtime_1.jsx)(antd_1.Space, { children: !nodeData.isLeaf ? (0, jsx_runtime_1.jsx)(antd_1.Button, { onClick: () => {
                                                setSubwayId(nodeData.key);
                                                setSubway(true);
                                            }, children: "\u7F16\u8F91" }) :
                                            (0, jsx_runtime_1.jsx)(antd_1.Button, { onClick: () => {
                                                    const index = nodeData.key.indexOf('/') + 1;
                                                    const temp = nodeData.key.substr(index);
                                                    setStationId(temp);
                                                    setStation(true);
                                                }, children: "\u7F16\u8F91" }) }) })] }));
                    } }), openSubway && ((0, jsx_runtime_1.jsx)(upsertSubway_1.default, { onClose: () => setSubway(false), openSubway: openSubway, oakId: subwayId, oakPath: `${oakFullpath}.${subwayId}`, oakAutoUnmount: true })), openStation && ((0, jsx_runtime_1.jsx)(upsertStation_1.default, { onClose: () => setStation(false), openStation: openStation, oakId: stationId, subwayId: subwayId, oakPath: `$subwayLine/upsertStation,${stationId}`, oakAutoUnmount: true }))] }) }));
}
exports.default = Render;
