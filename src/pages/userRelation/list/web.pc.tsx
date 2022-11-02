import React from 'react';
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
import Style from './web.module.less';

export default function render(this: any) {
    const { pagination, users = [], oakLoading, idRemove } = this.state;
    const { relations, entity, entityId } = this.props;
    const { pageSize, total, currentPage } = pagination || {};

    return (
        <PageHeader title="权限列表">
            <div className={Style.container}>
                <Space>
                    <Button type="primary" onClick={() => this.goUpsert()}>
                        添加
                    </Button>
                </Space>

                <Table
                    loading={oakLoading}
                    ref={this.tableRef}
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
                            //   edit: {
                            //       component: Input,
                            //       props: {
                            //           clearable: true,
                            //           autofocus: true,
                            //           autoWidth: true,
                            //       },
                            //       rules: [
                            //           { required: true, message: '不能为空' },
                            //       ],
                            //       showEditIcon: false,
                            //   },
                        },
                        {
                            dataIndex: 'nickname',
                            title: '昵称',
                            //   edit: {
                            //       component: Input,
                            //       props: {
                            //           clearable: true,
                            //           autofocus: true,
                            //           autoWidth: true,
                            //       },
                            //       rules: [
                            //           { required: true, message: '不能为空' },
                            //       ],
                            //       showEditIcon: false,
                            //   },
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
                                                    {this.t(entity + ':r.' + ele)}
                                                </Tag>
                                            )
                                        )}
                                    </Space>
                                );
                            },

                            //   edit: {
                            //       component: Select,
                            //       // props, 透传全部属性到 Select 组件
                            //       // props 为函数时，参数有：col, row, rowIndex, colIndex, editedRow。一般用于实现编辑组件之间的联动
                            //       props: () => {
                            //           return {
                            //               multiple: true,
                            //               minCollapsedNum: 1,
                            //               autoWidth: true,
                            //               options:
                            //                   relationArr &&
                            //                   relationArr.map(
                            //                       (
                            //                           ele: any,
                            //                           index: number
                            //                       ) => ({
                            //                           value: ele,
                            //                           label: this.t(
                            //                               entity + ':r.' + ele
                            //                           ),
                            //                       })
                            //                   ),
                            //           };
                            //       },
                            //       showEditIcon: false,
                            //       rules: [
                            //           {
                            //               required: true,
                            //               message: '请至少选择一个权限',
                            //           },
                            //       ],
                            //   },
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
                                                this.goUpdate(record.id)
                                            }
                                        >
                                            编辑
                                        </Button>
                                        { record.relations?.length > 0 && <Button
                                            danger
                                            type="link"
                                            onClick={() => this.onDelete(record.id)}
                                        >
                                            删除
                                        </Button>}
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
                            this.setPageSize(current);
                        },
                        onChange: (page: number, pageSize: number) => {
                            this.setCurrentPage(page);
                        },
                    }}
                />
            </div>
            <Modal
                title="请确认"
                open={!!idRemove}
                onOk={() => this.confirmDelete()}
                onCancel={() => this.setState({ idRemove: ''})}
                cancelText="取消"
                okText="确认"
            >
                <p>确认删除用户的所有权限吗？</p>
            </Modal>
        </PageHeader>
    );
}
