import React, { useState } from 'react';
import { Tabs, Card, Descriptions, Typography, Modal, Button, Row } from 'antd';
import { WebComponentProps } from 'oak-frontend-base';
import Style from './web.module.less';

import PlatformUpsert from '../upsert';
import { EntityDict } from '../../../oak-app-domain';
import { Config } from '../../../types/Config';

export default function Render(
    props: WebComponentProps<
        EntityDict,
        'platform',
        false,
        {
            name: string;
            description: string;
        }
    >
) {
    const { oakId, name, description, oakExecutable, oakExecuting, oakFullpath } = props.data;
    const { t, execute, clean } = props.methods;

    const [open, setOpen] = useState(false);

    if (oakFullpath) {
        return (
            <>
                <Modal
                    open={open}
                    onCancel={() => {
                        clean();
                        setOpen(false);
                    }}
                    width={800}
                    footer={
                        <Button
                            type='primary'
                            onClick={async () => {
                                await execute();
                                setOpen(false);
                            }}
                            disabled={oakExecutable !== true || oakExecuting}
                        >
                            {t('common::action.confirm')}
                        </Button>
                    }
                >
                    <PlatformUpsert
                        oakId={oakId}
                        oakPath={oakFullpath}
                    />
                </Modal>
                <Descriptions column={2} bordered>
                    <Descriptions.Item label="id">
                        <Typography.Paragraph copyable>
                            {oakId}
                        </Typography.Paragraph>
                    </Descriptions.Item>
                    <Descriptions.Item
                        label={t('platform:attr.name')}
                    >
                        {name}
                    </Descriptions.Item>
                    <Descriptions.Item
                        label={t(
                            'platform:attr.description'
                        )}
                    >
                        {description}
                    </Descriptions.Item>
                    <Descriptions.Item>
                        <Row
                            justify="end"
                        >
                            <Button
                                type="primary"
                                onClick={() => setOpen(true)}
                            >
                                {t('common::action.update')}
                            </Button>
                        </Row>
                    </Descriptions.Item>
                </Descriptions>
            </>
        );
    }
    return null;
}