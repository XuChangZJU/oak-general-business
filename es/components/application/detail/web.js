import React, { useState } from 'react';
import { Row, Descriptions, Typography, Button, Modal } from 'antd';
import ApplicationUpsert from '../upsert';
export default function Render(props) {
    const { id, name, description, type, oakFullpath, oakExecutable, oakExecuting } = props.data;
    const { t, clean, execute } = props.methods;
    const [open, setOpen] = useState(false);
    if (id && oakFullpath) {
        return (<>
                <Modal open={open} width={800} onCancel={() => {
                clean();
                setOpen(false);
            }} footer={<Button type="primary" onClick={async () => {
                    await execute();
                    setOpen(false);
                }} disabled={oakExecutable !== true || oakExecuting}>
                            {t('common::action.confirm')}
                        </Button>}>
                    <ApplicationUpsert oakPath={oakFullpath} oakId={id}/>
                </Modal>
                <Descriptions column={2} bordered>
                    <Descriptions.Item label="id">
                        <Typography.Paragraph copyable>
                            {id}
                        </Typography.Paragraph>
                    </Descriptions.Item>
                    <Descriptions.Item label={t('application:attr.name')}>
                        {name}
                    </Descriptions.Item>
                    <Descriptions.Item label={t('application:attr.description')}>
                        {description}
                    </Descriptions.Item>
                    <Descriptions.Item label={t('application:attr.type')}>
                        {t(`application:v.type.${type}`)}
                    </Descriptions.Item>
                    <Descriptions.Item span={2}>
                        <Row justify="end">
                            <Button type="primary" onClick={() => setOpen(true)}>
                                {t('common::action.update')}
                            </Button>
                        </Row>
                    </Descriptions.Item>
                </Descriptions>
            </>);
    }
}
