import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { Button, Space, Tree, Row, Col, Select } from 'antd';
import Style from './web.module.less';
import UpsertSubway from '../upsertSubway';
import UpsertStation from '../upsertStation';
export default function Render(props) {
    const { data, methods } = props;
    const { oakFullpath, treeData, areaOptions, areaId } = data;
    const { t, setAreaId, setFilterByAreaId } = methods;
    const [openSubway, setSubway] = useState(false);
    const [openStation, setStation] = useState(false);
    const [subwayId, setSubwayId] = useState('');
    const [stationId, setStationId] = useState('');
    return (_jsxs(_Fragment, { children: [_jsxs("div", { children: ["\u70B9\u51FB\u5207\u6362\u57CE\u5E02\uFF1A", _jsx(Select, { placeholder: '切换城市', value: areaId, onChange: (value) => {
                            setAreaId(value);
                            setFilterByAreaId(value);
                        }, style: { width: '20%' }, options: areaOptions, allowClear: true })] }), _jsx(Tree, { className: Style.tree, blockNode: true, treeData: treeData, titleRender: (nodeData) => {
                    return (_jsxs(Row, { align: "middle", style: { flex: 1 }, children: [_jsx(Col, { flex: "auto", children: nodeData.title }), _jsx(Col, { flex: "none", children: _jsx(Space, { children: !nodeData.isLeaf ? (_jsx(Button, { onClick: () => {
                                            setSubwayId(nodeData.key);
                                            setSubway(true);
                                        }, children: "\u7F16\u8F91" })) : (_jsx(Button, { onClick: () => {
                                            const index = nodeData.key.indexOf('/') + 1;
                                            const temp = nodeData.key.substr(index);
                                            setStationId(temp);
                                            setStation(true);
                                        }, children: "\u7F16\u8F91" })) }) })] }));
                } }), openSubway && (_jsx(UpsertSubway, { onClose: () => setSubway(false), openSubway: openSubway, oakId: subwayId, oakPath: `${oakFullpath}.${subwayId}`, oakAutoUnmount: true })), openStation && (_jsx(UpsertStation, { onClose: () => setStation(false), openStation: openStation, oakId: stationId, subwayId: subwayId, oakPath: `$subwayLine/upsertStation,${stationId}`, oakAutoUnmount: true }))] }));
}
