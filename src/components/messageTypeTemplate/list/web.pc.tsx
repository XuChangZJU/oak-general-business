import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../../oak-app-domain';
import React, { useState, useEffect, useRef } from 'react';
import { Table, Button, Space, Typography, Input, Select, Modal } from 'antd';

export default function Render(
    props: WebComponentProps<
        EntityDict,
        'messageTypeTemplate',
        true,
        {
            mtt: EntityDict['messageTypeTemplate']['Schema'][];
            wechatPublicTemplates: EntityDict['wechatPublicTemplate']['Schema'][];
            dirtyIds: string[];
            messageTypes: string[];
            applicationId: string;
        },
        {
            syncTemplate: () => Promise<void>;
        }
    >
) {
    const {
        oakPagination,
        mtt = [],
        dirtyIds = [],
        oakLoading,
        messageTypes = [],
        applicationId,
        wechatPublicTemplates = [],
    } = props.data;
    const {
        setCurrentPage,
        setPageSize,
        t,
        addItem,
        syncTemplate,
        removeItem,
        updateItem,
        recoverItem,
        resetItem,
        execute,
    } = props.methods;
    const [syncDisable, setSyncDisable] = useState(false);
    const [open, setOpen] = useState(false);

    const { pageSize, total, currentPage } = oakPagination || {};
    return (
        <>
            <Space>
                <Button
                    type="default"
                    disabled={
                        !(
                            messageTypes.length > 0 &&
                            wechatPublicTemplates.length > 0
                        )
                    }
                    onClick={() => {
                        addItem({
                            templateId: wechatPublicTemplates[0].id,
                        });
                    }}
                >
                    {t('common::action.create')}
                </Button>
                <Button
                    type="default"
                    disabled={syncDisable}
                    onClick={async () => {
                        setSyncDisable(true);
                        await syncTemplate();
                        setSyncDisable(false);
                    }}
                >
                    {'同步模板'}
                </Button>
                <Button
                    type="default"
                    onClick={async () => {
                        setOpen(true);
                    }}
                >
                    {'查看现有模板'}
                </Button>
                {dirtyIds.length > 0 && (
                    <Button
                        type="primary"
                        onClick={() => {
                            execute();
                        }}
                    >
                        {t('common::action.confirm')}
                    </Button>
                )}
            </Space>
            <Table
                loading={oakLoading}
                dataSource={mtt}
                rowKey="id"
                columns={[
                    {
                        dataIndex: 'type',
                        title: '消息类型',
                        width: 180,
                        render: (value, record, index) => {
                            if (
                                dirtyIds.includes(record.id) &&
                                !record.$$deleteAt$$
                            ) {
                                return (
                                    <Select
                                        style={{
                                            width: '100%',
                                        }}
                                        value={value}
                                        onChange={(e) =>
                                            updateItem(
                                                {
                                                    type: e,
                                                },
                                                record.id
                                            )
                                        }
                                        options={messageTypes.map((ele) => ({
                                            value: ele,
                                            label: ele,
                                        }))}
                                    />
                                );
                            }
                            return (
                                <Typography.Text
                                    type={
                                        !!record.$$deleteAt$$
                                            ? 'danger'
                                            : undefined
                                    }
                                    delete={!!record.$$deleteAt$$}
                                >
                                    {value}
                                </Typography.Text>
                            );
                        },
                    },
                    {
                        dataIndex: 'templateId',
                        title: '模板消息标题',
                        width: 300,
                        render: (value, record, index) => {
                            if (
                                dirtyIds.includes(record.id) &&
                                !record.$$deleteAt$$
                            ) {
                                return (
                                    <Select
                                        style={{
                                            width: '100%',
                                        }}
                                        value={value}
                                        onChange={(e) =>
                                            updateItem(
                                                {
                                                    type: e,
                                                },
                                                record.id
                                            )
                                        }
                                        options={wechatPublicTemplates.map(
                                            (ele) => ({
                                                value: ele.id,
                                                label: ele.title,
                                            })
                                        )}
                                    />
                                );
                            }
                            return (
                                <Typography.Text
                                    type={
                                        !!record.$$deleteAt$$
                                            ? 'danger'
                                            : undefined
                                    }
                                    delete={!!record.$$deleteAt$$}
                                >
                                    {record?.template?.title}
                                </Typography.Text>
                            );
                        },
                    },
                    {
                        dataIndex: 'op',
                        width: 200,
                        title: '操作',
                        align: 'center',
                        render: (value, record, index) => {
                            return (
                                <>
                                    {!record.$$deleteAt$$ ? (
                                        <Button
                                            type="link"
                                            danger
                                            onClick={() => {
                                                removeItem(record.id);
                                            }}
                                        >
                                            {t('common::action.remove')}
                                        </Button>
                                    ) : (
                                        <Button
                                            type="link"
                                            onClick={() => {
                                                recoverItem(record.id);
                                            }}
                                        >
                                            恢复
                                        </Button>
                                    )}
                                    {!record.$$deleteAt$$ &&
                                        (!dirtyIds.includes(record.id) ? (
                                            <Button
                                                type="link"
                                                onClick={() => {
                                                    updateItem({}, record.id);
                                                }}
                                            >
                                                {t('common::action.update')}
                                            </Button>
                                        ) : (
                                            <Button
                                                type="link"
                                                onClick={() => {
                                                    resetItem(record.id);
                                                }}
                                            >
                                                恢复
                                            </Button>
                                        ))}
                                </>
                            );
                        },
                        fixed: 'right',
                    },
                ]}
                pagination={{
                    total,
                    pageSize,
                    current: currentPage,
                    onShowSizeChange: (pageSize: number) => {
                        setPageSize(pageSize);
                    },
                    onChange: (current: number) => {
                        setCurrentPage(current);
                    },
                }}
            />
            <Modal
                title="模板列表"
                open={open}
                destroyOnClose={true}
                onCancel={() => {
                    setOpen(false);
                }}
                width={'80%'}
                footer={null}
            >
                <Table
                    dataSource={wechatPublicTemplates}
                    rowKey="id"
                    columns={[
                        {
                            dataIndex: 'title',
                            title: '消息标题',
                            width: 200,
                        },
                        {
                            dataIndex: 'wechatId',
                            title: '微信模板Id',
                            width: 300,
                        },
                    ]}
                />
            </Modal>
        </>
    );
}
