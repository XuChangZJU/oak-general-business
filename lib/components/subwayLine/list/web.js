"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const antd_1 = require("antd");
const web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
function render(props) {
    const { data, methods } = props;
    const { t, getStations, getSubways, setCheckedList, cancel, confirm } = methods;
    const { subways, stations, areaId, areas, stationIds, selectIds } = data;
    return ((0, jsx_runtime_1.jsxs)("div", { className: web_module_less_1.default.container, children: [(0, jsx_runtime_1.jsx)(antd_1.Tabs, { style: { minHeight: '40vh' }, tabPosition: 'left', type: "card", defaultActiveKey: areaId, onChange: (value) => {
                    getSubways(value);
                }, items: areas?.map((ele) => ({
                    key: ele.id,
                    label: ele.name,
                    children: ((0, jsx_runtime_1.jsx)(antd_1.Tabs, { tabPosition: 'top', onChange: (value) => {
                            getStations(value);
                        }, items: subways?.map((ele) => ({
                            key: ele.id,
                            label: ele.name,
                            children: ((0, jsx_runtime_1.jsx)(antd_1.Space, { size: [0, 16], wrap: true, children: stations?.map((ele) => {
                                    return ((0, jsx_runtime_1.jsx)(antd_1.Checkbox, { disabled: selectIds?.includes(ele.value), onChange: (e) => {
                                            setCheckedList(e.target.value, e.target.checked);
                                        }, checked: stationIds
                                            .concat(selectIds || [])
                                            .includes(ele.value), value: ele.value, children: ele.label }));
                                }) })),
                        })) })),
                })) }), (0, jsx_runtime_1.jsx)("div", { style: { textAlign: 'center', marginTop: 16 }, children: (0, jsx_runtime_1.jsxs)(antd_1.Space, { children: [(0, jsx_runtime_1.jsx)(antd_1.Button, { onClick: () => {
                                cancel();
                            }, children: "\u53D6\u6D88" }), (0, jsx_runtime_1.jsx)(antd_1.Button, { type: "primary", onClick: async () => {
                                confirm();
                            }, children: "\u786E\u5B9A" })] }) })] }));
}
exports.default = render;
