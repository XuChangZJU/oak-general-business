import React from 'react';
import { Form, Button, Space } from 'antd-mobile';
import OnUser from '../onUser/index';
export default function Render(props) {
    const { relations, entity, entityId, oakId, oakDirty, oakFullpath, oakExecutable } = props.data;
    const { onConfirm, onReset, t } = props.methods;
    return (<Form footer={<Space>
                    <Button color="primary" style={{ flex: 2 }} onClick={() => {
                onConfirm();
            }} disabled={oakExecutable !== true}>
                        {t('common::action.confirm')}
                    </Button>
                    <Button style={{ flex: 1 }} onClick={() => onReset()}>
                        {t('common::reset')}
                    </Button>
                </Space>}>
            <OnUser oakAutoUnmount={true} oakPath={`${oakFullpath}.user`} entity={entity} entityId={entityId} relations={relations} oakId={oakId}/>
        </Form>);
}
