import * as React from 'react';
import { Table, Button, Modal, Row } from 'antd';
import DomainUpsertItem from '../upsertItem';
export default function Render(props) {
    const { systemId, oakPagination, list = [], oakLoading, oakFullpath, oakLegalActions, oakExecutable, oakExecuting, } = props.data;
    const { pageSize, total, currentPage } = oakPagination || {};
    const { t, setPageSize, setCurrentPage, updateItem, addItem, removeItem, clean, execute } = props.methods;
    const [upsertId, setUpsertId] = React.useState('');
    const [removeId, setRemoveId] = React.useState('');
    if (oakFullpath) {
        return (<>
                <Modal open={!!removeId} onCancel={() => {
                clean();
                setRemoveId('');
            }} onOk={async () => {
                removeItem(removeId);
                await execute();
                setRemoveId('');
            }} cancelText={t('common::action.cancel')} okText={t('common::action.confirm')}>
                    {t('confirmRemove')}
                </Modal>
                <Modal open={!!upsertId} onCancel={() => {
                clean();
                setUpsertId('');
            }} width={800} footer={<Button type='primary' onClick={async () => {
                    await execute();
                    setUpsertId('');
                }} disabled={oakExecutable !== true || oakExecuting}>
                            {t('common::action.confirm')}
                        </Button>}>
                    <DomainUpsertItem data={list.find(ele => ele.id === upsertId)} update={(attr, value) => updateItem({
                [attr]: value,
            }, upsertId)}/>
                </Modal>
                {oakLegalActions?.includes('create') && (<Row style={{ marginBottom: 16 }} justify="start">
                        <Button type="primary" onClick={() => {
                    const id = addItem({
                        systemId,
                    });
                    setUpsertId(id);
                }}>
                            {t('common::action.create')}
                        </Button>
                    </Row>)}
                <Table loading={oakLoading} dataSource={list} rowKey="id" columns={[
                {
                    dataIndex: 'id',
                    title: '#',
                    render: (value, record, index) => {
                        return index + 1;
                    },
                },
                {
                    dataIndex: 'url',
                    title: '域名',
                },
                {
                    dataIndex: 'apiPath',
                    title: '请求路径',
                },
                {
                    dataIndex: 'port',
                    title: '端口',
                },
                {
                    dataIndex: 'protocol',
                    title: '协议',
                },
                {
                    dataIndex: 'op',
                    width: 200,
                    title: '操作',
                    align: 'center',
                    render: (value, record, index) => {
                        return (<Row>
                                        {record['#oakLegalActions']?.includes('update') && <Button type='link' onClick={() => setUpsertId(record.id)}>
                                                {t('common::action.update')}
                                            </Button>}
                                        {record['#oakLegalActions']?.includes('remove') && <Button type='link' onClick={() => setRemoveId(record.id)}>
                                                {t('common::action.remove')}
                                            </Button>}
                                    </Row>);
                    },
                    fixed: 'right',
                },
            ]} pagination={{
                total,
                pageSize,
                current: currentPage,
                onShowSizeChange: (pageSize) => {
                    setPageSize(pageSize);
                },
                onChange: (current) => {
                    setCurrentPage(current);
                },
            }}/>
            </>);
    }
    return null;
}
