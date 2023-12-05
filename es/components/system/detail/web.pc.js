import React, { useState } from 'react';
import { Row, Modal, Descriptions, Typography, Button } from 'antd';
import SystemUpsert from '../upsert';
import Styles from './web.pc.module.less';
export default function Render(props) {
    const { oakId, folder, name, description, 'super': isSuper, oakFullpath, oakExecutable, oakExecuting } = props.data;
    const { t, execute, clean } = props.methods;
    const [open, setOpen] = useState(false);
    if (oakFullpath) {
        return (<>
                <Modal open={open} onCancel={() => {
                clean();
                setOpen(false);
            }} width={800} footer={<Button type='primary' onClick={async () => {
                    await execute();
                    setOpen(false);
                }} disabled={oakExecutable !== true || oakExecuting}>
                            {t('common::action.confirm')}
                        </Button>}>
                    <div className={Styles.upsert}>
                        <SystemUpsert oakId={oakId} oakPath={oakFullpath}/>
                    </div>
                </Modal>
                <Descriptions column={2} bordered>
                    <Descriptions.Item label="id">
                        <Typography.Paragraph copyable>
                            {oakId}
                        </Typography.Paragraph>
                    </Descriptions.Item>
                    <Descriptions.Item label={t('system:attr.name')}>
                        {name}
                    </Descriptions.Item>
                    <Descriptions.Item label={t('system:attr.description')}>
                        {description}
                    </Descriptions.Item>
                    <Descriptions.Item label={t('system:attr.super')}>
                        {isSuper ? '是' : '否'}
                    </Descriptions.Item>
                    <Descriptions.Item label={t('system:attr.folder')}>
                        {folder}
                    </Descriptions.Item>
                    <Descriptions.Item>
                        <Row justify="end">
                            <Button type="primary" onClick={() => setOpen(true)}>
                                {t('common::action.update')}
                            </Button>
                        </Row>
                    </Descriptions.Item>
                </Descriptions>
            </>);
    }
    return null;
}
