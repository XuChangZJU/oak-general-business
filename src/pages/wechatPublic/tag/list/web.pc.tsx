import React from 'react';
import {
    Avatar,
    Space,
    Button,
    Input,
    Typography,
    DatePicker,
    Table,
} from 'antd';
import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../../../oak-app-domain';
import PageHeader from '../../../../components/common/pageHeader';
import Style from './web.module.less';
import dayjs from 'dayjs';


export default function Render(
    props: WebComponentProps<
        EntityDict,
        'wechatPublicTag',
        true,
        {
            showBack: boolean;
            list: Partial<EntityDict['wechatPublicTag']['Schema']>[];
        },
        {
            goDetail: (id: string) => void;
            goCreate: () => void;
            goUpdate: (id: string) => void;
            goDelete: (id: string) => void;
            sync: (id: string) => void;
        }
    >
) {
    const { data, methods } = props;
    const {
        t,
        setPageSize,
        setCurrentPage,
        goCreate,
        goDetail,
        goUpdate,
        goDelete,
        sync,
    } = methods;
    const { list, showBack = true, oakLoading, oakPagination } = data;

    const { pageSize, total, currentPage } = oakPagination || {};

    return (
        <PageHeader title="微信公众号标签" showBack={showBack}>
            <div className={Style.container}>
                <Space>
                    <Button
                        type="primary"
                        onClick={() => {
                            goCreate();
                        }}
                    >
                        添加TAG
                    </Button>
                </Space>

                <Table
                    loading={oakLoading}
                    dataSource={list}
                    rowKey="id"
                    columns={[
                        {
                            dataIndex: '$$seq$$',
                            title: '序号',
                            width: 100,
                        },
                        {
                            dataIndex: 'text',
                            title: t('wechatPublicTag:attr.text'),
                            width: 200,
                            ellipsis: true,
                        },
                        {
                            dataIndex: 'wechatId',
                            title: t('wechatPublicTag:attr.wechatId'),
                            width: 100,
                        },
                        {
                            dataIndex: 'sync',
                            title: t('wechatPublicTag:attr.sync'),
                            width: 100,
                            render: (value, record, index) => {
                                return value ? '同步' : '未同步';
                            },
                        },
                        {
                            dataIndex: 'syncAt',
                            title: t('wechatPublicTag:attr.syncAt'),
                            width: 100,
                            render: (value, record, index) => {
                                return dayjs(value).format('YYYY-MM-DD HH:mm');
                            },
                        },
                        {
                            dataIndex: '$$createAt$$',
                            title: '创建时间',
                            width: 100,
                            render: (value, record, index) => {
                                return dayjs(value).format('YYYY-MM-DD HH:mm');
                            },
                        },
                        {
                            dataIndex: '$$updateAt$$',
                            title: '更新时间',
                            width: 100,
                            render: (value, record, index) => {
                                return dayjs(value).format('YYYY-MM-DD HH:mm');
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
                                        <Button
                                            type="link"
                                            onClick={() => {
                                                goDetail(record.id!);
                                            }}
                                        >
                                            详情
                                        </Button>
                                        <Button
                                            type="link"
                                            onClick={() => {
                                                goUpdate(record.id!);
                                            }}
                                        >
                                            更新
                                        </Button>
                                        {
                                            !record.sync && <Button
                                                type="link"
                                                onClick={() => {
                                                    sync(record.id!);
                                                }}
                                            >
                                                同步
                                            </Button>
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
            </div>
        </PageHeader>
    );
}
