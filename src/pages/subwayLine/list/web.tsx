import React, { useState } from 'react';
import { Button, Space, Tree, Row, Col, Tabs, Select } from 'antd';

import PageHeader from '../../../components/common/pageHeader';
import Style from './web.module.less';

import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../../general-app-domain';
import { DataNode } from 'antd/es/tree'
import UpsertSubway from '../upsertSubway';
import UpsertStation from '../upsertStation';


export default function Render(
    props: WebComponentProps<
        EntityDict,
        'subway',
        true,
        {
            treeData: DataNode[];
            areaId: string;
            areaOptions: { label: string; value: string }[];

        },
        {
            setAreaId: (areaId: string) => void;
            setFilterByAreaId: (areaId: string) => void;
        }
    >
) {
    const { data, methods } = props;
    const { oakFullpath, treeData, areaOptions, areaId } = data;
    const { t, setAreaId, setFilterByAreaId } = methods;
    const [openSubway, setSubway] = useState(false);
    const [openStation, setStation] = useState(false);
    const [subwayId, setSubwayId] = useState('');
    const [stationId, setStationId] = useState('');

    return (
        <PageHeader title="地铁线路管理">
            <div className={Style.container}>
                {/* <Space className={Style.space}>
                    <Button
                        type="primary"
                        onClick={() => {
                            goServiceUpsert();
                        }}
                    >
                        创建
                    </Button>
                </Space> */}
                <div>
                    点击切换城市： 
                    <Select
                        placeholder={'切换城市'}
                        value={areaId}
                        onChange={(value) => {
                            setAreaId(value);
                            setFilterByAreaId(value);
                        }}
                        style={{ width: '20%' }}
                        options={areaOptions}
                        allowClear
                    ></Select>
                </div>
                <Tree
                    className={Style.tree}
                    blockNode={true}
                    treeData={treeData}
                    titleRender={(nodeData) => {
                        return (

                            <Row align="middle" style={{ flex: 1 }}>
                                <Col flex="auto">
                                    {(nodeData as any).title}
                                </Col>

                                <Col flex="none">
                                    <Space>
                                        {!nodeData.isLeaf ? <Button
                                                                onClick={() =>
                                                                    {
                                                                        setSubwayId((nodeData as any).key)
                                                                        setSubway(true)
                                                                    }
                                                                }
                                                            >
                                                                编辑
                                                            </Button> : 
                                                            <Button
                                                                onClick={() =>
                                                                    {
                                                                        const index = (nodeData as any).key.indexOf('/') + 1;
                                                                        const temp = (nodeData as any).key.substr(index);
                                                                        setStationId(temp)
                                                                        setStation(true)
                                                                    }
                                                                }
                                                            >
                                                                编辑
                                                            </Button>
                                        }
                                        
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
                            </Row>
                        );
                    }}
                />
                {openSubway && (
                    <UpsertSubway
                        onClose={() => setSubway(false)}
                        openSubway={openSubway}
                        oakId={subwayId}
                        oakPath={`${oakFullpath}.${subwayId}`}
                        oakAutoUnmount={true}
                    />
                )}

                {openStation && (
                    <UpsertStation
                        onClose={() => setStation(false)}
                        openStation={openStation}
                        oakId={stationId}
                        subwayId={subwayId}
                        oakPath={`$subwayLine/upsertStation,${stationId}`}
                        oakAutoUnmount={true}
                    />
                )}
            </div>
            
        </PageHeader>
    );
}
