import React, { useState, useRef, useEffect } from 'react';
import { Input, Button, MenuProps, Dropdown, Divider, Modal, InputRef, Form, Image, Space } from 'antd';
import { EditOutlined, DownOutlined, UpOutlined, RightOutlined, LeftOutlined, MinusOutlined, PlusOutlined, EyeOutlined } from '@ant-design/icons';
import { WebComponentProps } from "oak-frontend-base";
import ArticleMenuTreeList from '../treeList';
import ArticleTreeList from '../../article/treeList';
import { EntityDict } from "../../../oak-app-domain";
import Styles from './web.pc.module.less';
import ExtraFileUpload from '../../extraFile/upload';
import ExtraFileCommit from '../../extraFile/commit';

export default function Render(props: WebComponentProps<EntityDict, 'articleMenu', false, {
    row: EntityDict['articleMenu']['OpSchema'];
    allowCreateSubMenu: boolean;
    allowCreateSubArticle: boolean;
    allowRemove: boolean;
    logo: string;
    onRemove: () => void;
    onUpdateName: (name: string) => Promise<void>;
    onChildEditArticleChange: (data: string) => void;
    editArticle: string;
    show: string;
    getBreadcrumbItemsByParent: (breadcrumbItems: string[]) => void;
    breadItems: string[];
    drawerOpen: boolean;
    changeDrawerOpen: (open: boolean) => void;
    selectedArticleId: string;
    openArray: string[];
    getTopInfo: (data: { name: string, date: number }) => void;
    articleId: string;
    articleMenuId: string;
    getSideInfo: (data: { id: string, name: string, coverUrl: string }) => void;
    currentArticle: string;
    setCurrentArticle: (id: string) => void;
}, {
    createSubArticle: (name: string) => Promise<void>;
    createSubArticleMenu: (name: string) => Promise<void>;
    gotoDoc: (articleMenuId: string) => void;
}>) {
    const {
        row,
        allowCreateSubArticle,
        allowCreateSubMenu,
        allowRemove,
        onRemove,
        onUpdateName,
        oakFullpath,
        logo,
        onChildEditArticleChange,
        editArticle,
        show,
        getBreadcrumbItemsByParent,
        breadItems,
        drawerOpen,
        changeDrawerOpen,
        selectedArticleId,
        openArray,
        getTopInfo,
        articleId,
        articleMenuId,
        getSideInfo,
        currentArticle,
        setCurrentArticle
    } = props.data;
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
    const [newBreadcrumbItems, setNewBreadcrumbItems] = useState([] as string[]);
    const menuNameRef = useRef<InputRef>(null);
    const subMenuNameRef = useRef<InputRef>(null);
    const subArticleNameRef = useRef<InputRef>(null);
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
            getSideInfo({ id: row.id, name: row.name, coverUrl: logo })
        } else {
            getSideInfo({ id: '', name: '帮助文档', coverUrl: '' });
        }
    }, [row]);
    if (oakFullpath && row) {
        if (!show) {
            const Sub = showSub && hasSubArticles ? (
                <ArticleTreeList
                    onChildEditArticleChange={onChildEditArticleChange}
                    articleMenuId={row.id}
                    // oakPath={`${oakFullpath}.article$articleMenu`}
                    oakPath={`$article-articleMenu-${row.id}`}
                />
            ) : (
                <ArticleMenuTreeList
                    oakAutoUnmount={true}
                    parentId={row.id}
                    // oakPath={`${oakFullpath}.articleMenu$parent`}
                    oakPath={`$articleMenu-parent-${row.id}`}
                    entity={row.entity}
                    entityId={row.entityId}
                    onGrandChildEditArticleChange={onChildEditArticleChange}
                />
            );
            const items: MenuProps['items'] = [];
            if (allowCreateSubArticle) {
                items.push({
                    key: 'allowCreateSubArticle',
                    label: (
                        <div
                            className={Styles.addAction}
                            onClick={() => {
                                modal.confirm({
                                    title: '输入文章标题',
                                    cancelText: '取消',
                                    okText: '提交',
                                    content: (
                                        <Input
                                            ref={subArticleNameRef}
                                        />
                                    ),
                                    onOk: async () => {
                                        const { value } = subArticleNameRef.current!.input!;
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
                            }}
                        >
                            添加文章
                        </div>
                    )
                });
            }
            if (allowCreateSubMenu) {
                items.push({
                    key: 'allowCreateSubMenu',
                    label: (
                        <div
                            className={Styles.addAction}
                            onClick={() => {
                                modal.confirm({
                                    title: '输入子分类标题',
                                    cancelText: '取消',
                                    okText: '提交',
                                    content: (
                                        <Input
                                            ref={subMenuNameRef}
                                        />
                                    ),
                                    onOk: async () => {
                                        const { value } = subMenuNameRef.current!.input!;
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
                            }}
                        >
                            添加子分类
                        </div>
                    )
                });
            }
            return (
                <>
                    <div className={Styles.container}>
                        <div
                            className={Styles.ne}
                        >
                            {
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
                                <>
                                    <Button
                                        type="text"
                                        icon={<EditOutlined />}
                                        size="small"
                                        onClick={() => {
                                            setNameEditing(true);
                                            const modalInstance = modal.confirm({
                                                title: '编辑分类',
                                                cancelText: '取消',
                                                okText: '提交',
                                                content: (
                                                    <div>
                                                        <Form.Item
                                                            label="分类名称"
                                                        >
                                                            <Input
                                                                ref={menuNameRef}
                                                                defaultValue={row.name}
                                                                onChange={(val) => update({ name: val.target.value })}
                                                            />
                                                        </Form.Item>
                                                        <Form.Item
                                                            label="LOGO"
                                                            help={
                                                                <div>
                                                                    <span>请上传LOGO高清图片，</span>
                                                                    <span>
                                                                        108*108像素，仅支持PNG、JPG格式，大小不超过300KB。
                                                                    </span>
                                                                </div>
                                                            }
                                                        >
                                                            <>
                                                                <ExtraFileUpload
                                                                    oakPath={
                                                                        oakFullpath
                                                                            ? `${oakFullpath}.extraFile$entity$1`
                                                                            : undefined
                                                                    }
                                                                    type="image"
                                                                    origin="qiniu"
                                                                    tag1="logo"
                                                                    entity="articleMenu"
                                                                    accept=".PNG, .JPG"
                                                                    maxNumber={1}
                                                                />
                                                            </>
                                                        </Form.Item>
                                                    </div>
                                                ),
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
                                                footer: <Space>
                                                    <ExtraFileCommit
                                                        oakPath={oakFullpath}
                                                        afterCommit={() => {
                                                            modalInstance!.destroy()
                                                        }}
                                                        beforeCommit={() => {
                                                            if (menuNameRef.current!.input!.value) {
                                                                return true
                                                            } else {
                                                                return false
                                                            }
                                                        }}
                                                    />
                                                    <Button onClick={() => modalInstance!.destroy()}>
                                                        取消
                                                    </Button>
                                                </Space>
                                            });
                                        }}
                                        style={{ marginRight: 4 }}
                                    />
                                    <div className={Styles.name}>
                                        {logo ? (
                                            <Image
                                                height={26}
                                                width={26}
                                                src={logo}
                                                preview={false}
                                            />
                                        ) : null}
                                        <div style={{ marginLeft: 4, overflow: 'hidden', width: '100px', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{row?.name}</div>
                                    </div>
                                </>
                            }
                        </div>
                        <Divider type="vertical" style={{ height: '100%', marginTop: 4, marginBottom: 4 }} />
                        <div className={Styles.control}>
                            {
                                !row.parentId && <Button
                                    type="text"
                                    onClick={() => {
                                        gotoDoc(row?.id);
                                    }}
                                    icon={<EyeOutlined />}
                                >
                                </Button>
                            }


                            <Dropdown menu={{ items }} placement="bottomRight" arrow>
                                <Button
                                    type="text"
                                    icon={<PlusOutlined />}
                                    size="small"
                                />
                            </Dropdown>
                            <Button
                                type="text"
                                icon={<MinusOutlined />}
                                size="small"
                                onClick={() => {
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
                                }}
                            />
                            {
                                (hasSubArticles || hasSubMenus) ? (
                                    showSub ?
                                        <Button
                                            type="text"
                                            icon={<UpOutlined />}
                                            size="small"
                                            onClick={() => setShowSub(false)}
                                        /> :
                                        <Button
                                            type="text"
                                            icon={<DownOutlined />}
                                            size="small"
                                            onClick={() => setShowSub(true)}
                                        />
                                ) : <div className={Styles.ph} />
                            }
                        </div>
                    </div>
                    {
                        showSub && (
                            <div className={Styles.sub}>
                                {Sub}
                            </div>
                        )
                    }
                    {contextHolder}
                </>
            );
        } else {
            const Sub = showSub && hasSubArticles ? (
                <ArticleTreeList
                    oakAutoUnmount={true}
                    onChildEditArticleChange={onChildEditArticleChange}
                    articleMenuId={row.id}
                    // oakPath={`${oakFullpath}.article$articleMenu`}
                    oakPath={`$article-articleMenu-${row.id}`}
                    show={show}
                    getBreadcrumbItemsByParent={getBreadcrumbItemsByParent}
                    breadcrumbItems={newBreadcrumbItems}
                    drawerOpen={drawerOpen}
                    changeDrawerOpen={changeDrawerOpen}
                    selectedArticleId={selectedArticleId}
                    openArray={openArray ? openArray : undefined}
                    getTopInfo={getTopInfo}
                    articleId={articleId}
                    currentArticle={currentArticle}
                    setCurrentArticle={setCurrentArticle}
                />
            ) : (
                <ArticleMenuTreeList
                    oakAutoUnmount={true}
                    parentId={row.id}
                    // oakPath={`${oakFullpath}.articleMenu$parent`}
                    oakPath={`$articleMenu-parent-${row.id}`}
                    onGrandChildEditArticleChange={onChildEditArticleChange}
                    show={show}
                    getBreadcrumbItems={getBreadcrumbItemsByParent}
                    breadcrumbItems={newBreadcrumbItems}
                    drawerOpen={drawerOpen}
                    changeDrawerOpen={changeDrawerOpen}
                    selectedArticleId={selectedArticleId}
                    openArray={openArray ? openArray : undefined}
                    getTopInfo={getTopInfo}
                    articleId={articleId}
                    currentArticle={currentArticle}
                    setCurrentArticle={setCurrentArticle}
                />
            );
            if (!row.parentId && articleMenuId) {
                return (
                    <>
                        <div>
                            {Sub}
                        </div>
                        {contextHolder}
                    </>
                );
            } else {
                return (
                    <>
                        {/* <div className={Styles.container2} onClick={() => {
                            setShowSub(!showSub);
                            setNewBreadcrumbItems([...breadItems, row?.name])
                        }}>
                            <div className={Styles.control}>
                                {
                                    (hasSubArticles || hasSubMenus) ? (
                                        showSub ?
                                            <DownOutlined /> :
                                            <RightOutlined />
                                    ) : <div className={Styles.ph} />
                                }
                            </div>
                            <div
                                className={Styles.ne}
                            >
                                <div className={Styles.name}>
                                    {logo ? (
                                        <Image
                                            height={26}
                                            width={26}
                                            src={logo}
                                            preview={false}
                                            style={{ marginRight: 4 }}
                                        />
                                    ) : null}
                                    <div style={{ width: 204 }}>{row?.name}</div>
                                </div>
                            </div>
                        </div >
                        {
                            showSub && (
                                <div className={Styles.sub2}>
                                    {Sub}
                                </div>
                            )
                        }
                        {contextHolder} */}
                        <div className={Styles.test} onClick={() => {
                            setShowSub(!showSub);
                            setNewBreadcrumbItems([...breadItems, row?.name])
                        }} style={showSub ? { background: '#f5f5f5' } : { background: 'transparent' }}
                        >
                            <div
                                className={Styles.ne}
                            >
                                <div className={Styles.name}>
                                    {logo ? (
                                        <Image
                                            height={26}
                                            width={26}
                                            src={logo}
                                            preview={false}
                                            style={{ marginRight: 4 }}
                                        />
                                    ) : null}
                                    <div>{row?.name}</div>
                                </div>
                            </div>
                            <div className={Styles.control}>
                                {
                                    (hasSubArticles || hasSubMenus) ? (
                                        showSub ?
                                            <div className={Styles.downArrow}></div> :
                                            <div className={Styles.leftArrow}></div>
                                    ) : <div className={Styles.ph} />
                                }
                            </div>
                        </div >
                        {
                            showSub && (
                                <div className={Styles.sub3} style={{ background: '#f5f5f5' }}>
                                    {Sub}
                                </div>
                            )
                        }
                        {contextHolder}
                    </>
                );
            }
        }
    }
    return null;
}