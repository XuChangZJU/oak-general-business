import React, { useState } from 'react';
import { Tabs, Modal, Button } from 'antd';
import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../../oak-app-domain';
import ApplicationPanel from '../../application/panel';
import ApplicationUpsert from '../../application/upsert';

export default function render(props: WebComponentProps<EntityDict, 'application', true, {
    applications: EntityDict['application']['OpSchema'][];
    systemId: string;
}>) {
    const { oakFullpath, applications, oakExecutable, oakExecuting, systemId } = props.data;
    const { addItem, removeItem, clean, execute, t } = props.methods;
    const [createId, setCreateId] = useState('');
    const [removeId, setRemoveId] = useState('');

    if (oakFullpath && applications?.length > 0) {
        return (
            <>
                <Modal
                    open={!!createId}
                    width={800}
                    onCancel={() => {
                        clean();
                        setCreateId('');
                    }}
                    footer={
                        <Button
                            type='primary'
                            onClick={async () => {
                                await execute();
                                setCreateId('');
                            }}
                            disabled={oakExecutable !== true || oakExecuting}
                        >
                            {t('common::action.confirm')}
                        </Button>
                    }
                >
                    <ApplicationUpsert
                        oakId={createId}
                        oakPath={`${oakFullpath}.${createId}`}
                    />
                </Modal>
                <Modal
                    open={!!removeId}
                    onCancel={() => {
                        clean();
                        setRemoveId('');
                    }}
                    footer={
                        <Button
                            type='primary'
                            onClick={async () => {
                                removeItem(removeId);
                                await execute();
                                setRemoveId('');
                            }}
                        >
                            {t('common::action.confirm')}
                        </Button>
                    }
                >
                    {t('confirmToRemove')}
                </Modal>
                <Tabs
                    type="editable-card"
                    onEdit={(key, action) => {
                        if (action === 'add') {
                            const id = addItem({ systemId });
                            setCreateId(id);
                        }
                        else if (action === 'remove') {
                            const appId = applications![Number(key)].id;
                            setRemoveId(appId);
                        }
                    }}
                    items={
                        applications?.length > 0 ?
                            applications.map(
                                (item, idx) => {
                                    return {
                                        label: item.name,
                                        key: `${idx}`,
                                        children: (
                                            <ApplicationPanel
                                                oakPath={`${oakFullpath}.${item.id}`}
                                                oakId={item.id}
                                            />
                                        )
                                    }
                                }
                            )
                            : []
                    }
                />
            </>
        )
    }
}