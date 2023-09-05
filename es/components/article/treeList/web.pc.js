import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import Styles from './web.pc.module.less';
import { Input, Button, Divider, Modal } from 'antd';
import { EditOutlined, MinusOutlined, CopyOutlined } from '@ant-design/icons';
import copy from 'copy-to-clipboard';
export default function Render(props) {
    const { rows, oakFullpath, onChildEditArticleChange, show, getBreadcrumbItemsByParent, breadcrumbItems, drawerOpen, changeDrawerOpen, selectedArticleId, openArray, getTopInfo, articleId, currentArticle, setCurrentArticle, } = props.data;
    const { t, setMessage, addItem, removeItem, updateItem, execute } = props.methods;
    const [modal, contextHolder] = Modal.useModal();
    const [nameEditing, setNameEditing] = useState('');
    const [name, setName] = useState(undefined);
    const [onlyOne, setOnlyOne] = useState(false);
    useEffect(() => {
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
    useEffect(() => {
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
                return (_jsxs("div", { children: [rows.map((ele, idx) => (_jsxs(_Fragment, { children: [_jsxs("div", { className: Styles.container, onClick: () => {
                                        onChildEditArticleChange(ele.id);
                                    }, children: [_jsx("div", { className: Styles.ne, children: nameEditing === ele.id ? _jsx("div", { className: Styles.name, children: _jsx(Input, { autoFocus: true, value: name !== undefined ? name : ele?.name, onChange: (evt) => setName(evt.target.value), onPressEnter: async () => {
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
                                                    } }) }) : _jsxs(_Fragment, { children: [_jsx(Button, { type: "text", icon: _jsx(EditOutlined, {}), size: "small", onClick: (e) => {
                                                            e.stopPropagation();
                                                            setNameEditing(ele.id);
                                                        }, style: { marginRight: 4 } }), _jsx("div", { className: Styles.name, children: _jsx("div", { style: { marginLeft: 4, overflow: 'hidden', width: '150px', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }, children: ele?.name }) })] }) }), _jsx(Divider, { type: "vertical", style: { height: '100%', marginTop: 4, marginBottom: 4 } }), _jsxs("div", { className: Styles.control, children: [_jsx(Button, { type: "text", icon: _jsx(CopyOutlined, {}), size: "small", onClick: (e) => {
                                                        e.stopPropagation();
                                                        const url = `${window.location.host}/article/detail?oakId=${ele.id}`;
                                                        copy(url);
                                                        setMessage({
                                                            content: '复制链接成功',
                                                            type: 'success',
                                                        });
                                                    } }), _jsx(Button, { type: "text", icon: _jsx(MinusOutlined, {}), size: "small", onClick: (e) => {
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
                                                    } })] })] }), _jsx(Divider, { style: { margin: 1 } })] }))), contextHolder] }));
            }
        }
        else {
            if (rows?.length > 0) {
                return (_jsxs("div", { children: [rows.map((ele, idx) => (_jsx(_Fragment, { children: _jsx("div", { className: Styles.test, onClick: () => {
                                    onChildEditArticleChange(ele.id);
                                    getBreadcrumbItemsByParent([...breadcrumbItems, ele.name]);
                                    changeDrawerOpen(!drawerOpen);
                                    getTopInfo({ name: ele.name, date: ele.$$createAt$$ });
                                }, children: _jsx("div", { className: Styles.ne, children: selectedArticleId === ele.id ? (_jsxs("div", { className: Styles.name, children: [_jsx("div", { className: Styles.dot }), _jsx("div", { className: Styles.title, children: ele?.name })] })) : (_jsxs("div", { className: Styles.name, children: [_jsx("div", { className: Styles.dot2 }), _jsx("div", { children: ele?.name })] })) }) }) }))), contextHolder] }));
            }
        }
    }
    return null;
}
