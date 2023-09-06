import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useRef, useEffect } from 'react';
import TreeCell from '../treeCell';
import Styles from './web.pc.module.less';
import { Divider, Modal, Input, Form, Empty } from 'antd';
export default function Render(props) {
    const { rows, oakFullpath, parentId, onGrandChildEditArticleChange, show, getBreadcrumbItems, breadcrumbItems, drawerOpen, changeDrawerOpen, addOpen, changeAddOpen, selectedArticleId, defaultOpen, changeDefaultOpen, openArray, getTopInfo, articleId, articleMenuId, getSearchOpen, getSideInfo, currentArticle, setCurrentArticle } = props.data;
    const { t, createOne, removeItem, updateItem, execute, setMessage, getDefaultArticle, getSearchArticle } = props.methods;
    useEffect(() => {
        if (rows && rows.length > 0 && defaultOpen && !articleId) {
            const arr = getDefaultArticle(rows);
            changeDefaultOpen(false, arr);
            return;
        }
    }, [rows]);
    useEffect(() => {
        const fetchData = async () => {
            if (articleId) {
                const arr = await getSearchArticle();
                getSearchOpen(arr);
                return;
            }
        };
        fetchData();
    }, [articleId]);
    const [modal, contextHolder] = Modal.useModal();
    const menuNameRef = useRef(null);
    if (oakFullpath) {
        if (!show) {
            if (rows?.length > 0) {
                if (addOpen) {
                    modal.confirm({
                        title: '添加分类',
                        cancelText: '取消',
                        okText: '提交',
                        content: (_jsxs("div", { children: [_jsx(Form.Item, { label: '分类名称', children: _jsx(Input, { ref: menuNameRef }) }), _jsx("div", { style: {
                                        color: 'rgba(0, 0, 0, 0.45)',
                                        fontSize: '14px'
                                    }, children: _jsx("span", { children: "\u82E5\u9700\u8981\u521B\u5EFAFAQ\u6587\u6863\uFF0C\u5219\u8BF7\u5148\u521B\u5EFAFAQ\u6587\u6863\u6839\u76EE\u5F55\uFF0C\u540E\u7EED\u6DFB\u52A0FAQ\u6587\u7AE0\u8BF7\u5728FAQ\u6587\u6863\u6839\u76EE\u5F55\u4E0B\u8FDB\u884C\u3002" }) })] })),
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
                return (_jsxs("div", { className: Styles.container, children: [rows.map((ele, idx) => (_jsxs(_Fragment, { children: [_jsx(TreeCell, { onChildEditArticleChange: onGrandChildEditArticleChange, oakId: ele.id, oakPath: `${oakFullpath}.${ele.id}`, onRemove: () => {
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
                                    } }), _jsx(Divider, { style: { margin: 1 } })] }))), contextHolder] }));
            }
            else {
                if (addOpen) {
                    modal.confirm({
                        title: '添加分类',
                        cancelText: '取消',
                        okText: '提交',
                        content: (_jsxs("div", { children: [_jsx(Form.Item, { label: '分类名称', children: _jsx(Input, { ref: menuNameRef }) }), _jsx("div", { style: {
                                        color: 'rgba(0, 0, 0, 0.45)',
                                        fontSize: '14px'
                                    }, children: _jsx("span", { children: "\u82E5\u9700\u8981\u521B\u5EFAFAQ\u6587\u6863\uFF0C\u5219\u8BF7\u5148\u521B\u5EFAFAQ\u6587\u6863\u6839\u76EE\u5F55\uFF0C\u540E\u7EED\u6DFB\u52A0FAQ\u6587\u7AE0\u8BF7\u5728FAQ\u6587\u6863\u6839\u76EE\u5F55\u4E0B\u8FDB\u884C\u3002" }) })] })),
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
                return (_jsx("div", { children: contextHolder }));
            }
        }
        else {
            if (rows?.length > 0) {
                return (_jsxs("div", { className: Styles.container, children: [rows.map((ele, idx) => (_jsx(_Fragment, { children: _jsx(TreeCell, { onChildEditArticleChange: onGrandChildEditArticleChange, oakId: ele.id, oakPath: `${oakFullpath}.${ele.id}`, show: show, getBreadcrumbItemsByParent: getBreadcrumbItems, breadItems: breadcrumbItems, drawerOpen: drawerOpen, changeDrawerOpen: changeDrawerOpen, selectedArticleId: selectedArticleId, openArray: openArray ? openArray : undefined, articleId: articleId, articleMenuId: articleMenuId, getTopInfo: getTopInfo, getSideInfo: getSideInfo, currentArticle: currentArticle, setCurrentArticle: setCurrentArticle }) }))), contextHolder] }));
            }
            else {
                if (!parentId) {
                    return (_jsx(Empty, { image: Empty.PRESENTED_IMAGE_SIMPLE }));
                }
            }
        }
    }
    return null;
}
