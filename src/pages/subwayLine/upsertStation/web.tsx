import React, { useState } from 'react';
import { Table, Tag, Button, Space, Input, Modal, Col, Row, Select, Tabs } from 'antd';

import PageHeader from '../../../components/common/pageHeader';
import dayjs from 'dayjs';
import Style from './web.module.less';

import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../../general-app-domain';

export default function Render(
    props: WebComponentProps<
        EntityDict,
        'station',
        false,
        {
            oakId: string,
            name: string,
            onClose: () => void;
            openStation: boolean;
            subwayId: string;
        },
        {}
    >
) {
    const { methods, data, } = props;
    const {
        t,
        } = methods;
    const {
        oakFullpath,
        oakId,
        name,
        openStation,
        onClose,
        subwayId,
    } = data;
    return (
        <div>
            <Modal
                title={oakId ? '编辑站点' : '新增站点'}
                open={openStation}
                destroyOnClose={true}
                okText="确定"
                cancelText="取消"
                onOk={async () => {

                    // if (!subwayId) {
                        // methods.update({ subwayId, });
                    // }
                    methods.execute();
                    onClose();
                }}
                onCancel={() => {
                    onClose();
                }}
            >
                <>
                    <Input
                        placeholder="请输入站点名称"
                        value={name}
                        onChange={({ target: { value } }) => {
                            methods.update({ name: value });
                        }}
                    />
                </>
            </Modal>
        </div>
    );
}
