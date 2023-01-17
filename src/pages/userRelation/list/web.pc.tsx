import React, { useState } from 'react';
import {
    Table,
    Input,
    Select,
    Button,
    Avatar,
    Space,
    Tag,
    Modal,
} from 'antd';
import PageHeader from '../../../components/common/pageHeader';
// import UserEntityGrantList from '../../../pages/userEntityGrant/list';

import Style from './web.module.less';
import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../../general-app-domain';

export default function Render(props: WebComponentProps<EntityDict, 'user', true, {
    users: any[];
    searchValue?: string;
    pagination: {
        pageSize: number;
        total: number;
        currentPage: number;
    },
    entity: string;
    entityId: string;
}, {
    goUpsert: () => void;
    goUpdate: (id: string) => void;
    confirmDelete: (id: string) => Promise<void>;
}>) {
    const { pagination, users = [], entity, entityId, oakLoading } = props.data;
    const { pageSize, total, currentPage } = pagination || {};
    const { goUpsert, t, setCurrentPage, setPageSize, confirmDelete, goUpdate } = props.methods;

    const [idRemove, setIdRemove] = useState(undefined as string | undefined);
    const [inviteVisible, setInviteVisible] = useState(false);

    return (
        <PageHeader title="权限列表">
            <div className={Style.container}>
                <Space>
                    <Button type="primary" onClick={() => goUpsert()}>
                        添加
                    </Button>
                    {/* <Button
                        onClick={() => setInviteVisible(true)}
                    >
                        邀请记录
                    </Button> */}
                </Space>

                <Table
                    loading={oakLoading}
                    rowKey="id"
                    columns={[
                        {
                            width: 100,
                            dataIndex: 'index',
                            title: '序号',
                            render: (value, record, index) => index + 1,
                        },
                        {
                            dataIndex: 'avatar',
                            title: '头像',
                            render: (value, record, index) => {
                                return value ? (
                                    <Avatar src={value} shape="circle" />
                                ) : (
                                    <span>未设置</span>
                                );
                            },
                        },
                        {
                            dataIndex: 'name',
                            title: '姓名',
                        },
                        {
                            dataIndex: 'nickname',
                            title: '昵称',
                        },
                        {
                            dataIndex: 'mobile',
                            title: '手机号',
                        },
                        {
                            dataIndex: 'relations',
                            title: '权限',
                            render: (value, record, index) => {
                                return (
                                    <Space>
                                        {record.relations?.map(
                                            (ele: string, index: number) => (
                                                <Tag key={index}>
                                                    {t(
                                                        entity + ':r.' + ele
                                                    )}
                                                </Tag>
                                            )
                                        )}
                                    </Space>
                                );
                            },
                        },
                        {
                            title: '操作',
                            dataIndex: 'operate',
                            render: (value, record, index) => {
                                return (
                                    <Space>
                                        <Button
                                            type="link"
                                            onClick={(e) =>
                                                goUpdate(record.id)
                                            }
                                        >
                                            {record.relations?.length > 0 ? t('common:action.update') : t('common:action.grant')}
                                        </Button>
                                        {
                                            record.relations?.length > 0 && (
                                                <Button
                                                    danger
                                                    type="link"
                                                    onClick={() => setIdRemove(record.id)}
                                                >
                                                    {t('common:action.revoke')}
                                                </Button>
                                            )
                                        }
                                    </Space>
                                );
                            },
                        },
                    ]}
                    dataSource={users}
                    pagination={{
                        total,
                        pageSize,
                        current: currentPage,
                        onShowSizeChange: (current: number, size: number) => {
                            setPageSize(current);
                        },
                        onChange: (page: number, pageSize: number) => {
                            setCurrentPage(page);
                        },
                    }}
                />
            </div>
            <Modal
                title={t('common:areYouSure')}
                open={!!idRemove}
                onOk={async () => {
                    await confirmDelete(idRemove!);
                    setIdRemove(undefined);
                }}
                onCancel={() => setIdRemove(undefined)}
                cancelText={t('common:action.cancel')}
                okText={t('common:action.confirm')}
            >
                <p>{t('confirmRevokeAll')}</p>
            </Modal>

            {/* <Modal
                title="邀请记录"
                open={inviteVisible}
                onCancel={() => setInviteVisible(false)}
                width="80%"
                footer={null}
            >
                <UserEntityGrantList
                    entity={entity}
                    entityId={entityId}
                    variant="dialog"
                    oakPath="$userRelation/list-userEntityGrant/list"
                />
            </Modal> */}
        </PageHeader>
    );
}
