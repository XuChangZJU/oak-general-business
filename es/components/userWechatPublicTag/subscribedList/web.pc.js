import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { Modal, Button, Table, Space, Tag, Descriptions, Image, Checkbox, Form } from 'antd';
const { confirm } = Modal;
import Style from './web.module.less';
import dayjs from 'dayjs';
import UserWechatPublicTagList from '../list';
import FilterPanel from 'oak-frontend-base/es/components/filterPanel';
export default function Render(props) {
    const { wechatUsers, oakLoading, oakPagination, tags, applicationId, oakFullpath } = props.data;
    const { setPageSize, setCurrentPage, getTags, tagging, syncToLocale } = props.methods;
    const { pageSize, total, currentPage } = oakPagination || {};
    const [open, setOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [editTags, setEditTags] = useState([]);
    const [openId, setOpenId] = useState('');
    const [syncOpen, setSyncOpen] = useState(false);
    const [user, setUser] = useState({});
    console.log(editTags);
    return (_jsxs("div", { className: Style.container, children: [_jsx(Modal, { title: '\u7ED9\u7528\u6237\u6253\u6807\u7B7E', open: editOpen, onCancel: () => { setEditOpen(false); setEditTags([]); setOpenId(''); }, footer: _jsxs(Space, { style: { display: 'flex', justifyContent: 'center' }, children: [_jsx(Button, { onClick: () => { setEditOpen(false); setEditTags([]); setOpenId(''); }, children: "\u53D6\u6D88" }), _jsx(Button, { type: 'primary', onClick: () => {
                                setEditOpen(false);
                                setEditTags([]);
                                tagging(editTags, openId);
                                setOpenId('');
                            }, children: "\u786E\u5B9A" })] }), children: _jsx(Form.Item, { label: '\u9009\u62E9\u6807\u7B7E', required: true, children: _jsx(Checkbox.Group, { options: tags, onChange: (values) => {
                            setEditTags(values);
                        }, value: editTags }) }) }), _jsx(Modal, { open: syncOpen, onCancel: () => { setSyncOpen(false); setOpenId(''); }, footer: null, title: "\u540C\u6B65\u6807\u7B7E", width: 800, children: _jsx(UserWechatPublicTagList, { oakAutoUnmount: true, oakPath: `$wechatUser-userWechatPublcTag-list-${openId}`, openId: openId, applicationId: applicationId }) }), _jsx(FilterPanel, { entity: "wechatUser", oakPath: oakFullpath, columns: [
                    {
                        attr: 'nickname',
                        op: '$includes',
                    },
                ] }), _jsx(Table, { loading: oakLoading, dataSource: wechatUsers || [], rowKey: "openId", columns: [
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
                            return value ? '同步' : '未同步';
                        }
                    },
                    {
                        dataIndex: 'tags',
                        title: '用户标签',
                        render: (value, record, index) => {
                            return _jsx("div", { children: value && value.length > 0 ?
                                    value.map((ele) => {
                                        return _jsx(Tag, { children: ele.text });
                                    }) : '暂无标签' });
                        }
                    },
                    {
                        dataIndex: 'op',
                        title: '操作',
                        width: 200,
                        render: (value, record, index) => {
                            return (_jsx(_Fragment, { children: _jsxs(Space, { children: [_jsx(Button, { type: "link", onClick: () => {
                                                setOpen(true);
                                                setUser(record);
                                            }, children: "\u8BE6\u60C5" }), _jsx(Button, { type: "link", onClick: () => {
                                                setEditOpen(true);
                                                getTags();
                                                const tagIdList = record.tags?.map((ele) => {
                                                    return ele.wechatId;
                                                });
                                                setEditTags(tagIdList);
                                                setOpenId(record.openId);
                                            }, children: "\u6253\u6807\u7B7E" }), _jsx(Button, { type: "link", onClick: () => {
                                                setSyncOpen(true);
                                                setOpenId(record.openId);
                                            }, children: "\u540C\u6B65" }), _jsx(Button, { type: "link", onClick: () => {
                                                const modal = confirm({
                                                    title: '确定拉取吗？',
                                                    content: '拉取微信微信公众号用户标签可能会导致列表数据发生变化',
                                                    okText: '确定',
                                                    cancelText: '取消',
                                                    onOk: (e) => {
                                                        syncToLocale(record.openId);
                                                        modal.destroy();
                                                    },
                                                });
                                            }, children: "\u62C9\u53D6" })] }) }));
                        }
                    }
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
                } }), _jsx(Modal, { title: '\u7528\u6237\u8BE6\u60C5', open: open, onCancel: () => {
                    setOpen(false);
                }, footer: null, width: 750, children: _jsxs(Descriptions, { bordered: true, column: 3, children: [_jsx(Descriptions.Item, { label: '\u6635\u79F0', children: user.nickname ? user.nickname : '--' }), _jsx(Descriptions.Item, { label: '\u5934\u50CF', children: user.avatar ? _jsx(Image, { src: user.avatar }) : '--' }), _jsx(Descriptions.Item, { label: '\u5907\u6CE8', children: user.remark ? user.remark : '--' }), _jsx(Descriptions.Item, { label: '\u7528\u6237\u6807\u8BC6', children: user.openId ? user.openId : '--' }), _jsx(Descriptions.Item, { label: '\u540C\u6B65\u72B6\u6001', children: user.sync ? '同步' : '未同步' }), _jsx(Descriptions.Item, { label: '\u540C\u6B65\u65F6\u95F4', children: user.syncAt ? dayjs(user.syncAt).format('YYYY-MM-DD HH:mm') : '--' }), _jsx(Descriptions.Item, { label: '\u5173\u6CE8\u65F6\u95F4', children: user.subscribedAt ? dayjs(user.subscribedAt * 1000).format('YYYY-MM-DD HH:mm') : '--' }), _jsx(Descriptions.Item, { label: '\u7528\u6237\u6807\u7B7E', children: user.tags && user.tags.length > 0 ?
                                user.tags.map((tag) => {
                                    return _jsx(Tag, { children: tag.text });
                                }) : '暂无标签' })] }) })] }));
}
