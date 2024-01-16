import React from 'react';
import { Form, Button, Space } from 'antd-mobile';
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
        oakExecutable,
        allowUpdateName,
        allowUpdateNickname,
    } = props.data;
    const { onConfirm, onReset, t } = props.methods;
    return (
        <Form
            footer={
                <Space>
                    <Button
                        color="primary"
                        style={{ flex: 2 }}
                        onClick={() => {
                            onConfirm();
                        }}
                        disabled={oakExecutable !== true}
                    >
                        {t('common::action.confirm')}
                    </Button>
                    <Button style={{ flex: 1 }} onClick={() => onReset()}>
                        {t('common::reset')}
                    </Button>
                </Space>
            }
        >
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
        </Form>
    );
}