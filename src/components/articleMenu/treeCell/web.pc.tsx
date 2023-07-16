import React, { useState, useRef } from 'react';
import { Input, Button, MenuProps, Dropdown, Divider, Modal, InputRef } from 'antd';
import { EditOutlined, DownOutlined, UpOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { WebComponentProps } from "oak-frontend-base";
import ArticleMenuTreeList from '../treeList';
import ArticleTreeList from '../../article/treeList';
import { EntityDict } from "../../../general-app-domain";
import Styles from './web.pc.module.less';
import { xml } from 'cheerio';

export default function Render(props: WebComponentProps<EntityDict, 'articleMenu', false, {
    row: EntityDict['articleMenu']['OpSchema'];
    allowCreateSubMenu: boolean;
    allowCreateSubArticle: boolean;
    allowRemove: boolean;
    onRemove: () => void;
    onUpdateName: (name: string) => Promise<void>;
}, {
    createSubArticle: (name: string) => Promise<void>;
    createSubArticleMenu: (name: string) => Promise<void>;
}>) {
    const { row, allowCreateSubArticle, allowCreateSubMenu, allowRemove, onRemove, onUpdateName, oakFullpath } = props.data;
    const { update, execute, createSubArticle, createSubArticleMenu, setMessage } = props.methods;
    const [nameEditing, setNameEditing] = useState(false);
    const [modal, contextHolder] = Modal.useModal();
    const [name, setName] = useState('');
    const [showSub, setShowSub] = useState(false);

    const subMenuNameRef = useRef<InputRef>(null);
    const subArticleNameRef = useRef<InputRef>(null);

    const hasSubArticles = !allowCreateSubMenu;
    const hasSubMenus = !allowCreateSubArticle;

    if (oakFullpath && row) {
        const Sub = showSub && hasSubArticles ? (
            <ArticleTreeList
                articleMenuId={row.id}
                oakPath={`${oakFullpath}.article$articleMenu`}
            />
        ) : (
            <ArticleMenuTreeList
                parentId={row.id}
                oakPath={`${oakFullpath}.articleMenu$parent`}
                entity={row.entity}
                entityId={row.entityId}
            />
        );


        const items: MenuProps['items'] = [];
        if (allowCreateSubArticle) {
            items.push({
                key: 'allowCreateSubArticle',
                label: (
                    <Button
                        type="text"
                        onClick={() => {
                            modal.confirm({
                                title: '输入文章标题',
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
                            })
                        }}
                    >
                        添加文章
                    </Button>
                )
            });
        }
        if (allowCreateSubMenu) {
            items.push({
                key: 'allowCreateSubMenu',
                label: (
                    <Button
                        type="text"
                        onClick={() => {
                            modal.confirm({
                                title: '输入目录标题',
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
                                            content: '请输入目录标题',
                                        });
                                    }
                                    else {
                                        await createSubArticleMenu(value);
                                        setShowSub(true);
                                    }
                                }
                            })
                        }}
                    >
                        添加子目录
                    </Button>
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
                            nameEditing ? <div className={Styles.name}>
                                <Input
                                    value={name || row?.name}
                                    onChange={(evt) => setName(evt.target.value)}
                                    onPressEnter={async () => {
                                        if (name && name !== row?.name) {
                                            await onUpdateName(name);
                                        }
                                        setNameEditing(false);
                                    }}
                                    onBlur={async () => {
                                        if (name !== row?.name) {
                                            await onUpdateName(name);
                                        }
                                        setNameEditing(false);
                                    }}
                                />
                            </div> : <>
                                <Button
                                    type="text"
                                    icon={<EditOutlined />}
                                    size="small"
                                    onClick={() => setNameEditing(true)}
                                />
                                <div className={Styles.name}>
                                    {row?.name}
                                </div>
                            </>
                        }
                    </div>
                    <Divider type="vertical" style={{ height: '100%', marginTop: 4, marginBottom: 4 }} />
                    <div className={Styles.control}>
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
    }

    return null;
}