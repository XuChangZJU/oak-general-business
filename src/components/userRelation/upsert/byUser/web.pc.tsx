import React from 'react';
import { Form, Button, Space } from 'antd';
import OnUser from '../onUser/index';
import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../../../oak-app-domain';


export default function Render(
    props: WebComponentProps<
        EntityDict,
        'user',
        false,
        {
            relations: EntityDict['relation']['OpSchema'][];
            entity: keyof EntityDict;
            entityId: string;
            oakId: string;
            allowUpdateName?: boolean;
            allowUpdateNickname?: boolean;
        },
        {
            onConfirm: () => Promise<void>;
            onReset: () => void;
        }
    >
) {
    const {
        relations,
        entity,
        entityId,
        oakId,
        oakDirty,
        oakFullpath,
        allowUpdateName,
        allowUpdateNickname,
    } = props.data;
    const { onConfirm, onReset, t } = props.methods;
    return (
        <>
            <OnUser
                oakAutoUnmount={true}
                oakPath={`${oakFullpath}.user`}
                entity={entity}
                entityId={entityId}
                relations={relations}
                oakId={oakId}
                allowUpdateName={allowUpdateName}
                allowUpdateNickname={allowUpdateNickname}
            />
            <Form colon labelCol={{ span: 4 }} wrapperCol={{ span: 8 }}>
                <Form.Item wrapperCol={{ offset: 4 }}>
                    <Space>
                        <Button
                            disabled={!oakDirty}
                            type="primary"
                            onClick={() => onConfirm()}
                        >
                            {t('common::action.confirm')}
                        </Button>
                        <Button htmlType="reset" onClick={() => onReset()}>
                            {t('common::reset')}
                        </Button>
                    </Space>
                </Form.Item>
            </Form>
        </>
    );
}
