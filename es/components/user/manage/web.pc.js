import React from 'react';
import { Table, Tag, Button, Space, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import FilterPanel from 'oak-frontend-base/es/components/filterPanel';
export default function Render(props) {
    const { methods, data } = props;
    const { t, setPageSize, setCurrentPage, goNewUser, onCellClicked } = methods;
    const { oakFullpath, oakLoading, oakPagination, userArr = [], stateColor, isRoot, } = data;
    const { pageSize, total, currentPage } = oakPagination || {};
    return (<>
            {isRoot && (<Space style={{ marginBottom: 16 }}>
                    <Button type="primary" onClick={() => {
                goNewUser();
            }}>
                        添加用户
                    </Button>
                </Space>)}

            <FilterPanel entity="user" oakPath={oakFullpath} columns={[
            {
                attr: 'nickname',
                op: '$includes',
            },
            {
                attr: 'name',
                op: '$includes',
            },
            {
                attr: 'userState',
            },
        ]}/>

            <Table loading={oakLoading} dataSource={userArr} rowKey="id" columns={[
            {
                dataIndex: 'id',
                title: '#',
                render: (value, record, index) => {
                    return index + 1;
                },
            },
            {
                width: 100,
                dataIndex: 'avatar',
                title: '头像',
                render: (value, record, index) => {
                    if (!value) {
                        return (<Avatar icon={<UserOutlined />}></Avatar>);
                    }
                    return <Avatar src={value} shape="circle"/>;
                },
            },
            {
                dataIndex: 'nickname',
                title: '昵称',
            },
            {
                dataIndex: 'name',
                title: '姓名',
            },
            {
                dataIndex: 'mobile',
                title: '手机号',
            },
            {
                dataIndex: 'userState',
                title: '状态',
                render: (value, record, index) => {
                    return (<Tag color={stateColor[value]}>
                                    {t(`user:v.userState.${value}`)}
                                </Tag>);
                },
            },
            {
                dataIndex: 'op',
                width: 200,
                title: '操作',
                align: 'center',
                render: (value, record, index) => {
                    return (<>
                                    <Button type="link" onClick={() => {
                            onCellClicked(record.id);
                        }}>
                                        详情
                                    </Button>
                                </>);
                },
                fixed: 'right',
            },
        ]} pagination={{
            total: total,
            pageSize: pageSize,
            current: currentPage,
            onShowSizeChange: (pageSize) => {
                setPageSize(pageSize);
            },
            onChange: (page) => {
                setCurrentPage(page);
            },
        }}/>
        </>);
}
