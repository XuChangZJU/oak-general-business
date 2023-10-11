import React, { useState, useEffect } from 'react';
import { EntityDict } from "../../../oak-app-domain";
import { WebComponentProps } from 'oak-frontend-base';
import { Modal, Button, Table, Space, Tag, Descriptions, Image, Checkbox, Form } from 'antd';
import type { CheckboxValueType } from 'antd/es/checkbox/Group';
const { confirm } = Modal;
import Style from './web.module.less';
import dayjs from 'dayjs';
import UserWechatPublicTagList from '../list';
import FilterPanel from 'oak-frontend-base/src/components/filterPanel';

export default function Render(
    props: WebComponentProps<
        EntityDict,
        'wechatUser',
        true,
        {
            wechatUsers: {
                nickname: string,
                avatar: string,
                remark: string,
                openId: string,
                sync: boolean,
                syncAt: number,
                subscribedAt: number,
                tags: { id: string, text: string, wechatId: number }[],
            }[];
            tags: { label: string, value: string }[];
            applicationId: string;
        },
        {
            getTags: () => void;
            tagging: (tagIdList: number[], openId: string) => void;
            syncToLocale: (openId: string) => void;
        }
    >
) {
    const { wechatUsers, oakLoading, oakPagination, tags, applicationId, oakFullpath } = props.data;
    const { setPageSize, setCurrentPage, getTags, tagging, syncToLocale } = props.methods
    const { pageSize, total, currentPage } = oakPagination || {};
    const [open, setOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [editTags, setEditTags] = useState<number[]>([]);
    const [openId, setOpenId] = useState('');
    const [syncOpen, setSyncOpen] = useState(false);
    const [user, setUser] = useState({} as {
        nickname: string,
        avatar: string,
        remark: string,
        openId: string,
        sync: boolean,
        syncAt: number,
        subscribedAt: number,
        tags: { id: string, text: string }[],
    });
    console.log(editTags);
    return (
        <div className={Style.container}>
            <Modal
                title='给用户打标签'
                open={editOpen}
                onCancel={() => { setEditOpen(false); setEditTags([]); setOpenId('') }}
                footer={
                    <Space style={{ display: 'flex', justifyContent: 'center' }}>
                        <Button onClick={() => { setEditOpen(false); setEditTags([]); setOpenId('')}}>取消</Button>
                        <Button type='primary' onClick={() => {
                            setEditOpen(false);
                            setEditTags([]);
                            tagging(editTags, openId);
                            setOpenId('');
                        }}>确定</Button>
                    </Space>
                }
            >
                <Form.Item label='选择标签' required>
                    <Checkbox.Group
                        options={tags}
                        onChange={(values: CheckboxValueType[]) => {
                            setEditTags(values as number[])
                        }}
                        value={editTags}
                    />
                </Form.Item>
            </Modal>
            <Modal
                open={syncOpen}
                onCancel={() => {setSyncOpen(false); setOpenId('')}}
                footer={null}
                title="同步标签"
                width={800}
            >
                <UserWechatPublicTagList
                    oakAutoUnmount={true}
                    oakPath={`$wechatUser-userWechatPublcTag-list-${openId}`}
                    openId={openId}
                    applicationId={applicationId}
                />
            </Modal>
            <FilterPanel
                entity="wechatUser"
                oakPath={oakFullpath}
                columns={
                    [
                        {
                            attr: 'nickname',
                            op: '$includes',
                        },
                    ]
                }
            />
            <Table
                loading={oakLoading}
                dataSource={wechatUsers || []}
                rowKey="openId"
                columns={[
                    {
                        dataIndex: 'openId',
                        title: '用户标识',
                        width: 150,
                    },
                    {
                        dataIndex: 'sync',
                        title: '同步状态',
                        width: 100,
                        render: (value, record, index) => {
                            return value ? '同步' : '未同步'
                        }
                    },
                    {
                        dataIndex: 'tags',
                        title: '用户标签',
                        render: (value, record, index) => {
                            return <div>
                                {
                                    value && value.length > 0 ?
                                        value.map((ele: { id: string, text: string }) => {
                                            return <Tag>
                                                {
                                                    ele.text
                                                }
                                            </Tag>
                                        }) : '暂无标签'
                                }
                            </div>
                        }
                    },
                    {
                        dataIndex: 'op',
                        title: '操作',
                        width: 200,
                        render: (value, record, index) => {
                            return (
                                <>
                                    <Space>
                                        <Button
                                            type="link"
                                            onClick={() => {
                                                setOpen(true);
                                                setUser(record);
                                            }}
                                        >
                                            详情
                                        </Button>
                                        <Button
                                            type="link"
                                            onClick={() => {
                                                setEditOpen(true);
                                                getTags();
                                                const tagIdList = record.tags?.map((ele) => {
                                                    return ele.wechatId
                                                })
                                                setEditTags(tagIdList);
                                                setOpenId(record.openId);
                                            }}
                                        >
                                            打标签
                                        </Button>
                                        <Button
                                            type="link"
                                            onClick={() => {
                                                setSyncOpen(true);
                                                setOpenId(record.openId);
                                            }}
                                        >
                                            同步
                                        </Button>
                                        <Button
                                            type="link"
                                            onClick={() => {
                                                const modal = confirm({
                                                    title: '确定拉取吗？',
                                                    content: '拉取微信微信公众号用户标签可能会导致列表数据发生变化',
                                                    okText: '确定',
                                                    cancelText: '取消',
                                                    onOk: (e) => {
                                                        syncToLocale(record.openId);
                                                        modal!.destroy();
                                                    },
                                                });
                                            }}
                                        >
                                            拉取
                                        </Button>
                                    </Space>
                                </>
                            );
                        }
                    }
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
            <Modal
                title='用户详情'
                open={open}
                onCancel={() => {
                    setOpen(false);
                }}
                footer={null}
                width={750}
            >
                <Descriptions
                    bordered
                    column={3}
                >
                    <Descriptions.Item
                        label='昵称'
                    >
                        {user.nickname ? user.nickname : '--'}
                    </Descriptions.Item>
                    <Descriptions.Item
                        label='头像'
                    >
                        {
                            user.avatar ? <Image src={user.avatar} /> : '--'
                        }
                    </Descriptions.Item>
                    <Descriptions.Item
                        label='备注'
                    >
                        {user.remark ? user.remark : '--'}
                    </Descriptions.Item>
                    <Descriptions.Item
                        label='用户标识'
                    >
                        {user.openId ? user.openId : '--'}
                    </Descriptions.Item>
                    <Descriptions.Item
                        label='同步状态'
                    >
                        {user.sync ? '同步' : '未同步'}
                    </Descriptions.Item>
                    <Descriptions.Item
                        label='同步时间'
                    >
                        {user.syncAt ? dayjs(user.syncAt).format('YYYY-MM-DD HH:mm') : '--'}
                    </Descriptions.Item>
                    <Descriptions.Item
                        label='关注时间'
                    >
                        {user.subscribedAt ? dayjs(user.subscribedAt * 1000).format('YYYY-MM-DD HH:mm') : '--'}
                    </Descriptions.Item>
                    <Descriptions.Item
                        label='用户标签'
                    >
                        {
                            user.tags && user.tags.length > 0 ?
                                user.tags.map((tag) => {
                                    return <Tag>
                                        {tag.text}
                                    </Tag>
                                }) : '暂无标签'
                        }
                    </Descriptions.Item>
                </Descriptions>
            </Modal>
        </div>
    );
}

