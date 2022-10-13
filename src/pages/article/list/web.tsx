import React from 'react';
import {
    Table,
    Tag,
    Button,
    DialogPlugin,
    Space,
    List,
    Image,
    Row,
    Col,
    Input,
} from 'tdesign-react';
import { Icon } from 'tdesign-icons-react';
import Style from './web.module.less';

const { ListItem, ListItemMeta } = List;

export default function render(this: any) {
    const { width } = this.props;
    const { pagination, articles = [], oakLoading, searchValue } = this.state;
    const { pageSize, total, currentPage } = pagination || {};

    return (
        <div className={Style.container}>
            <Row>
                <Col xs={12} sm={8}>
                    <Space>
                        <Button
                            size="medium"
                            theme="primary"
                            onClick={() => {
                                this.goUpsert();
                            }}
                        >
                            {this.t('action.add')}
                        </Button>
                    </Space>
                </Col>
                <Col xs={12} sm={4}>
                    <Input
                        placeholder="请输入书名"
                        value={searchValue}
                        clearable
                        onChange={(value) => {
                            this.searchValueChange(value);
                        }}
                        onClear={() => {
                            this.searchCancel();
                            this.searchConfirm();
                        }}
                        suffix={<Icon name="search" />}
                        onEnter={(value, { e }) => {
                            this.searchConfirm();
                        }}
                    />
                </Col>
            </Row>

            <Table
                loading={oakLoading}
                data={articles}
                rowKey="index"
                columns={[
                    {
                        align: 'center',
                        colKey: 'index',
                        title: '序号',
                    },
                    {
                        colKey: 'iState',
                        title: this.t('book:attr.iState'),
                        cell: ({ row, rowIndex }) => {
                            return (
                                <Tag theme="primary" size="small">
                                    {this.t(`book:v.iState.${row.iState}`)}
                                </Tag>
                            );
                        },
                    },
                    {
                        colKey: 'title',
                        title: this.t('article:attr.title'),
                    },
                    {
                        colKey: 'author',
                        title: this.t('article:attr.author'),
                    },
                    {
                        colKey: 'abstract',
                        title: this.t('article:attr.abstract'),
                    },
                    {
                        colKey: 'op',
                        width: 300,
                        title: '操作',
                        align: 'center',
                        cell: ({ row }) => {
                            return (
                                <>
                                    <Button
                                        theme="primary"
                                        variant="text"
                                        onClick={() => {
                                            this.goDetailById(row.id);
                                        }}
                                    >
                                        详情
                                    </Button>
                                    <Button
                                        theme="primary"
                                        variant="text"
                                        onClick={() => {
                                            this.goUpsertById(row.id);
                                        }}
                                    >
                                        编辑
                                    </Button>
                                    <Button
                                        theme="primary"
                                        variant="text"
                                        onClick={() => {
                                            const confirmDia = DialogPlugin!
                                                .confirm!({
                                                header: '确认删除该文章吗？',
                                                body: '删除后，文章不可恢复',
                                                confirmBtn: '确定',
                                                cancelBtn: '取消',
                                                onConfirm: async ({ e }) => {
                                                    this.onRemove(row.id);
                                                    confirmDia!.hide!();
                                                },
                                                onClose: ({ e, trigger }) => {
                                                    confirmDia!.hide!();
                                                },
                                            });
                                        }}
                                    >
                                        删除
                                    </Button>
                                </>
                            );
                        },
                        fixed: 'right',
                    },
                ]}
                pagination={{
                    total: total,
                    pageSize: pageSize,
                    current: currentPage,
                    onPageSizeChange: (pageSize: number) => {
                        this.setPageSize(pageSize);
                    },
                    onCurrentChange: (current) => {
                        this.setCurrentPage(current);
                    },
                }}
            />
        </div>
    );
}
