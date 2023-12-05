import React, { useState } from 'react';
import { Tabs, Modal, Button } from 'antd';
import SystemPanel from '../../system/panel';
import SystemUpsert from '../../system/upsert';
export default function render(props) {
    const { oakFullpath, systems, oakExecutable, oakExecuting, platformId } = props.data;
    const { addItem, removeItem, clean, execute, t } = props.methods;
    const [createId, setCreateId] = useState('');
    const [removeId, setRemoveId] = useState('');
    if (oakFullpath) {
        return (<>
                <Modal open={!!createId} width={800} onCancel={() => {
                clean();
                setCreateId('');
            }} footer={<Button type='primary' onClick={async () => {
                    await execute();
                    setCreateId('');
                }} disabled={oakExecutable !== true || oakExecuting}>
                            {t('common::action.confirm')}
                        </Button>}>
                    <SystemUpsert oakId={createId} oakPath={`${oakFullpath}.${createId}`}/>
                </Modal>
                <Modal open={!!removeId} onCancel={() => {
                clean();
                setRemoveId('');
            }} footer={<Button type='primary' onClick={async () => {
                    removeItem(removeId);
                    await execute();
                    setRemoveId('');
                }}>
                            {t('common::action.confirm')}
                        </Button>}>
                    {t('confirmToRemove')}
                </Modal>
                <Tabs type="editable-card" onEdit={(key, action) => {
                if (action === 'add') {
                    const id = addItem({ platformId, config: { App: {} } });
                    setCreateId(id);
                }
                else if (action === 'remove') {
                    const systemId = systems[Number(key)].id;
                    setRemoveId(systemId);
                }
            }} items={systems?.length > 0 ?
                systems.map((item, idx) => {
                    return {
                        label: item.name,
                        key: `${idx}`,
                        children: (<SystemPanel oakPath={`${oakFullpath}.${item.id}`} oakId={item.id}/>)
                    };
                })
                : []}/>
            </>);
    }
}
