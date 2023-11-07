import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
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
    return (_jsxs(_Fragment, { children: [_jsxs(Space, { style: { marginBottom: 20 }, children: [_jsx(Button, { type: "primary", onClick: () => {
                            setOpen(true);
                            setOakId('');
                            setText('');
                        }, children: "\u6DFB\u52A0TAG" }), _jsx(Button, { onClick: async () => {
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
                        }, children: "\u4E00\u952E\u62C9\u53D6" })] }), _jsx(WechatPublicTagUpsert, { isUpdate: oakId ? true : false, oakAutoUnmount: true, open: open, changeOpen: changeOpen, changeText: changeText, text: text, tagName: tagName, addTag: addTag, editTag: editTag }), _jsx(Modal, { title: "\u6807\u7B7E\u8BE6\u60C5", onCancel: () => setDetailOpen(false), footer: null, open: detailOpen, width: 800, children: _jsxs(Descriptions, { bordered: true, column: 3, children: [_jsx(Descriptions.Item, { label: "\u6807\u7B7E\u540D", children: tagInfo.text }), _jsx(Descriptions.Item, { label: "\u5FAE\u4FE1\u7AEFid", children: tagInfo.wechatId ? tagInfo.wechatId : '--' }), _jsx(Descriptions.Item, { label: "\u72B6\u6001", children: tagInfo.iState === 'wait'
                                ? '待同步'
                                : tagInfo.iState === 'success'
                                    ? '同步成功'
                                    : '同步失败' }), _jsx(Descriptions.Item, { label: "\u540C\u6B65\u65F6\u95F4", children: tagInfo.syncAt
                                ? dayjs(tagInfo.syncAt).format('YYYY-MM-DD HH:mm')
                                : '--' }), _jsx(Descriptions.Item, { label: "\u521B\u5EFA\u65F6\u95F4", children: dayjs(tagInfo.$$createAt$$).format('YYYY-MM-DD HH:mm') }), _jsx(Descriptions.Item, { label: "\u66F4\u65B0\u65F6\u95F4", children: dayjs(tagInfo.$$updateAt$$).format('YYYY-MM-DD HH:mm') })] }) }), _jsx(Table, { loading: oakLoading, dataSource: list, rowKey: "id", columns: [
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
                            return (_jsxs(_Fragment, { children: [_jsx(Button, { type: "link", onClick: () => {
                                            setTagInfo(record);
                                            setDetailOpen(true);
                                        }, children: "\u8BE6\u60C5" }), (!record.wechatId ||
                                        ![0, 1, 2].includes(record.wechatId)) && (_jsx(Button, { type: "link", onClick: () => {
                                            setOpen(true);
                                            setOakId(record.id);
                                            setText(record.text);
                                            setTagName(record.text);
                                        }, children: "\u66F4\u65B0" })), (record.iState === 'fail' ||
                                        record.iState === 'wait') && (_jsx(Button, { type: "link", onClick: () => {
                                            sync(record.id);
                                        }, children: "\u540C\u6B65" })), _jsx(Button, { type: "link", onClick: () => {
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
                                        }, danger: true, children: "\u5220\u9664" })] }));
                        },
                        fixed: 'right',
                    },
                ], pagination: {
                    total,
                    pageSize,
                    current: currentPage,
                    onShowSizeChange: (pageSize) => {
                        setPageSize(pageSize);
                    },
                    onChange: (current) => {
                        setCurrentPage(current);
                    },
                } })] }));
}
