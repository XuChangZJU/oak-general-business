import React from 'react';
import { Form, Button, Space } from 'antd';
import Style from './web.module.less';
import OnUser from '../onUser/index';
import PageHeader from '../../../../components/common/pageHeader';
import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../../../general-app-domain';


export default function Render(props: WebComponentProps<EntityDict, 'user', false, {
    relations: string[];
    entity: string;
    entityId: string;
    oakId: string;
    legal: boolean;
}, {
    onConfirm: () => Promise<void>;
}>) {
    const { relations, entity, entityId, oakFullpath, oakId, legal } = props.data;
    const { onConfirm, clean } = props.methods;
    return (
        <PageHeader showBack={true} title="编辑权限">
            <div className={Style.container}>
                <OnUser
                    oakAutoUnmount={true}
                    oakPath={oakFullpath ? `${oakFullpath}.user` : undefined}
                    entity={entity}
                    entityId={entityId}
                    relations={relations}
                    oakId={oakId}
                />
                <Form colon labelCol={{ span: 4 }} wrapperCol={{ span: 8 }}>
                    <Form.Item wrapperCol={{ offset: 4 }}>
                        <Space>
                            <Button
                                disabled={!legal}
                                type="primary"
                                onClick={() => onConfirm()}
                            >
                                提交
                            </Button>
                            <Button
                                htmlType="reset"
                                onClick={() => clean()}
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
