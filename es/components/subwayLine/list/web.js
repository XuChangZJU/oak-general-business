import React, { useState } from 'react';
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
    return (<>
            <div>
                点击切换城市：
                <Select placeholder={'切换城市'} value={areaId} onChange={(value) => {
            setAreaId(value);
            setFilterByAreaId(value);
        }} style={{ width: '20%' }} options={areaOptions} allowClear></Select>
            </div>
            <Tree className={Style.tree} blockNode={true} treeData={treeData} titleRender={(nodeData) => {
            return (<Row align="middle" style={{ flex: 1 }}>
                            <Col flex="auto">{nodeData.title}</Col>

                            <Col flex="none">
                                <Space>
                                    {!nodeData.isLeaf ? (<Button onClick={() => {
                        setSubwayId(nodeData.key);
                        setSubway(true);
                    }}>
                                            编辑
                                        </Button>) : (<Button onClick={() => {
                        const index = nodeData.key.indexOf('/') + 1;
                        const temp = nodeData.key.substr(index);
                        setStationId(temp);
                        setStation(true);
                    }}>
                                            编辑
                                        </Button>)}

                                    {/* {!nodeData.isLeaf && (
                        <Button
                            onClick={() =>
                                {
                                    setSubwayId((nodeData as any).key)
                                    setStation(true)
                                }
                            }
                        >
                            添加站点
                        </Button>
                        // <Button
                        //     type="primary"
                        //     onClick={() =>
                        //         goServiceUpsert(
                        //             nodeData!
                        //                 .key as string
                        //         )
                        //     }
                        // >
                        //     添加站点
                        // </Button>
                    )} */}
                                </Space>
                            </Col>
                        </Row>);
        }}/>
            {openSubway && (<UpsertSubway onClose={() => setSubway(false)} openSubway={openSubway} oakId={subwayId} oakPath={`${oakFullpath}.${subwayId}`} oakAutoUnmount={true}/>)}

            {openStation && (<UpsertStation onClose={() => setStation(false)} openStation={openStation} oakId={stationId} subwayId={subwayId} oakPath={`$subwayLine/upsertStation,${stationId}`} oakAutoUnmount={true}/>)}
        </>);
}
