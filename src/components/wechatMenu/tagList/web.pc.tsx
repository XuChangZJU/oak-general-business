import React, { useState, useEffect } from 'react';
import { EntityDict } from "../../../oak-app-domain";
import { WebComponentProps } from 'oak-frontend-base';
import { Modal, Button, Table, Space, Upload, Form, Input } from 'antd';
import Style from './web.module.less';

export default function Render(
    props: WebComponentProps<
        EntityDict,
        'wechatPublicTag',
        true,
        {
            rows: EntityDict['wechatPublicTag']['Schema'][];
            getTag: (data: {id: string, name: string, wechatId: string}) => void;
        },
        {
        }
    >
) {
    const { rows, oakLoading, getTag } = props.data;
    const [selectedRowKeys, setSelectedRowKeys] = useState([] as string[]);
    return (
        <div className={Style.container}>
            <Table
                loading={oakLoading}
                dataSource={rows || []}
                rowKey="id"
                columns={[
                    {
                        dataIndex: 'text',
                        title: '标签名',
                    },
                ]}
                rowSelection={{
                    type: 'radio',
                    onSelect: (record) => {
                        getTag({id: record.id, name: record.text, wechatId: `${record.wechatId}`})
                    },
                    selectedRowKeys: selectedRowKeys,
                    onChange: (selectedRowKeys: any[]) => {
                        setSelectedRowKeys(selectedRowKeys)
                    }
                }}
                onRow={(record) => {
                    return {
                        onClick: () => {
                            setSelectedRowKeys([record.id]);
                            getTag({id: record.id, name: record.text, wechatId: `${record.wechatId}`})
                        }
                    }
                }}
                pagination={false}
            />
        </div>
    );
}

