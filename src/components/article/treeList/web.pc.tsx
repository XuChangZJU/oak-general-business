import React, { useState, useRef, useEffect } from 'react';
import { WebComponentProps } from "oak-frontend-base";
import { EntityDict } from "../../../oak-app-domain";
import Styles from './web.pc.module.less';
import { Input, Button, MenuProps, Dropdown, Divider, Modal, InputRef } from 'antd';
import { EditOutlined, MinusOutlined, CopyOutlined, FileTextOutlined } from '@ant-design/icons';
import copy from 'copy-to-clipboard';

export default function Render(props: WebComponentProps<EntityDict, 'articleMenu', true, {
    rows: EntityDict['article']['OpSchema'][];
    onChildEditArticleChange: (data: string) => void;
    show: string;
    getBreadcrumbItemsByParent: (breadcrumbItems: string[]) => void;
    breadcrumbItems: string[];
    drawerOpen: boolean;
    changeDrawerOpen: (open: boolean) => void;
    selectedArticleId: string;
    openArray: string[];
    getTopInfo: (data: {name: string, date: number}) => void;
}, {
    createOne: () => Promise<void>;
}>) {
    const {
        rows,
        oakFullpath,
        onChildEditArticleChange,
        show,
        getBreadcrumbItemsByParent,
        breadcrumbItems,
        drawerOpen,
        changeDrawerOpen,
        selectedArticleId,
        openArray,
        getTopInfo,
    } = props.data;
    const { t, setMessage, addItem, removeItem, updateItem, execute } = props.methods;
    const [modal, contextHolder] = Modal.useModal();
    const [nameEditing, setNameEditing] = useState('');
    const [name, setName] = useState<string | undefined>(undefined);
    const [onlyOne, setOnlyOne] = useState(false);
    useEffect(() => {
        if(openArray && openArray.length > 0 && rows && rows.length > 0 && !onlyOne) {
            rows.map((row) => {
                if(openArray.includes(row.id)) {
                    onChildEditArticleChange(row.id);
                    getBreadcrumbItemsByParent([...breadcrumbItems, row.name]);
                    setOnlyOne(true);
                }
            })
        }
    },[openArray,rows]);
    useEffect(() => {
        if(rows && rows.length > 0 && selectedArticleId) {
            const data = rows.find((ele) => ele.id === selectedArticleId);
            if(data) {
                getTopInfo({name: data.name, date: data.$$createAt$$ as number});
            }     
        }
    },[selectedArticleId, rows])
    if (oakFullpath) {
        if (!show) {
            if (rows?.length > 0) {
                return (
                    <div>
                        {
                            rows.map(
                                (ele, idx) => (
                                    <>
                                        <div className={Styles.container} onClick={() => {
                                            onChildEditArticleChange(ele.id);
                                        }}>
                                            <div
                                                className={Styles.ne}
                                            >
                                                {
                                                    nameEditing === ele.id ? <div className={Styles.name}>
                                                        <Input
                                                            autoFocus
                                                            value={name !== undefined ? name : ele?.name}
                                                            onChange={(evt) => setName(evt.target.value)}
                                                            onPressEnter={async () => {
                                                                if (name && name !== ele?.name) {
                                                                    updateItem({ name }, ele!.id);
                                                                    await execute();
                                                                }
                                                                setNameEditing('');
                                                            }}
                                                            onBlur={async () => {
                                                                if (name !== ele?.name) {
                                                                    updateItem({ name }, ele!.id);
                                                                    await execute();
                                                                }
                                                                setNameEditing('');
                                                            }}
                                                        />
                                                    </div> : <>
                                                        <Button
                                                            type="text"
                                                            icon={<EditOutlined />}
                                                            size="small"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                setNameEditing(ele.id);
                                                            }}
                                                            style={{ marginRight: 4 }}
                                                        />
                                                        <div className={Styles.name}>
                                                            <div style={{ marginLeft: 4, overflow: 'hidden', width: '150px', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{ele?.name}</div>
                                                        </div>
                                                    </>
                                                }
                                            </div>
                                            <Divider type="vertical" style={{ height: '100%', marginTop: 4, marginBottom: 4 }} />
                                            <div className={Styles.control}>
                                                <Button
                                                    type="text"
                                                    icon={<CopyOutlined />}
                                                    size="small"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        const url = `${window.location.host}/article/detail?oakId=${ele.id}`;
                                                        copy(url);
                                                        setMessage({
                                                            content: '复制链接成功',
                                                            type: 'success',
                                                        });
                                                    }}
                                                />
                                                <Button
                                                    type="text"
                                                    icon={<MinusOutlined />}
                                                    size="small"
                                                    onClick={(e) => {
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
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        <Divider style={{ margin: 1 }} />
                                    </>
                                )
                            )
                        }
                        {contextHolder}
                    </div>
                );
            }
        } else {
            if (rows?.length > 0) {
                return (
                    <div>
                        {
                            rows.map(
                                (ele, idx) => (
                                    <>
                                        <div className={Styles.container2} onClick={() => {
                                            onChildEditArticleChange(ele.id);
                                            getBreadcrumbItemsByParent([...breadcrumbItems, ele.name]);
                                            changeDrawerOpen(!drawerOpen);
                                        }}>
                                            <div
                                                className={Styles.ne}
                                            >
                                                {
                                                    selectedArticleId === ele.id ? (
                                                        <div className={Styles.name}>
                                                            <div className={Styles.dot} />
                                                            <div className={Styles.title} style={{width: 231}}>{ele?.name}</div>
                                                        </div>
                                                    ) : (
                                                        <div className={Styles.name}>
                                                            <div className={Styles.placeholder}></div>
                                                            <div style={{width: 231}}>{ele?.name}</div>
                                                        </div>
                                                    )
                                                }

                                            </div>
                                        </div >
                                        {/* <div className={Styles.test} onClick={() => {
                                            onChildEditArticleChange(ele.id);
                                            getBreadcrumbItemsByParent([...breadcrumbItems, ele.name]);
                                            changeDrawerOpen(!drawerOpen);
                                            getTopInfo({name: ele.name, date: ele.$$createAt$$ as number});
                                        }}>
                                            <div
                                                className={Styles.ne}
                                            >
                                                {
                                                    selectedArticleId === ele.id ? (
                                                        <div className={Styles.name}>
                                                            <div className={Styles.dot} />
                                                            <div className={Styles.title}>{ele?.name}</div>
                                                        </div>
                                                    ) : (
                                                        <div className={Styles.name}>
                                                            <div className={Styles.dot2} />
                                                            <div>{ele?.name}</div>
                                                        </div>
                                                    )
                                                }

                                            </div>
                                        </div > */}
                                    </>
                                )
                            )
                        }
                        {contextHolder}
                    </div >
                );
            }
        }
    }
    return null;
}