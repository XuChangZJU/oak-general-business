import React, { useRef } from 'react';
import { WebComponentProps } from "oak-frontend-base";
import { EntityDict } from "../../../general-app-domain";
import TreeCell from '../treeCell';
import Styles from './web.pc.module.less';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Divider, Modal, InputRef, Input } from 'antd';


export default function Render(props: WebComponentProps<EntityDict, 'articleMenu', true, {
    rows: EntityDict['articleMenu']['OpSchema'][];
    parentId?: string;
}, {
    createOne: (name: string) => Promise<void>;
}>) {
    const { rows, oakFullpath, parentId } = props.data;
    const { t, createOne, removeItem, updateItem, execute, setMessage } = props.methods;
    const [modal, contextHolder] = Modal.useModal();
    const menuNameRef = useRef<InputRef>(null);

    if (oakFullpath) {
        if (rows?.length > 0) {
            return (
                <div className={Styles.container}>
                    {
                        rows.map(
                            (ele, idx) => (
                                <>
                                    <TreeCell
                                        oakId={ele.id}
                                        oakPath={`${oakFullpath}.${ele.id}`}
                                        onRemove={() => {
                                            modal.confirm({
                                                title: '请确认',
                                                content: '确认删除吗？',
                                                onOk: async () => {
                                                    removeItem(ele.id);
                                                    await execute();
                                                }
                                            });
                                        }}
                                        onUpdateName={async (name) => {
                                            updateItem({ name }, ele.id);
                                            await execute();
                                        }}
                                    />
                                    <Divider style={{ margin: 1 }} />
                                </>
                            )
                        )
                    }
                    {
                        !parentId && <div className={Styles.btnContainer}>
                            <Button
                                type="primary"
                                size="large"
                                icon={
                                    <PlusOutlined />
                                }
                                onClick={
                                    () => {
                                        modal.confirm({
                                            title: '输入目录标题',
                                            content: (
                                                <Input 
                                                    ref={menuNameRef}
                                                />
                                            ),
                                            onOk: async () => {
                                                const { value } = menuNameRef.current!.input!;
                                                if (!value) {
                                                    setMessage({
                                                        type: 'warning',
                                                        content: '请输入目录标题',
                                                    });
                                                }
                                                else {
                                                    await createOne(value);
                                                }
                                            }
                                        })
                                    }
                                }
                            >
                                {t('common:action.add')}
                            </Button>
                        </div>
                    }
                    {contextHolder}
                </div>
            );
        }

        if (!parentId) {
            return (
                <div className={Styles.container}>
                    <div className={Styles.btnContainer}>
                        <Button
                            type="primary"
                            size="large"
                            icon={
                                <PlusOutlined />
                            }
                            onClick={
                                () => createOne('齐圣晨的大坑')
                            }
                        >
                            {t('common:action.add')}
                        </Button>
                    </div>
                </div>
            );
        }
    }
    return null;
}