import React from 'react';
import { Table, Tag, Button, Modal, Space, Row, Col, Input, } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
export default function render(props) {
    const { pagination, articles = [], oakLoading, searchValue, title, showBack = false, } = props.data;
    const { pageSize, total, currentPage } = pagination || {};
    const { t, goUpsert, goDetailById, goUpsertById, searchConfirm, searchValueChange, setCurrentPage, setPageSize, onRemove, } = props.methods;
    return (<>
            <Row>
                <Col flex="auto">
                    <Space>
                        <Button type="primary" onClick={() => {
            goUpsert();
        }}>
                            {t('action.add')}
                        </Button>
                    </Space>
                </Col>
                <Col flex="none">
                    <Input placeholder="请输入标题" value={searchValue} allowClear onChange={(e) => {
            searchValueChange(e.target.value);
        }} suffix={<SearchOutlined />} onPressEnter={(e) => {
            searchConfirm();
        }}/>
                </Col>
            </Row>

            <Table loading={oakLoading} dataSource={articles} rowKey="index" columns={[
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
                title: t('book:attr.iState'),
                render: (value, record, index) => {
                    return (<Tag color="processing">
                                    {t(`book:v.iState.${value}`)}
                                </Tag>);
                },
            },
            {
                dataIndex: 'title',
                title: t('article:attr.title'),
            },
            {
                dataIndex: 'author',
                title: t('article:attr.author'),
            },
            {
                dataIndex: 'abstract',
                title: t('article:attr.abstract'),
            },
            {
                dataIndex: 'op',
                width: 300,
                title: '操作',
                align: 'center',
                render: (value, record, index) => {
                    return (<Space>
                                    <Button type="link" onClick={() => {
                            goDetailById(record.id);
                        }}>
                                        详情
                                    </Button>
                                    <Button type="link" onClick={() => {
                            goUpsertById(record.id);
                        }}>
                                        编辑
                                    </Button>
                                    <Button type="link" onClick={() => {
                            const modal = Modal.confirm({
                                title: '确认删除该文章吗？',
                                content: '删除后，文章不可恢复',
                                okText: '确定',
                                cancelText: '取消',
                                onOk: async (e) => {
                                    onRemove(record.id);
                                    modal.destroy();
                                },
                                onCancel: (e) => {
                                    modal.destroy();
                                },
                            });
                        }}>
                                        删除
                                    </Button>
                                </Space>);
                },
                fixed: 'right',
            },
        ]} pagination={{
            total,
            pageSize,
            current: currentPage,
            onShowSizeChange: (current, pageSize) => {
                setPageSize(pageSize);
            },
            onChange: (current) => {
                setCurrentPage(current);
            },
        }}/>
        </>);
}
