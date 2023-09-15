"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const web_pc_module_less_1 = tslib_1.__importDefault(require("./web.pc.module.less"));
const antd_1 = require("antd");
const icons_1 = require("@ant-design/icons");
const copy_to_clipboard_1 = tslib_1.__importDefault(require("copy-to-clipboard"));
function Render(props) {
    const { rows, oakFullpath, onChildEditArticleChange, show, getBreadcrumbItemsByParent, breadcrumbItems, drawerOpen, changeDrawerOpen, selectedArticleId, openArray, getTopInfo, articleId, currentArticle, setCurrentArticle, } = props.data;
    const { t, setMessage, addItem, removeItem, updateItem, execute } = props.methods;
    const [modal, contextHolder] = antd_1.Modal.useModal();
    const [nameEditing, setNameEditing] = (0, react_1.useState)('');
    const [name, setName] = (0, react_1.useState)(undefined);
    const [onlyOne, setOnlyOne] = (0, react_1.useState)(false);
    (0, react_1.useEffect)(() => {
        if (openArray && openArray.length > 0 && rows && rows.length > 0 && !onlyOne) {
            rows.map((row) => {
                if (openArray.includes(row.id) && !articleId) {
                    onChildEditArticleChange(row.id);
                    getBreadcrumbItemsByParent([...breadcrumbItems, row.name]);
                    setOnlyOne(true);
                }
            });
        }
    }, [openArray, rows]);
    (0, react_1.useEffect)(() => {
        if (rows && rows.length > 0 && selectedArticleId) {
            const data = rows.find((ele) => ele.id === selectedArticleId);
            if (data) {
                getTopInfo({ name: data.name, date: data.$$createAt$$ });
            }
        }
    }, [selectedArticleId, rows]);
    if (articleId && rows && rows.length > 0) {
        rows.map((row) => {
            if (openArray.includes(row.id) && currentArticle !== row.id) {
                setCurrentArticle(row.id);
                getBreadcrumbItemsByParent([...breadcrumbItems, row.name]);
            }
        });
    }
    ;
    if (oakFullpath) {
        if (!show) {
            if (rows?.length > 0) {
                return ((0, jsx_runtime_1.jsxs)("div", { children: [rows.map((ele, idx) => ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("div", { className: web_pc_module_less_1.default.container, onClick: () => {
                                        onChildEditArticleChange(ele.id);
                                    }, children: [(0, jsx_runtime_1.jsx)("div", { className: web_pc_module_less_1.default.ne, children: nameEditing === ele.id ? (0, jsx_runtime_1.jsx)("div", { className: web_pc_module_less_1.default.name, children: (0, jsx_runtime_1.jsx)(antd_1.Input, { autoFocus: true, value: name !== undefined ? name : ele?.name, onChange: (evt) => setName(evt.target.value), onPressEnter: async () => {
                                                        if (name && name !== ele?.name) {
                                                            updateItem({ name }, ele.id);
                                                            await execute();
                                                        }
                                                        setNameEditing('');
                                                    }, onBlur: async () => {
                                                        if (name !== ele?.name) {
                                                            updateItem({ name }, ele.id);
                                                            await execute();
                                                        }
                                                        setNameEditing('');
                                                    } }) }) : (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(antd_1.Button, { type: "text", icon: (0, jsx_runtime_1.jsx)(icons_1.EditOutlined, {}), size: "small", onClick: (e) => {
                                                            e.stopPropagation();
                                                            setNameEditing(ele.id);
                                                        }, style: { marginRight: 4 } }), (0, jsx_runtime_1.jsx)("div", { className: web_pc_module_less_1.default.name, children: (0, jsx_runtime_1.jsx)("div", { style: { marginLeft: 4, overflow: 'hidden', width: '150px', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }, children: ele?.name }) })] }) }), (0, jsx_runtime_1.jsx)(antd_1.Divider, { type: "vertical", style: { height: '100%', marginTop: 4, marginBottom: 4 } }), (0, jsx_runtime_1.jsxs)("div", { className: web_pc_module_less_1.default.control, children: [(0, jsx_runtime_1.jsx)(antd_1.Button, { type: "text", icon: (0, jsx_runtime_1.jsx)(icons_1.CopyOutlined, {}), size: "small", onClick: (e) => {
                                                        e.stopPropagation();
                                                        const url = `${window.location.host}/article/detail?oakId=${ele.id}`;
                                                        (0, copy_to_clipboard_1.default)(url);
                                                        setMessage({
                                                            content: '复制链接成功',
                                                            type: 'success',
                                                        });
                                                    } }), (0, jsx_runtime_1.jsx)(antd_1.Button, { type: "text", icon: (0, jsx_runtime_1.jsx)(icons_1.MinusOutlined, {}), size: "small", onClick: (e) => {
                                                        e.stopPropagation();
                                                        modal.confirm({
                                                            title: '请确认',
                                                            content: '确认删除吗？',
                                                            okText: '确定',
                                                            cancelText: '取消',
                                                            onOk: async () => {
                                                                onChildEditArticleChange('');
                                                                removeItem(ele.id);
                                                                await execute();
                                                            }
                                                        });
                                                    } })] })] }), (0, jsx_runtime_1.jsx)(antd_1.Divider, { style: { margin: 1 } })] }))), contextHolder] }));
            }
        }
        else {
            if (rows?.length > 0) {
                return ((0, jsx_runtime_1.jsxs)("div", { children: [rows.map((ele, idx) => ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)("div", { className: web_pc_module_less_1.default.test, onClick: () => {
                                    onChildEditArticleChange(ele.id);
                                    getBreadcrumbItemsByParent([...breadcrumbItems, ele.name]);
                                    changeDrawerOpen(!drawerOpen);
                                    getTopInfo({ name: ele.name, date: ele.$$createAt$$ });
                                }, children: (0, jsx_runtime_1.jsx)("div", { className: web_pc_module_less_1.default.ne, children: selectedArticleId === ele.id ? ((0, jsx_runtime_1.jsxs)("div", { className: web_pc_module_less_1.default.name, children: [(0, jsx_runtime_1.jsx)("div", { className: web_pc_module_less_1.default.dot }), (0, jsx_runtime_1.jsx)("div", { className: web_pc_module_less_1.default.title, children: ele?.name })] })) : ((0, jsx_runtime_1.jsxs)("div", { className: web_pc_module_less_1.default.name, children: [(0, jsx_runtime_1.jsx)("div", { className: web_pc_module_less_1.default.dot2 }), (0, jsx_runtime_1.jsx)("div", { children: ele?.name })] })) }) }) }))), contextHolder] }));
            }
        }
    }
    return null;
}
exports.default = Render;
