import React, { useState } from 'react';
import { Table, Button, Avatar, Space, Tag, Modal, } from 'antd';
export default function Render(props) {
    const { oakPagination, users = [], entity, entityId, oakLoading, } = props.data;
    const { pageSize, total, currentPage } = oakPagination || {};
    const { goUpsert, t, setCurrentPage, setPageSize, confirmDelete, goUpdate, } = props.methods;
    const [idRemove, setIdRemove] = useState(undefined);
    const [inviteVisible, setInviteVisible] = useState(false);
    return (<>
            <Space style={{ marginBottom: 16 }}>
                <Button type="primary" onClick={() => goUpsert()}>
                    添加
                </Button>
                {/* <Button
                onClick={() => setInviteVisible(true)}
            >
                邀请记录
            </Button> */}
            </Space>

            <Table loading={oakLoading} rowKey="id" columns={[
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
                    return value ? (<Avatar src={value} shape="circle"/>) : (<span>未设置</span>);
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
                    return (<Space>
                                    {record.userRelation$user?.map((ele, index) => (<Tag key={index}>
                                                {ele.relation.name
                                ? t(entity +
                                    ':r.' +
                                    ele.relation.name)
                                : ele.relation.display}
                                            </Tag>))}
                                </Space>);
                },
            },
            {
                title: '操作',
                dataIndex: 'operate',
                render: (value, record, index) => {
                    return (<Space>
                                    <a onClick={(e) => goUpdate(record.id)}>
                                        {!!record.userRelation$user?.length
                            ? t('common::action.update')
                            : t('common::action.grant')}
                                    </a>
                                    {!!record.userRelation$user?.length && (<a style={{
                                color: 'var(--oak-color-error)',
                            }} onClick={() => setIdRemove(record.id)}>
                                            {t('common::action.revoke')}
                                        </a>)}
                                </Space>);
                },
            },
        ]} dataSource={users} pagination={{
            total,
            pageSize,
            current: currentPage,
            onShowSizeChange: (current, size) => {
                setPageSize(current);
            },
            onChange: (page, pageSize) => {
                setCurrentPage(page);
            },
        }}/>
            <Modal title={t('common::areYouSure')} open={!!idRemove} onOk={async () => {
            await confirmDelete(idRemove);
            setIdRemove(undefined);
        }} onCancel={() => setIdRemove(undefined)} cancelText={t('common::action.cancel')} okText={t('common::action.confirm')}>
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
        </>);
}
