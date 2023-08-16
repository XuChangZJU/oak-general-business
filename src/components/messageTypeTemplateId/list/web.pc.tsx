import { WebComponentProps } from "oak-frontend-base";
import { EntityDict } from '../../../oak-app-domain';
import * as React from 'react';
import { Table, Button, Space, Typography, Input, Select } from 'antd';
import Styles from './web.module.less';

export default function Render(props: WebComponentProps<
    EntityDict,
    'messageTypeTemplateId',
    true,
    {
        mttIds: EntityDict['messageTypeTemplateId']['OpSchema'][];
        dirtyIds: string[];
        messageTypes: string[];
        applicationId: string;
    },
    {

    }>) {

    const {
        oakPagination,
        mttIds = [],
        dirtyIds = [],
        oakLoading,
        messageTypes,
        applicationId,
    } = props.data;
    const { setCurrentPage, setPageSize, t, addItem,
        removeItem, updateItem, recoverItem, resetItem, execute } = props.methods;

    const { pageSize, total, currentPage } = oakPagination || {};

    return (
        <div className={Styles.container}>
            <Space>
                <Button
                    type="default"
                    onClick={() => {
                        addItem({
                            applicationId,
                        });
                    }}
                >
                    {t('common::action.create')}
                </Button>
                {
                    dirtyIds.length > 0 && (
                        <Button
                            type="primary"
                            onClick={() => {
                                execute();
                            }}
                        >
                            {t('common::action.confirm')}
                        </Button>
                    )
                }
            </Space>
            <Table
                loading={oakLoading}
                dataSource={mttIds}
                rowKey="id"
                columns={[
                    {
                        dataIndex: 'type',
                        title: '消息类型',
                        width: 180,
                        render: (value, record, index) => {
                            if (dirtyIds.includes(record.id) && !record.$$deleteAt$$) {
                                return (
                                    <Select
                                        style={{
                                            width: '100%',
                                        }}
                                        value={value}
                                        onChange={(e) => updateItem({
                                            type: e,
                                        }, record.id)}
                                        options={messageTypes.map(
                                            ele => ({
                                                value: ele,
                                                label: ele
                                            })
                                        )}
                                    />
                                );
                            }
                            return (
                                <Typography.Text
                                    type={!!record.$$deleteAt$$ ? 'danger' : undefined}
                                    delete={!!record.$$deleteAt$$}
                                >
                                    {value}
                                </Typography.Text>
                            );
                        },
                    },
                    {
                        dataIndex: 'templateId',
                        title: '模板消息Id',
                        width: 300,
                        render: (value, record, index) => {
                            if (dirtyIds.includes(record.id) && !record.$$deleteAt$$) {
                                return (
                                    <Input
                                        value={value}
                                        onChange={(e) => updateItem({
                                            templateId: e.target.value,
                                        }, record.id)}
                                    />
                                );
                            }
                            return (
                                <Typography.Text
                                    type={!!record.$$deleteAt$$ ? 'danger' : undefined}
                                    delete={!!record.$$deleteAt$$}
                                >
                                    {value}
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
                                    {
                                        !record.$$deleteAt$$ ? (
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
                                        )
                                    }
                                    {
                                        !record.$$deleteAt$$ && (!dirtyIds.includes(record.id) ? (
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
                                        ))
                                    }
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
        </div>);
}