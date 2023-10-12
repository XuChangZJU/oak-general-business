import React, { useState } from 'react';
import {
    Avatar,
    Space,
    Button,
    Input,
    Typography,
    DatePicker,
    Table,
    Modal,
} from 'antd';
const { confirm } = Modal;
import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../../../oak-app-domain';
import PageHeader from '../../../../components/common/pageHeader';
import Style from './web.module.less';
import dayjs from 'dayjs';
import WechatPublicTagUpsert from '../../../../components/wechatPublicTag/upsert';


export default function Render(
    props: WebComponentProps<
        EntityDict,
        'wechatPublicTag',
        true,
        {
            showBack: boolean;
            list: Partial<EntityDict['wechatPublicTag']['Schema']>[];
            applicationId: string;
        },
        {
            goDetail: (id: string) => void;
            goCreate: () => void;
            goUpdate: (id: string) => void;
            goDelete: (id: string) => void;
            sync: (id: string) => void;
            oneKeySync: () => void;
            deleteTag: (id: string) => void;
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
        oneKeySync,
        deleteTag,
        addItem,
        updateItem,
        execute,
    } = methods;
    const { list, showBack = true, oakLoading, oakPagination, applicationId } = data;

    const { pageSize, total, currentPage } = oakPagination || {};
    const [open, setOpen] = useState(false);
    const [oakId, setOakId] = useState('');
    const [tagName, setTagName] = useState('');
    const [text, setText] = useState('');
    const changeOpen = (open: boolean) => {
        setOpen(open);
    }
    const changeText = (text: string) => {
        setText(text);
    }
    const addTag = async () => {
        const id = addItem({
            applicationId,
            text,
            iState: 'wait',
        });
        await execute();
        sync(id);
    }
    const editTag = async () => {
        updateItem({
            text,
            iState: 'wait',
        }, oakId);
        await execute();
        sync(oakId);
    }

    return (
        <PageHeader title="微信公众号标签" showBack={showBack}>
            <div className={Style.container}>
                <Space style={{ marginBottom: 20 }}>
                    <Button
                        type="primary"
                        onClick={() => {
                            setOpen(true);
                            setOakId('');
                            setText('');
                        }}
                    >
                        添加TAG
                    </Button>
                    <Button onClick={async () => {
                        oneKeySync();
                    }}>
                        一键拉取
                    </Button>
                </Space>
                <WechatPublicTagUpsert
                    isUpdate={oakId ? true : false}
                    oakAutoUnmount={true}
                    open={open}
                    changeOpen={changeOpen}
                    changeText={changeText}
                    text={text}
                    tagName={tagName}
                    addTag={addTag}
                    editTag={editTag}
                />
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
                            width: 150,
                            ellipsis: true,
                        },
                        {
                            dataIndex: 'wechatId',
                            title: t('wechatPublicTag:attr.wechatId'),
                            width: 100,
                        },
                        {
                            dataIndex: 'iState',
                            title: '状态',
                            width: 100,
                            render: (value, record, index) => {
                                return value === 'wait' ? '待同步' : value === 'success' ? '同步成功' : '同步失败';
                            },
                        },
                        {
                            dataIndex: 'syncAt',
                            title: t('wechatPublicTag:attr.syncAt'),
                            width: 100,
                            render: (value, record, index) => {
                                return value ? dayjs(value).format('YYYY-MM-DD HH:mm') : '--';
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
                                                setOpen(true);
                                                setOakId(record.id!);
                                                setText(record.text!);
                                                setTagName(record.text!);
                                            }}
                                        >
                                            更新
                                        </Button>
                                        {
                                            (record.iState === 'fail' || record.iState === 'wait') && <Button
                                                type="link"
                                                onClick={() => {
                                                    sync(record.id!);
                                                }}
                                            >
                                                同步
                                            </Button>
                                        }
                                        <Button
                                            type="link"
                                            onClick={() => {
                                                const modal = confirm({
                                                    title: '确定删除该标签吗？',
                                                    content: '删除后不可恢复',
                                                    okText: '确定',
                                                    cancelText: '取消',
                                                    onOk: (e) => {
                                                        deleteTag(record.id!);
                                                        modal!.destroy();
                                                    },
                                                });
                                            }}
                                            danger
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
