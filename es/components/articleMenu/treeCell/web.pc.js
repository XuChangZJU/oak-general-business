import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useRef, useEffect } from 'react';
import { Input, Button, Dropdown, Divider, Modal, Form, Image, Space } from 'antd';
import { EditOutlined, DownOutlined, UpOutlined, MinusOutlined, PlusOutlined, EyeOutlined } from '@ant-design/icons';
import ArticleMenuTreeList from '../treeList';
import ArticleTreeList from '../../article/treeList';
import Styles from './web.pc.module.less';
import ExtraFileUpload from '../../extraFile/upload';
import ExtraFileCommit from '../../extraFile/commit';
export default function Render(props) {
    const { row, allowCreateSubArticle, allowCreateSubMenu, allowRemove, onRemove, onUpdateName, oakFullpath, logo, onChildEditArticleChange, editArticle, show, getBreadcrumbItemsByParent, breadItems, drawerOpen, changeDrawerOpen, selectedArticleId, openArray, getTopInfo, articleId, articleMenuId, getSideInfo, currentArticle, setCurrentArticle } = props.data;
    const { update, execute, createSubArticle, createSubArticleMenu, setMessage, gotoDoc } = props.methods;
    const [nameEditing, setNameEditing] = useState(false);
    useEffect(() => {
        if (editArticle.length > 0) {
            onChildEditArticleChange(editArticle);
        }
    }, [editArticle]);
    const [modal, contextHolder] = Modal.useModal();
    const [name, setName] = useState('');
    const [showSub, setShowSub] = useState(false);
    const [newBreadcrumbItems, setNewBreadcrumbItems] = useState([]);
    const menuNameRef = useRef(null);
    const subMenuNameRef = useRef(null);
    const subArticleNameRef = useRef(null);
    const hasSubArticles = !allowCreateSubMenu;
    const hasSubMenus = !allowCreateSubArticle;
    const [onlyOne, setOnlyOne] = useState(false);
    useEffect(() => {
        if (openArray && openArray.length > 0 && row && !onlyOne) {
            if (openArray.includes(row.id)) {
                setShowSub(true);
                setNewBreadcrumbItems([...breadItems, row?.name]);
                setOnlyOne(true);
            }
        }
    }, [openArray, row]);
    useEffect(() => {
        if (row && !row.parentId && articleMenuId) {
            getSideInfo({ id: row.id, name: row.name, coverUrl: logo });
        }
        else {
            getSideInfo({ id: '', name: '帮助文档', coverUrl: '' });
        }
    }, [row]);
    if (oakFullpath && row) {
        if (!show) {
            const Sub = showSub && hasSubArticles ? (_jsx(ArticleTreeList, { onChildEditArticleChange: onChildEditArticleChange, articleMenuId: row.id, oakPath: `${oakFullpath}.article$articleMenu` })) : (_jsx(ArticleMenuTreeList, { parentId: row.id, oakPath: `${oakFullpath}.articleMenu$parent`, entity: row.entity, entityId: row.entityId, onGrandChildEditArticleChange: onChildEditArticleChange }));
            const items = [];
            if (allowCreateSubArticle) {
                items.push({
                    key: 'allowCreateSubArticle',
                    label: (_jsx("div", { className: Styles.addAction, onClick: () => {
                            modal.confirm({
                                title: '输入文章标题',
                                cancelText: '取消',
                                okText: '提交',
                                content: (_jsx(Input, { ref: subArticleNameRef })),
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
                    label: (_jsx("div", { className: Styles.addAction, onClick: () => {
                            modal.confirm({
                                title: '输入子分类标题',
                                cancelText: '取消',
                                okText: '提交',
                                content: (_jsx(Input, { ref: subMenuNameRef })),
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
            return (_jsxs(_Fragment, { children: [_jsxs("div", { className: Styles.container, children: [_jsx("div", { className: Styles.ne, children: 
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
                                _jsxs(_Fragment, { children: [_jsx(Button, { type: "text", icon: _jsx(EditOutlined, {}), size: "small", onClick: () => {
                                                setNameEditing(true);
                                                const modalInstance = modal.confirm({
                                                    title: '编辑分类',
                                                    cancelText: '取消',
                                                    okText: '提交',
                                                    content: (_jsxs("div", { children: [_jsx(Form.Item, { label: "\u5206\u7C7B\u540D\u79F0", children: _jsx(Input, { ref: menuNameRef, defaultValue: row.name, onChange: (val) => update({ name: val.target.value }) }) }), _jsx(Form.Item, { label: "LOGO", help: _jsxs("div", { children: [_jsx("span", { children: "\u8BF7\u4E0A\u4F20LOGO\u9AD8\u6E05\u56FE\u7247\uFF0C" }), _jsx("span", { children: "108*108\u50CF\u7D20\uFF0C\u4EC5\u652F\u6301PNG\u3001JPG\u683C\u5F0F\uFF0C\u5927\u5C0F\u4E0D\u8D85\u8FC7300KB\u3002" })] }), children: _jsx(_Fragment, { children: _jsx(ExtraFileUpload, { oakPath: oakFullpath
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
                                                    footer: _jsxs(Space, { children: [_jsx(ExtraFileCommit, { oakPath: oakFullpath, efPaths: [
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
                                                                } }), _jsx(Button, { onClick: () => modalInstance.destroy(), children: "\u53D6\u6D88" })] })
                                                });
                                            }, style: { marginRight: 4 } }), _jsxs("div", { className: Styles.name, children: [logo ? (_jsx(Image, { height: 26, width: 26, src: logo, preview: false })) : null, _jsx("div", { style: { marginLeft: 4, overflow: 'hidden', width: '100px', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }, children: row?.name })] })] }) }), _jsx(Divider, { type: "vertical", style: { height: '100%', marginTop: 4, marginBottom: 4 } }), _jsxs("div", { className: Styles.control, children: [!row.parentId && _jsx(Button, { type: "text", onClick: () => {
                                            gotoDoc(row?.id);
                                        }, icon: _jsx(EyeOutlined, {}) }), _jsx(Dropdown, { menu: { items }, placement: "bottomRight", arrow: true, children: _jsx(Button, { type: "text", icon: _jsx(PlusOutlined, {}), size: "small" }) }), _jsx(Button, { type: "text", icon: _jsx(MinusOutlined, {}), size: "small", onClick: () => {
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
                                        _jsx(Button, { type: "text", icon: _jsx(UpOutlined, {}), size: "small", onClick: () => setShowSub(false) }) :
                                        _jsx(Button, { type: "text", icon: _jsx(DownOutlined, {}), size: "small", onClick: () => setShowSub(true) })) : _jsx("div", { className: Styles.ph })] })] }), showSub && (_jsx("div", { className: Styles.sub, children: Sub })), contextHolder] }));
        }
        else {
            const Sub = showSub && hasSubArticles ? (_jsx(ArticleTreeList, { onChildEditArticleChange: onChildEditArticleChange, articleMenuId: row.id, oakPath: `${oakFullpath}.article$articleMenu`, show: show, getBreadcrumbItemsByParent: getBreadcrumbItemsByParent, breadcrumbItems: newBreadcrumbItems, drawerOpen: drawerOpen, changeDrawerOpen: changeDrawerOpen, selectedArticleId: selectedArticleId, openArray: openArray ? openArray : undefined, getTopInfo: getTopInfo, articleId: articleId, currentArticle: currentArticle, setCurrentArticle: setCurrentArticle })) : (_jsx(ArticleMenuTreeList, { parentId: row.id, oakPath: `${oakFullpath}.articleMenu$parent`, onGrandChildEditArticleChange: onChildEditArticleChange, show: show, getBreadcrumbItems: getBreadcrumbItemsByParent, breadcrumbItems: newBreadcrumbItems, drawerOpen: drawerOpen, changeDrawerOpen: changeDrawerOpen, selectedArticleId: selectedArticleId, openArray: openArray ? openArray : undefined, getTopInfo: getTopInfo, articleId: articleId, currentArticle: currentArticle, setCurrentArticle: setCurrentArticle }));
            if (!row.parentId && articleMenuId) {
                return (_jsxs(_Fragment, { children: [_jsx("div", { children: Sub }), contextHolder] }));
            }
            else {
                return (_jsxs(_Fragment, { children: [_jsxs("div", { className: Styles.test, onClick: () => {
                                setShowSub(!showSub);
                                setNewBreadcrumbItems([...breadItems, row?.name]);
                            }, style: showSub ? { background: '#f5f5f5' } : { background: 'transparent' }, children: [_jsx("div", { className: Styles.ne, children: _jsxs("div", { className: Styles.name, children: [logo ? (_jsx(Image, { height: 26, width: 26, src: logo, preview: false, style: { marginRight: 4 } })) : null, _jsx("div", { children: row?.name })] }) }), _jsx("div", { className: Styles.control, children: (hasSubArticles || hasSubMenus) ? (showSub ?
                                        _jsx("div", { className: Styles.downArrow }) :
                                        _jsx("div", { className: Styles.leftArrow })) : _jsx("div", { className: Styles.ph }) })] }), showSub && (_jsx("div", { className: Styles.sub3, style: { background: '#f5f5f5' }, children: Sub })), contextHolder] }));
            }
        }
    }
    return null;
}
