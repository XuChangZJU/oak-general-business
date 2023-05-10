import React from 'react';
import { Form, Button, Space } from 'antd';
import Style from './web.module.less';
import OnUser from '../onUser/index';
import PageHeader from '../../../../components/common/pageHeader';
import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../../../general-app-domain';


export default function Render(props: WebComponentProps<EntityDict, 'user', false, {
    relations: EntityDict['relation']['OpSchema'][];
    entity: keyof EntityDict;
    entityId: string;
    oakId: string;
}, {
    onConfirm: () => Promise<void>;
    onReset: () => void;
}>) {
    const { relations, entity, entityId, oakId, oakDirty, oakFullpath } = props.data;
    const { onConfirm, onReset } = props.methods;
    return (
        <PageHeader showBack={true} title="编辑权限">
            <div className={Style.container}>
                <OnUser
                    oakAutoUnmount={true}
                    oakPath={oakFullpath && `${oakFullpath}.user`}
                    entity={entity}
                    entityId={entityId}
                    relations={relations}
                    oakId={oakId}
                />
                <Form colon labelCol={{ span: 4 }} wrapperCol={{ span: 8 }}>
                    <Form.Item wrapperCol={{ offset: 4 }}>
                        <Space>
                            <Button
                                disabled={!oakDirty}
                                type="primary"
                                onClick={() => onConfirm()}
                            >
                                提交
                            </Button>
                            <Button
                                htmlType="reset"
                                onClick={() => onReset()}
                            >
                                重置
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </div>
        </PageHeader>
    );
}
