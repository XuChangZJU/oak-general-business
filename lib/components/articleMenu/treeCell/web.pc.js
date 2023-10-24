"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const antd_1 = require("antd");
const icons_1 = require("@ant-design/icons");
const treeList_1 = tslib_1.__importDefault(require("../treeList"));
const treeList_2 = tslib_1.__importDefault(require("../../article/treeList"));
const web_pc_module_less_1 = tslib_1.__importDefault(require("./web.pc.module.less"));
const upload_1 = tslib_1.__importDefault(require("../../extraFile/upload"));
const commit_1 = tslib_1.__importDefault(require("../../extraFile/commit"));
function Render(props) {
    const { row, allowCreateSubArticle, allowCreateSubMenu, allowRemove, onRemove, onUpdateName, oakFullpath, logo, onChildEditArticleChange, editArticle, show, getBreadcrumbItemsByParent, breadItems, drawerOpen, changeDrawerOpen, selectedArticleId, openArray, getTopInfo, articleId, articleMenuId, getSideInfo, currentArticle, setCurrentArticle } = props.data;
    const { update, execute, createSubArticle, createSubArticleMenu, setMessage, gotoDoc } = props.methods;
    const [nameEditing, setNameEditing] = (0, react_1.useState)(false);
    (0, react_1.useEffect)(() => {
        if (editArticle.length > 0) {
            onChildEditArticleChange(editArticle);
        }
    }, [editArticle]);
    const [modal, contextHolder] = antd_1.Modal.useModal();
    const [name, setName] = (0, react_1.useState)('');
    const [showSub, setShowSub] = (0, react_1.useState)(false);
    const [newBreadcrumbItems, setNewBreadcrumbItems] = (0, react_1.useState)([]);
    const menuNameRef = (0, react_1.useRef)(null);
    const subMenuNameRef = (0, react_1.useRef)(null);
    const subArticleNameRef = (0, react_1.useRef)(null);
    const hasSubArticles = !allowCreateSubMenu;
    const hasSubMenus = !allowCreateSubArticle;
    const [onlyOne, setOnlyOne] = (0, react_1.useState)(false);
    (0, react_1.useEffect)(() => {
        if (openArray && openArray.length > 0 && row && !onlyOne) {
            if (openArray.includes(row.id)) {
                setShowSub(true);
                setNewBreadcrumbItems([...breadItems, row?.name]);
                setOnlyOne(true);
            }
        }
    }, [openArray, row]);
    (0, react_1.useEffect)(() => {
        if (row && !row.parentId && articleMenuId) {
            getSideInfo({ id: row.id, name: row.name, coverUrl: logo });
        }
        else {
            getSideInfo({ id: '', name: '帮助文档', coverUrl: '' });
        }
    }, [row]);
    if (oakFullpath && row) {
        if (!show) {
            const Sub = showSub && hasSubArticles ? ((0, jsx_runtime_1.jsx)(treeList_2.default, { onChildEditArticleChange: onChildEditArticleChange, articleMenuId: row.id, oakPath: `${oakFullpath}.article$articleMenu` })) : ((0, jsx_runtime_1.jsx)(treeList_1.default, { parentId: row.id, oakPath: `${oakFullpath}.articleMenu$parent`, entity: row.entity, entityId: row.entityId, onGrandChildEditArticleChange: onChildEditArticleChange }));
            const items = [];
            if (allowCreateSubArticle) {
                items.push({
                    key: 'allowCreateSubArticle',
                    label: ((0, jsx_runtime_1.jsx)("div", { className: web_pc_module_less_1.default.addAction, onClick: () => {
                            modal.confirm({
                                title: '输入文章标题',
                                cancelText: '取消',
                                okText: '提交',
                                content: ((0, jsx_runtime_1.jsx)(antd_1.Input, { ref: subArticleNameRef })),
                                onOk: async () => {
                                    const { value } = subArticleNameRef.current.input;
                                    if (!value) {
                                        setMessage({
                                            type: 'warning',
                                            content: '请输入文章标题',
                                        });
                                    }
                                    else {
                                        await createSubArticle(value);
                                        setShowSub(true);
                                    }
                                }
                            });
                        }, children: "\u6DFB\u52A0\u6587\u7AE0" }))
                });
            }
            if (allowCreateSubMenu) {
                items.push({
                    key: 'allowCreateSubMenu',
                    label: ((0, jsx_runtime_1.jsx)("div", { className: web_pc_module_less_1.default.addAction, onClick: () => {
                            modal.confirm({
                                title: '输入子分类标题',
                                cancelText: '取消',
                                okText: '提交',
                                content: ((0, jsx_runtime_1.jsx)(antd_1.Input, { ref: subMenuNameRef })),
                                onOk: async () => {
                                    const { value } = subMenuNameRef.current.input;
                                    if (!value) {
                                        setMessage({
                                            type: 'warning',
                                            content: '请输入分类标题',
                                        });
                                    }
                                    else {
                                        await createSubArticleMenu(value);
                                        setShowSub(true);
                                    }
                                }
                            });
                        }, children: "\u6DFB\u52A0\u5B50\u5206\u7C7B" }))
                });
            }
            return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("div", { className: web_pc_module_less_1.default.container, children: [(0, jsx_runtime_1.jsx)("div", { className: web_pc_module_less_1.default.ne, children: 
                                // nameEditing ? <div className={Styles.name}>
                                //     <Input
                                //         autoFocus
                                //         value={ name || row?.name}
                                //         onChange={(evt) => setName(evt.target.value)}
                                //         onPressEnter={async () => {
                                //             if (name && name !== row?.name) {
                                //                 await onUpdateName(name);
                                //             }
                                //             setNameEditing(false);
                                //         }}
                                //         onBlur={async () => {
                                //             if (name && name !== row?.name) {
                                //                 await onUpdateName(name);
                                //             }
                                //             setNameEditing(false);
                                //         }}
                                //     />
                                // </div> : 
                                (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(antd_1.Button, { type: "text", icon: (0, jsx_runtime_1.jsx)(icons_1.EditOutlined, {}), size: "small", onClick: () => {
                                                setNameEditing(true);
                                                const modalInstance = modal.confirm({
                                                    title: '编辑分类',
                                                    cancelText: '取消',
                                                    okText: '提交',
                                                    content: ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: "\u5206\u7C7B\u540D\u79F0", children: (0, jsx_runtime_1.jsx)(antd_1.Input, { ref: menuNameRef, defaultValue: row.name, onChange: (val) => update({ name: val.target.value }) }) }), (0, jsx_runtime_1.jsx)(antd_1.Form.Item, { label: "LOGO", help: (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("span", { children: "\u8BF7\u4E0A\u4F20LOGO\u9AD8\u6E05\u56FE\u7247\uFF0C" }), (0, jsx_runtime_1.jsx)("span", { children: "108*108\u50CF\u7D20\uFF0C\u4EC5\u652F\u6301PNG\u3001JPG\u683C\u5F0F\uFF0C\u5927\u5C0F\u4E0D\u8D85\u8FC7300KB\u3002" })] }), children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(upload_1.default, { oakPath: oakFullpath
                                                                            ? `${oakFullpath}.extraFile$entity$1`
                                                                            : undefined, type: "image", origin: "qiniu", tag1: "logo", entity: "articleMenu", accept: ".PNG, .JPG", maxNumber: 1 }) }) })] })),
                                                    // onOk: async () => {
                                                    //     if (menuNameRef.current!.input!.value) {
                                                    //         await onUpdateName(menuNameRef.current!.input!.value);
                                                    //     } else {
                                                    //         setMessage({
                                                    //             type: 'warning',
                                                    //             content: '请输入分类标题',
                                                    //         });
                                                    //     }
                                                    // }
                                                    footer: () => (0, jsx_runtime_1.jsxs)(antd_1.Space, { children: [(0, jsx_runtime_1.jsx)(commit_1.default, { oakPath: oakFullpath, efPaths: [
                                                                    'extraFile$entity$1',
                                                                ], afterCommit: () => {
                                                                    modalInstance.destroy();
                                                                }, beforeCommit: () => {
                                                                    if (menuNameRef.current.input.value) {
                                                                        return true;
                                                                    }
                                                                    else {
                                                                        return false;
                                                                    }
                                                                } }), (0, jsx_runtime_1.jsx)(antd_1.Button, { onClick: () => modalInstance.destroy(), children: "\u53D6\u6D88" })] })
                                                });
                                            }, style: { marginRight: 4 } }), (0, jsx_runtime_1.jsxs)("div", { className: web_pc_module_less_1.default.name, children: [logo ? ((0, jsx_runtime_1.jsx)(antd_1.Image, { height: 26, width: 26, src: logo, preview: false })) : null, (0, jsx_runtime_1.jsx)("div", { style: { marginLeft: 4, overflow: 'hidden', width: '100px', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }, children: row?.name })] })] }) }), (0, jsx_runtime_1.jsx)(antd_1.Divider, { type: "vertical", style: { height: '100%', marginTop: 4, marginBottom: 4 } }), (0, jsx_runtime_1.jsxs)("div", { className: web_pc_module_less_1.default.control, children: [!row.parentId && (0, jsx_runtime_1.jsx)(antd_1.Button, { type: "text", onClick: () => {
                                            gotoDoc(row?.id);
                                        }, icon: (0, jsx_runtime_1.jsx)(icons_1.EyeOutlined, {}) }), (0, jsx_runtime_1.jsx)(antd_1.Dropdown, { menu: { items }, placement: "bottomRight", arrow: true, children: (0, jsx_runtime_1.jsx)(antd_1.Button, { type: "text", icon: (0, jsx_runtime_1.jsx)(icons_1.PlusOutlined, {}), size: "small" }) }), (0, jsx_runtime_1.jsx)(antd_1.Button, { type: "text", icon: (0, jsx_runtime_1.jsx)(icons_1.MinusOutlined, {}), size: "small", onClick: () => {
                                            if (!allowRemove) {
                                                modal.error({
                                                    title: '无法删除',
                                                    content: hasSubArticles ? '请先删除目录下的文章' : '请先删除目录下的子目录',
                                                    okText: '确认'
                                                });
                                            }
                                            else {
                                                onRemove();
                                            }
                                        } }), (hasSubArticles || hasSubMenus) ? (showSub ?
                                        (0, jsx_runtime_1.jsx)(antd_1.Button, { type: "text", icon: (0, jsx_runtime_1.jsx)(icons_1.UpOutlined, {}), size: "small", onClick: () => setShowSub(false) }) :
                                        (0, jsx_runtime_1.jsx)(antd_1.Button, { type: "text", icon: (0, jsx_runtime_1.jsx)(icons_1.DownOutlined, {}), size: "small", onClick: () => setShowSub(true) })) : (0, jsx_runtime_1.jsx)("div", { className: web_pc_module_less_1.default.ph })] })] }), showSub && ((0, jsx_runtime_1.jsx)("div", { className: web_pc_module_less_1.default.sub, children: Sub })), contextHolder] }));
        }
        else {
            const Sub = showSub && hasSubArticles ? ((0, jsx_runtime_1.jsx)(treeList_2.default, { onChildEditArticleChange: onChildEditArticleChange, articleMenuId: row.id, oakPath: `${oakFullpath}.article$articleMenu`, show: show, getBreadcrumbItemsByParent: getBreadcrumbItemsByParent, breadcrumbItems: newBreadcrumbItems, drawerOpen: drawerOpen, changeDrawerOpen: changeDrawerOpen, selectedArticleId: selectedArticleId, openArray: openArray ? openArray : undefined, getTopInfo: getTopInfo, articleId: articleId, currentArticle: currentArticle, setCurrentArticle: setCurrentArticle })) : ((0, jsx_runtime_1.jsx)(treeList_1.default, { parentId: row.id, oakPath: `${oakFullpath}.articleMenu$parent`, onGrandChildEditArticleChange: onChildEditArticleChange, show: show, getBreadcrumbItems: getBreadcrumbItemsByParent, breadcrumbItems: newBreadcrumbItems, drawerOpen: drawerOpen, changeDrawerOpen: changeDrawerOpen, selectedArticleId: selectedArticleId, openArray: openArray ? openArray : undefined, getTopInfo: getTopInfo, articleId: articleId, currentArticle: currentArticle, setCurrentArticle: setCurrentArticle }));
            if (!row.parentId && articleMenuId) {
                return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("div", { children: Sub }), contextHolder] }));
            }
            else {
                return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("div", { className: web_pc_module_less_1.default.test, onClick: () => {
                                setShowSub(!showSub);
                                setNewBreadcrumbItems([...breadItems, row?.name]);
                            }, style: showSub ? { background: '#f5f5f5' } : { background: 'transparent' }, children: [(0, jsx_runtime_1.jsx)("div", { className: web_pc_module_less_1.default.ne, children: (0, jsx_runtime_1.jsxs)("div", { className: web_pc_module_less_1.default.name, children: [logo ? ((0, jsx_runtime_1.jsx)(antd_1.Image, { height: 26, width: 26, src: logo, preview: false, style: { marginRight: 4 } })) : null, (0, jsx_runtime_1.jsx)("div", { children: row?.name })] }) }), (0, jsx_runtime_1.jsx)("div", { className: web_pc_module_less_1.default.control, children: (hasSubArticles || hasSubMenus) ? (showSub ?
                                        (0, jsx_runtime_1.jsx)("div", { className: web_pc_module_less_1.default.downArrow }) :
                                        (0, jsx_runtime_1.jsx)("div", { className: web_pc_module_less_1.default.leftArrow })) : (0, jsx_runtime_1.jsx)("div", { className: web_pc_module_less_1.default.ph }) })] }), showSub && ((0, jsx_runtime_1.jsx)("div", { className: web_pc_module_less_1.default.sub3, style: { background: '#f5f5f5' }, children: Sub })), contextHolder] }));
            }
        }
    }
    return null;
}
exports.default = Render;
