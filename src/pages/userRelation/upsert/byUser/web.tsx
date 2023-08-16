import React from 'react';
import { Form, Button, Space } from 'antd-mobile';
import Style from './mobile.module.less';
import OnUser from '../onUser/index';
import PageHeader from '../../../../components/common/pageHeader';
import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../../../oak-app-domain';


export default function Render(props: WebComponentProps<EntityDict, 'user', false, {
    relations: EntityDict['relation']['OpSchema'][];
    entity: keyof EntityDict;
    entityId: string;
    oakId: string;
}, {
    onConfirm: () => Promise<void>;
    onReset: () => void;
}>) {
    const { relations, entity, entityId, oakId, oakDirty, oakFullpath, oakExecutable } = props.data;
    const { onConfirm, onReset, t } = props.methods;
    return (
        <Form
            footer={
                <div className={Style['btn-container']}>
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
                    <Button
                        style={{ flex: 1 }}
                        onClick={() => onReset()}
                    >
                        {t('common::reset')}
                    </Button>
                </div>
            }
        >
            <OnUser
                oakAutoUnmount={true}
                oakPath={oakFullpath && `${oakFullpath}.user`}
                entity={entity}
                entityId={entityId}
                relations={relations}
                oakId={oakId}
            />
        </Form>
    )
}