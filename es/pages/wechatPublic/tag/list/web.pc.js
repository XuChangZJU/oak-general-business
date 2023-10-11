import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { Space, Button, Table, Modal, } from 'antd';
const { confirm } = Modal;
import PageHeader from '../../../../components/common/pageHeader';
import Style from './web.module.less';
import dayjs from 'dayjs';
import WechatPublicTagUpsert from '../../../../components/wechatPublicTag/upsert';
export default function Render(props) {
    const { data, methods } = props;
    const { t, setPageSize, setCurrentPage, goCreate, goDetail, goUpdate, goDelete, sync, oneKeySync, deleteTag, addItem, updateItem, execute, } = methods;
    const { list, showBack = true, oakLoading, oakPagination, applicationId } = data;
    const { pageSize, total, currentPage } = oakPagination || {};
    const [open, setOpen] = useState(false);
    const [oakId, setOakId] = useState('');
    const [tagName, setTagName] = useState('');
    const [text, setText] = useState('');
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
    return (_jsx(PageHeader, { title: "\u5FAE\u4FE1\u516C\u4F17\u53F7\u6807\u7B7E", showBack: showBack, children: _jsxs("div", { className: Style.container, children: [_jsxs(Space, { style: { marginBottom: 20 }, children: [_jsx(Button, { type: "primary", onClick: () => {
                                setOpen(true);
                                setOakId('');
                                setText('');
                            }, children: "\u6DFB\u52A0TAG" }), _jsx(Button, { onClick: async () => {
                                oneKeySync();
                            }, children: "\u4E00\u952E\u62C9\u53D6" })] }), _jsx(WechatPublicTagUpsert, { isUpdate: oakId ? true : false, oakAutoUnmount: true, open: open, changeOpen: changeOpen, changeText: changeText, text: text, tagName: tagName, addTag: addTag, editTag: editTag }), _jsx(Table, { loading: oakLoading, dataSource: list, rowKey: "id", columns: [
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
                                return (_jsxs(_Fragment, { children: [_jsx(Button, { type: "link", onClick: () => {
                                                goDetail(record.id);
                                            }, children: "\u8BE6\u60C5" }), _jsx(Button, { type: "link", onClick: () => {
                                                setOpen(true);
                                                setOakId(record.id);
                                                setText(record.text);
                                                setTagName(record.text);
                                            }, children: "\u66F4\u65B0" }), (record.iState === 'fail' || record.iState === 'wait') && _jsx(Button, { type: "link", onClick: () => {
                                                sync(record.id);
                                            }, children: "\u540C\u6B65" }), _jsx(Button, { type: "link", onClick: () => {
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
                    } })] }) }));
}
