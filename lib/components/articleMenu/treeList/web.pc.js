"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const treeCell_1 = tslib_1.__importDefault(require("../treeCell"));
const web_pc_module_less_1 = tslib_1.__importDefault(require("./web.pc.module.less"));
const antd_1 = require("antd");
function Render(props) {
    const { rows, oakFullpath, parentId, onGrandChildEditArticleChange, show, getBreadcrumbItems, breadcrumbItems, drawerOpen, changeDrawerOpen, addOpen, changeAddOpen, selectedArticleId, defaultOpen, changeDefaultOpen, openArray, getTopInfo, articleId, articleMenuId, getSearchOpen, getSideInfo, currentArticle, setCurrentArticle } = props.data;
    const { t, createOne, removeItem, updateItem, execute, setMessage, getDefaultArticle, getSearchArticle } = props.methods;
    (0, react_1.useEffect)(() => {
        if (rows && rows.length > 0 && defaultOpen && !articleId) {
            const arr = getDefaultArticle(rows);
            changeDefaultOpen(false, arr);
            return;
        }
    }, [rows]);
    (0, react_1.useEffect)(() => {
        const fetchData = async () => {
            if (articleId) {
                const arr = await getSearchArticle();
                getSearchOpen(arr);
                return;
            }
        };
        fetchData();
    }, [articleId]);
    const [modal, contextHolder] = antd_1.Modal.useModal();
    const menuNameRef = (0, react_1.useRef)(null);
    if (oakFullpath) {
        if (!show) {
            if (rows?.length > 0) {
                if (addOpen) {
                    modal.confirm({
                        title: '添加分类',
                        cancelText: '取消',
                        okText: '提交',
                        content: ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: '分类名称', children: (0, jsx_runtime_1.jsx)(antd_1.Input, { ref: menuNameRef }) }), (0, jsx_runtime_1.jsx)("div", { style: {
                                        color: 'rgba(0, 0, 0, 0.45)',
                                        fontSize: '14px'
                                    }, children: (0, jsx_runtime_1.jsx)("span", { children: "\u82E5\u9700\u8981\u521B\u5EFAFAQ\u6587\u6863\uFF0C\u5219\u8BF7\u5148\u521B\u5EFAFAQ\u6587\u6863\u6839\u76EE\u5F55\uFF0C\u540E\u7EED\u6DFB\u52A0FAQ\u6587\u7AE0\u8BF7\u5728FAQ\u6587\u6863\u6839\u76EE\u5F55\u4E0B\u8FDB\u884C\u3002" }) })] })),
                        onOk: async () => {
                            const { value } = menuNameRef.current.input;
                            changeAddOpen(false);
                            if (!value) {
                                setMessage({
                                    type: 'warning',
                                    content: '请输入目录标题',
                                });
                            }
                            else {
                                await createOne(value);
                            }
                        },
                        onCancel: () => {
                            changeAddOpen(false);
                        }
                    });
                }
                return ((0, jsx_runtime_1.jsxs)("div", { className: web_pc_module_less_1.default.container, children: [rows.map((ele, idx) => ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(treeCell_1.default, { onChildEditArticleChange: onGrandChildEditArticleChange, oakId: ele.id, oakPath: `${oakFullpath}.${ele.id}`, onRemove: () => {
                                        modal.confirm({
                                            title: '请确认',
                                            content: '确认删除吗？',
                                            cancelText: '取消',
                                            okText: '确定',
                                            onOk: async () => {
                                                removeItem(ele.id);
                                                await execute();
                                            }
                                        });
                                    }, onUpdateName: async (name) => {
                                        updateItem({ name }, ele.id);
                                        await execute();
                                    } }), (0, jsx_runtime_1.jsx)(antd_1.Divider, { style: { margin: 1 } })] }))), contextHolder] }));
            }
            else {
                if (addOpen) {
                    modal.confirm({
                        title: '添加分类',
                        cancelText: '取消',
                        okText: '提交',
                        content: ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: '分类名称', children: (0, jsx_runtime_1.jsx)(antd_1.Input, { ref: menuNameRef }) }), (0, jsx_runtime_1.jsx)("div", { style: {
                                        color: 'rgba(0, 0, 0, 0.45)',
                                        fontSize: '14px'
                                    }, children: (0, jsx_runtime_1.jsx)("span", { children: "\u82E5\u9700\u8981\u521B\u5EFAFAQ\u6587\u6863\uFF0C\u5219\u8BF7\u5148\u521B\u5EFAFAQ\u6587\u6863\u6839\u76EE\u5F55\uFF0C\u540E\u7EED\u6DFB\u52A0FAQ\u6587\u7AE0\u8BF7\u5728FAQ\u6587\u6863\u6839\u76EE\u5F55\u4E0B\u8FDB\u884C\u3002" }) })] })),
                        onOk: async () => {
                            const { value } = menuNameRef.current.input;
                            changeAddOpen(false);
                            if (!value) {
                                setMessage({
                                    type: 'warning',
                                    content: '请输入目录标题',
                                });
                            }
                            else {
                                await createOne(value);
                            }
                        },
                        onCancel: () => {
                            changeAddOpen(false);
                        }
                    });
                }
                return ((0, jsx_runtime_1.jsx)("div", { children: contextHolder }));
            }
        }
        else {
            if (rows?.length > 0) {
                return ((0, jsx_runtime_1.jsxs)("div", { className: web_pc_module_less_1.default.container, children: [rows.map((ele, idx) => ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(treeCell_1.default, { onChildEditArticleChange: onGrandChildEditArticleChange, oakId: ele.id, oakPath: `${oakFullpath}.${ele.id}`, show: show, getBreadcrumbItemsByParent: getBreadcrumbItems, breadItems: breadcrumbItems, drawerOpen: drawerOpen, changeDrawerOpen: changeDrawerOpen, selectedArticleId: selectedArticleId, openArray: openArray ? openArray : undefined, articleId: articleId, articleMenuId: articleMenuId, getTopInfo: getTopInfo, getSideInfo: getSideInfo, currentArticle: currentArticle, setCurrentArticle: setCurrentArticle }) }))), contextHolder] }));
            }
            else {
                if (!parentId) {
                    return ((0, jsx_runtime_1.jsx)(antd_1.Empty, { image: antd_1.Empty.PRESENTED_IMAGE_SIMPLE }));
                }
            }
        }
    }
    return null;
}
exports.default = Render;
