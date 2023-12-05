import React, { useState } from 'react';
import { Space, Button, Table, Modal, Descriptions, } from 'antd';
const { confirm } = Modal;
import dayjs from 'dayjs';
import WechatPublicTagUpsert from '../upsert';
export default function Render(props) {
    const { data, methods } = props;
    const { t, setPageSize, setCurrentPage, goCreate, goDetail, goUpdate, goDelete, sync, oneKeySync, deleteTag, addItem, updateItem, execute, } = methods;
    const { list, showBack = true, oakLoading, oakPagination, applicationId } = data;
    const { pageSize, total, currentPage } = oakPagination || {};
    const [open, setOpen] = useState(false);
    const [detailOpen, setDetailOpen] = useState(false);
    const [oakId, setOakId] = useState('');
    const [tagName, setTagName] = useState('');
    const [text, setText] = useState('');
    const [tagInfo, setTagInfo] = useState({});
    const changeOpen = (open) => {
        setOpen(open);
    };
    const changeText = (text) => {
        setText(text);
    };
    const addTag = async () => {
        const id = addItem({
            applicationId,
            text,
            iState: 'wait',
        });
        await execute();
        sync(id);
    };
    const editTag = async () => {
        updateItem({
            text,
            iState: 'wait',
        }, oakId);
        await execute();
        sync(oakId);
    };
    return (<>
            <Space style={{ marginBottom: 20 }}>
                <Button type="primary" onClick={() => {
            setOpen(true);
            setOakId('');
            setText('');
        }}>
                    添加TAG
                </Button>
                <Button onClick={async () => {
            const modal = confirm({
                title: '确定一键拉取吗？',
                content: '一键拉取微信微信公众号tag可能会导致列表数据发生变化',
                okText: '确定',
                cancelText: '取消',
                onOk: (e) => {
                    oneKeySync();
                    modal.destroy();
                },
            });
        }}>
                    一键拉取
                </Button>
            </Space>
            <WechatPublicTagUpsert isUpdate={oakId ? true : false} oakAutoUnmount={true} open={open} changeOpen={changeOpen} changeText={changeText} text={text} tagName={tagName} addTag={addTag} editTag={editTag}/>
            <Modal title="标签详情" onCancel={() => setDetailOpen(false)} footer={null} open={detailOpen} width={800}>
                <Descriptions bordered column={3}>
                    <Descriptions.Item label="标签名">
                        {tagInfo.text}
                    </Descriptions.Item>
                    <Descriptions.Item label="微信端id">
                        {tagInfo.wechatId ? tagInfo.wechatId : '--'}
                    </Descriptions.Item>
                    <Descriptions.Item label="状态">
                        {tagInfo.iState === 'wait'
            ? '待同步'
            : tagInfo.iState === 'success'
                ? '同步成功'
                : '同步失败'}
                    </Descriptions.Item>
                    <Descriptions.Item label="同步时间">
                        {tagInfo.syncAt
            ? dayjs(tagInfo.syncAt).format('YYYY-MM-DD HH:mm')
            : '--'}
                    </Descriptions.Item>
                    <Descriptions.Item label="创建时间">
                        {dayjs(tagInfo.$$createAt$$).format('YYYY-MM-DD HH:mm')}
                    </Descriptions.Item>
                    <Descriptions.Item label="更新时间">
                        {dayjs(tagInfo.$$updateAt$$).format('YYYY-MM-DD HH:mm')}
                    </Descriptions.Item>
                </Descriptions>
            </Modal>
            <Table loading={oakLoading} dataSource={list} rowKey="id" columns={[
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
                    return value === 'wait'
                        ? '待同步'
                        : value === 'success'
                            ? '同步成功'
                            : '同步失败';
                },
            },
            {
                dataIndex: 'syncAt',
                title: t('wechatPublicTag:attr.syncAt'),
                width: 100,
                render: (value, record, index) => {
                    return value
                        ? dayjs(value).format('YYYY-MM-DD HH:mm')
                        : '--';
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
                    return (<>
                                    <Button type="link" onClick={() => {
                            setTagInfo(record);
                            setDetailOpen(true);
                        }}>
                                        详情
                                    </Button>
                                    {(!record.wechatId ||
                            ![0, 1, 2].includes(record.wechatId)) && (<Button type="link" onClick={() => {
                                setOpen(true);
                                setOakId(record.id);
                                setText(record.text);
                                setTagName(record.text);
                            }}>
                                            更新
                                        </Button>)}

                                    {(record.iState === 'fail' ||
                            record.iState === 'wait') && (<Button type="link" onClick={() => {
                                sync(record.id);
                            }}>
                                            同步
                                        </Button>)}
                                    <Button type="link" onClick={() => {
                            const modal = confirm({
                                title: '确定删除该标签吗？',
                                content: '删除后不可恢复',
                                okText: '确定',
                                cancelText: '取消',
                                onOk: (e) => {
                                    deleteTag(record.id);
                                    modal.destroy();
                                },
                            });
                        }} danger>
                                        删除
                                    </Button>
                                </>);
                },
                fixed: 'right',
            },
        ]} pagination={{
            total,
            pageSize,
            current: currentPage,
            onShowSizeChange: (pageSize) => {
                setPageSize(pageSize);
            },
            onChange: (current) => {
                setCurrentPage(current);
            },
        }}/>
        </>);
}
