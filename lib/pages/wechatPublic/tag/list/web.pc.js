"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const antd_1 = require("antd");
const { confirm } = antd_1.Modal;
const pageHeader_1 = tslib_1.__importDefault(require("../../../../components/common/pageHeader"));
const web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
const dayjs_1 = tslib_1.__importDefault(require("dayjs"));
const upsert_1 = tslib_1.__importDefault(require("../../../../components/wechatPublicTag/upsert"));
function Render(props) {
    const { data, methods } = props;
    const { t, setPageSize, setCurrentPage, goCreate, goDetail, goUpdate, goDelete, sync, oneKeySync, deleteTag, addItem, updateItem, execute, } = methods;
    const { list, showBack = true, oakLoading, oakPagination, applicationId } = data;
    const { pageSize, total, currentPage } = oakPagination || {};
    const [open, setOpen] = (0, react_1.useState)(false);
    const [oakId, setOakId] = (0, react_1.useState)('');
    const [tagName, setTagName] = (0, react_1.useState)('');
    const [text, setText] = (0, react_1.useState)('');
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
    return ((0, jsx_runtime_1.jsx)(pageHeader_1.default, { title: "\u5FAE\u4FE1\u516C\u4F17\u53F7\u6807\u7B7E", showBack: showBack, children: (0, jsx_runtime_1.jsxs)("div", { className: web_module_less_1.default.container, children: [(0, jsx_runtime_1.jsxs)(antd_1.Space, { style: { marginBottom: 20 }, children: [(0, jsx_runtime_1.jsx)(antd_1.Button, { type: "primary", onClick: () => {
                                setOpen(true);
                                setOakId('');
                                setText('');
                            }, children: "\u6DFB\u52A0TAG" }), (0, jsx_runtime_1.jsx)(antd_1.Button, { onClick: async () => {
                                oneKeySync();
                            }, children: "\u4E00\u952E\u62C9\u53D6" })] }), (0, jsx_runtime_1.jsx)(upsert_1.default, { isUpdate: oakId ? true : false, oakAutoUnmount: true, open: open, changeOpen: changeOpen, changeText: changeText, text: text, tagName: tagName, addTag: addTag, editTag: editTag }), (0, jsx_runtime_1.jsx)(antd_1.Table, { loading: oakLoading, dataSource: list, rowKey: "id", columns: [
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
                                return value ? (0, dayjs_1.default)(value).format('YYYY-MM-DD HH:mm') : '--';
                            },
                        },
                        {
                            dataIndex: '$$createAt$$',
                            title: '创建时间',
                            width: 100,
                            render: (value, record, index) => {
                                return (0, dayjs_1.default)(value).format('YYYY-MM-DD HH:mm');
                            },
                        },
                        {
                            dataIndex: '$$updateAt$$',
                            title: '更新时间',
                            width: 100,
                            render: (value, record, index) => {
                                return (0, dayjs_1.default)(value).format('YYYY-MM-DD HH:mm');
                            },
                        },
                        {
                            dataIndex: 'op',
                            width: 200,
                            title: '操作',
                            align: 'center',
                            render: (value, record, index) => {
                                return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(antd_1.Button, { type: "link", onClick: () => {
                                                goDetail(record.id);
                                            }, children: "\u8BE6\u60C5" }), (0, jsx_runtime_1.jsx)(antd_1.Button, { type: "link", onClick: () => {
                                                setOpen(true);
                                                setOakId(record.id);
                                                setText(record.text);
                                                setTagName(record.text);
                                            }, children: "\u66F4\u65B0" }), (record.iState === 'fail' || record.iState === 'wait') && (0, jsx_runtime_1.jsx)(antd_1.Button, { type: "link", onClick: () => {
                                                sync(record.id);
                                            }, children: "\u540C\u6B65" }), (0, jsx_runtime_1.jsx)(antd_1.Button, { type: "link", onClick: () => {
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
exports.default = Render;
