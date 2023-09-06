import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Checkbox, Button, Tabs, Space } from 'antd';
import Style from './web.module.less';
export default function render(props) {
    const { data, methods } = props;
    const { t, getStations, getSubways, setCheckedList, cancel, confirm } = methods;
    const { subways, stations, areaId, areas, stationIds, selectIds } = data;
    return (_jsxs("div", { className: Style.container, children: [_jsx(Tabs, { style: { minHeight: '40vh' }, tabPosition: 'left', type: "card", defaultActiveKey: areaId, onChange: (value) => {
                    getSubways(value);
                }, items: areas?.map((ele) => ({
                    key: ele.id,
                    label: ele.name,
                    children: (_jsx(Tabs, { tabPosition: 'top', onChange: (value) => {
                            getStations(value);
                        }, items: subways?.map((ele) => ({
                            key: ele.id,
                            label: ele.name,
                            children: (_jsx(Space, { size: [0, 16], wrap: true, children: stations?.map((ele) => {
                                    return (_jsx(Checkbox, { disabled: selectIds?.includes(ele.value), onChange: (e) => {
                                            setCheckedList(e.target.value, e.target.checked);
                                        }, checked: stationIds
                                            .concat(selectIds || [])
                                            .includes(ele.value), value: ele.value, children: ele.label }));
                                }) })),
                        })) })),
                })) }), _jsx("div", { style: { textAlign: 'center', marginTop: 16 }, children: _jsxs(Space, { children: [_jsx(Button, { onClick: () => {
                                cancel();
                            }, children: "\u53D6\u6D88" }), _jsx(Button, { type: "primary", onClick: async () => {
                                confirm();
                            }, children: "\u786E\u5B9A" })] }) })] }));
}
