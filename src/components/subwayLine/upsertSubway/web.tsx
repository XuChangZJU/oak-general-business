import React, { useState } from 'react';
import { Table, Tag, Button, Space, Input, Modal, Col, Row, Select, Tabs } from 'antd';

import PageHeader from '../../../components/common/pageHeader';
import dayjs from 'dayjs';
import Style from './web.module.less';

import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../../oak-app-domain';

export default function Render(
    props: WebComponentProps<
        EntityDict,
        'subway',
        false,
        {
            oakId: string,
            name: string,
            onClose: () => void;
            openSubway: boolean;
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
        openSubway,
        onClose,
    } = data;
    return (
        <div>
            <Modal
                title={oakId ? '编辑地铁' : '新增地铁'}
                open={openSubway}
                destroyOnClose={true}
                okText="确定"
                cancelText="取消"
                onOk={async () => {
                    methods.execute();
                    onClose();
                }}
                onCancel={() => {
                    onClose();
                }}
            >
                <>
                    <Input
                        placeholder="请输入线路名称"
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
