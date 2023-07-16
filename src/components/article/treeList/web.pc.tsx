import React, { useState, useRef } from 'react';
import { WebComponentProps } from "oak-frontend-base";
import { EntityDict } from "../../../general-app-domain";
import Styles from './web.pc.module.less';
import { Input, Button, MenuProps, Dropdown, Divider, Modal, InputRef } from 'antd';
import { EditOutlined, DownOutlined, UpOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';


export default function Render(props: WebComponentProps<EntityDict, 'articleMenu', true, {
    rows: EntityDict['article']['OpSchema'][];
}, {
    createOne: () => Promise<void>;
}>) {
    const { rows, oakFullpath } = props.data;
    const { t, addItem, removeItem, updateItem, execute } = props.methods;
    const [modal, contextHolder] = Modal.useModal();
    const [nameEditing, setNameEditing] = useState(false);
    const [name, setName] = useState<string | undefined>(undefined);

    if (oakFullpath) {
        if (rows?.length > 0) {
            return (
                <div>
                    {
                        rows.map(
                            (ele, idx) => (
                                <>
                                    <div className={Styles.container}>
                                        <div
                                            className={Styles.ne}
                                        >
                                            {
                                                nameEditing ? <div className={Styles.name}>
                                                    <Input
                                                        value={name !== undefined ? name : ele?.name}
                                                        onChange={(evt) => setName(evt.target.value)}
                                                        onPressEnter={async () => {
                                                            if (name && name !== ele?.name) {
                                                                updateItem({ name }, ele!.id);
                                                                await execute();
                                                            }
                                                            setNameEditing(false);
                                                        }}
                                                        onBlur={async () => {
                                                            if (name !== ele?.name) {
                                                                updateItem({ name }, ele!.id);
                                                                await execute();
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
                                                        {ele?.name}
                                                    </div>
                                                </>
                                            }
                                        </div>
                                        <Divider type="vertical" style={{ height: '100%', marginTop: 4, marginBottom: 4 }} />
                                        <div className={Styles.control}>
                                            <Button
                                                type="text"
                                                icon={<MinusOutlined />}
                                                size="small"
                                                onClick={() => {
                                                    modal.confirm({
                                                        title: '请确认',
                                                        content: '确认删除吗？',
                                                        onOk: async () => {
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
    }
    return null;
}