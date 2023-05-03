import React, { useState }  from 'react';
import { Checkbox, Button, Col, Tabs, Row, Space } from 'antd';
import type { CheckboxValueType } from 'antd/es/checkbox/Group';

import Style from './web.module.less';
import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../../general-app-domain';


export default function render(
    props: WebComponentProps<
        EntityDict,
        'area',
        true,
        {
            pagination: {
                pageSize: number;
                total: number;
                currentPage: number;
            };
            subways: EntityDict['subway']['Schema'][];
            areas: EntityDict['area']['Schema'][];
            stations: { label: string; value: string }[];
            subwayId: string;
            areaId: string;
        },
        {
            getStations: (subwayId: string) => void;
            getSubways: (areaId: string) => void;
        }
    >
) {
    const { data, methods } = props;
    const { t, getStations, getSubways } =
        methods;
    const { oakLoading, oakDirty, oakExecuting, subways, stations, subwayId, areaId, areas } = data;
    const [stationsList, setCheckedList] = useState<CheckboxValueType[]>([]);

    return (
        <div className={Style.container}>
            <Tabs
                style={{height: '40vh'}}
                tabPosition={'left'}
                type="card"
                defaultActiveKey={areaId}
                onChange={(value) => {
                    getSubways(value);
                }}
                items={areas?.map((ele) => ({
                    key: ele.id,
                    label: ele.name,
                    children: (
                        <Tabs
                            // type="card"
                            style={{height: '40vh'}}
                            tabPosition={'top'}
                            onChange={(value) => {
                                getStations(value);
                            }}
                            items={subways?.map((ele) => ({
                                key: ele.id,
                                label: ele.name,
                                children: (
                                    // <Checkbox.Group
                                    //     options={stations}
                                    // />
                                    <Checkbox.Group
                                        onChange={setCheckedList}
                                        value={stationsList}
                                    >
                                        <Row gutter={[0, 8]}>
                                            {stations?.map((ele: any) => {
                                                return (
                                                    <Col span={4}>
                                                        <Checkbox value={ele.value}>{ele.label}</Checkbox>
                                                    </Col>
                                                )
                                            })}
                                        </Row>
                                    </Checkbox.Group>
                                    
                                ),
                            }))}
                        ></Tabs>
                    ),
                }))}
            ></Tabs>
            <div style={{textAlign: 'center'}}>
                <Space>
                    <Button
                        // onClick={() => {
                        // }}
                    >
                        取消
                    </Button>
                    <Button
                        type="primary"
                        // onClick={async () => {
                        //     confirm();
                        // }}
                    >
                        确定
                    </Button>
                </Space>
            </div>
        </div>
    );
}
