"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const antd_1 = require("antd");
const { confirm } = antd_1.Modal;
const web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
const dayjs_1 = tslib_1.__importDefault(require("dayjs"));
const list_1 = tslib_1.__importDefault(require("../list"));
const filterPanel_1 = tslib_1.__importDefault(require("oak-frontend-base/es/components/filterPanel"));
function Render(props) {
    const { wechatUsers, oakLoading, oakPagination, tags, applicationId, oakFullpath } = props.data;
    const { setPageSize, setCurrentPage, getTags, tagging, syncToLocale } = props.methods;
    const { pageSize, total, currentPage } = oakPagination || {};
    const [open, setOpen] = (0, react_1.useState)(false);
    const [editOpen, setEditOpen] = (0, react_1.useState)(false);
    const [editTags, setEditTags] = (0, react_1.useState)([]);
    const [openId, setOpenId] = (0, react_1.useState)('');
    const [syncOpen, setSyncOpen] = (0, react_1.useState)(false);
    const [user, setUser] = (0, react_1.useState)({});
    return ((0, jsx_runtime_1.jsxs)("div", { className: web_module_less_1.default.container, children: [(0, jsx_runtime_1.jsx)(antd_1.Modal, { title: '\u7ED9\u7528\u6237\u6253\u6807\u7B7E', open: editOpen, onCancel: () => { setEditOpen(false); setEditTags([]); setOpenId(''); }, footer: (0, jsx_runtime_1.jsxs)(antd_1.Space, { style: { display: 'flex', justifyContent: 'center' }, children: [(0, jsx_runtime_1.jsx)(antd_1.Button, { onClick: () => { setEditOpen(false); setEditTags([]); setOpenId(''); }, children: "\u53D6\u6D88" }), (0, jsx_runtime_1.jsx)(antd_1.Button, { type: 'primary', onClick: () => {
                                setEditOpen(false);
                                setEditTags([]);
                                tagging(editTags, openId);
                                setOpenId('');
                            }, children: "\u786E\u5B9A" })] }), children: (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: '\u9009\u62E9\u6807\u7B7E', required: true, children: (0, jsx_runtime_1.jsx)(antd_1.Checkbox.Group, { options: tags, onChange: (values) => {
                            setEditTags(values);
                        }, value: editTags }) }) }), (0, jsx_runtime_1.jsx)(antd_1.Modal, { open: syncOpen, onCancel: () => { setSyncOpen(false); setOpenId(''); }, footer: null, title: "\u540C\u6B65\u6807\u7B7E", width: 800, children: (0, jsx_runtime_1.jsx)(list_1.default, { oakAutoUnmount: true, oakPath: `$wechatUser-userWechatPublcTag-list-${openId}`, openId: openId, applicationId: applicationId }) }), (0, jsx_runtime_1.jsx)(filterPanel_1.default, { entity: "wechatUser", oakPath: oakFullpath, columns: [
                    {
                        attr: 'nickname',
                        op: '$includes',
                    },
                ] }), (0, jsx_runtime_1.jsx)(antd_1.Table, { loading: oakLoading, dataSource: wechatUsers || [], rowKey: "openId", columns: [
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
                            return (0, jsx_runtime_1.jsx)("div", { children: value && value.length > 0 ?
                                    value.map((ele) => {
                                        return (0, jsx_runtime_1.jsx)(antd_1.Tag, { children: ele.text });
                                    }) : '暂无标签' });
                        }
                    },
                    {
                        dataIndex: 'op',
                        title: '操作',
                        width: 200,
                        render: (value, record, index) => {
                            return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsxs)(antd_1.Space, { children: [(0, jsx_runtime_1.jsx)(antd_1.Button, { type: "link", onClick: () => {
                                                setOpen(true);
                                                setUser(record);
                                            }, children: "\u8BE6\u60C5" }), (0, jsx_runtime_1.jsx)(antd_1.Button, { type: "link", onClick: () => {
                                                setEditOpen(true);
                                                getTags();
                                                const tagIdList = record.tags?.map((ele) => {
                                                    return ele.wechatId;
                                                });
                                                setEditTags(tagIdList);
                                                setOpenId(record.openId);
                                            }, children: "\u6253\u6807\u7B7E" }), (0, jsx_runtime_1.jsx)(antd_1.Button, { type: "link", onClick: () => {
                                                setSyncOpen(true);
                                                setOpenId(record.openId);
                                            }, children: "\u540C\u6B65" }), (0, jsx_runtime_1.jsx)(antd_1.Button, { type: "link", onClick: () => {
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
                } }), (0, jsx_runtime_1.jsx)(antd_1.Modal, { title: '\u7528\u6237\u8BE6\u60C5', open: open, onCancel: () => {
                    setOpen(false);
                }, footer: null, width: 750, children: (0, jsx_runtime_1.jsxs)(antd_1.Descriptions, { bordered: true, column: 3, children: [(0, jsx_runtime_1.jsx)(antd_1.Descriptions.Item, { label: '\u6635\u79F0', children: user.nickname ? user.nickname : '--' }), (0, jsx_runtime_1.jsx)(antd_1.Descriptions.Item, { label: '\u5934\u50CF', children: user.avatar ? (0, jsx_runtime_1.jsx)(antd_1.Image, { src: user.avatar }) : '--' }), (0, jsx_runtime_1.jsx)(antd_1.Descriptions.Item, { label: '\u7528\u6237\u6807\u8BC6', children: user.openId ? user.openId : '--' }), (0, jsx_runtime_1.jsx)(antd_1.Descriptions.Item, { label: '\u540C\u6B65\u72B6\u6001', children: user.sync ? '同步' : '未同步' }), (0, jsx_runtime_1.jsx)(antd_1.Descriptions.Item, { label: '\u540C\u6B65\u65F6\u95F4', children: user.syncAt ? (0, dayjs_1.default)(user.syncAt).format('YYYY-MM-DD HH:mm') : '--' }), (0, jsx_runtime_1.jsx)(antd_1.Descriptions.Item, { label: '\u5173\u6CE8\u65F6\u95F4', children: user.subscribedAt ? (0, dayjs_1.default)(user.subscribedAt * 1000).format('YYYY-MM-DD HH:mm') : '--' }), (0, jsx_runtime_1.jsx)(antd_1.Descriptions.Item, { label: '\u7528\u6237\u6807\u7B7E', children: user.tags && user.tags.length > 0 ?
                                user.tags.map((tag) => {
                                    return (0, jsx_runtime_1.jsx)(antd_1.Tag, { children: tag.text });
                                }) : '暂无标签' })] }) })] }));
}
exports.default = Render;
