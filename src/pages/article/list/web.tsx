import React from 'react';
import {
    Table,
    Tag,
    Button,
    Modal,
    Space,
    Row,
    Col,
    Input,
} from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import Style from './web.module.less';


export default function render(this: any) {
    const { pagination, articles = [], oakLoading, searchValue } = this.state;
    const { pageSize, total, currentPage } = pagination || {};

    return (
        <div className={Style.container}>
            <Row>
                <Col flex="auto">
                    <Space>
                        <Button
                            type="primary"
                            onClick={() => {
                                this.goUpsert();
                            }}
                        >
                            {this.t('action.add')}
                        </Button>
                    </Space>
                </Col>
                <Col flex="none">
                    <Input
                        placeholder="请输入书名"
                        value={searchValue}
                        allowClear
                        onChange={(e) => {
                            this.searchValueChange(e.target.value);
                        }}
                        suffix={<SearchOutlined />}
                        onPressEnter={(e) => {
                            this.searchConfirm();
                        }}
                    />
                </Col>
            </Row>

            <Table
                loading={oakLoading}
                dataSource={articles}
                rowKey="index"
                columns={[
                    {
                        align: 'center',
                        dataIndex: 'serial-number',
                        title: '序号',
                        render(value, record, index) {
                            return index + 1;
                        },
                    },
                    {
                        dataIndex: 'iState',
                        title: this.t('book:attr.iState'),
                        render: (value, record, index) => {
                            return (
                                <Tag color="processing">
                                    {this.t(`book:v.iState.${value}`)}
                                </Tag>
                            );
                        },
                    },
                    {
                        dataIndex: 'title',
                        title: this.t('article:attr.title'),
                    },
                    {
                        dataIndex: 'author',
                        title: this.t('article:attr.author'),
                    },
                    {
                        dataIndex: 'abstract',
                        title: this.t('article:attr.abstract'),
                    },
                    {
                        dataIndex: 'op',
                        width: 300,
                        title: '操作',
                        align: 'center',
                        render: (value, record, index) => {
                            return (
                                <Space>
                                    <Button
                                        type="link"
                                        onClick={() => {
                                            this.goDetailById(record.id);
                                        }}
                                    >
                                        详情
                                    </Button>
                                    <Button
                                        type="link"
                                        onClick={() => {
                                            this.goUpsertById(record.id);
                                        }}
                                    >
                                        编辑
                                    </Button>
                                    <Button
                                        type="link"
                                        onClick={() => {
                                            const modal = Modal!.confirm!({
                                                title: '确认删除该文章吗？',
                                                content: '删除后，文章不可恢复',
                                                okText: '确定',
                                                cancelText: '取消',
                                                onOk: async (e) => {
                                                    this.onRemove(record.id);
                                                    modal!.destroy!();
                                                },
                                                onCancel: (e) => {
                                                    modal!.destroy!();
                                                },
                                            });
                                        }}
                                    >
                                        删除
                                    </Button>
                                </Space>
                            );
                        },
                        fixed: 'right',
                    },
                ]}
                pagination={{
                    total,
                    pageSize,
                    current: currentPage,
                    onShowSizeChange: (current: number, pageSize: number) => {
                        this.setPageSize(pageSize);
                    },
                    onChange: (current: number) => {
                        this.setCurrentPage(current);
                    },
                }}
            />
        </div>
    );
}
