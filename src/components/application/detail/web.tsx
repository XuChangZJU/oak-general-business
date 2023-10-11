import React, { ReactNode, useState } from 'react';
import { Tabs, Row, Descriptions, Typography, Button, Modal } from 'antd';
import PageHeader from '../../../components/common/pageHeader';
import Style from './web.module.less';

import {
    AppType,
    WebConfig,
    WechatPublicConfig,
    WechatMpConfig,
} from '../../../oak-app-domain/Application/Schema';

import { EntityDict } from '../../../oak-app-domain';
import { WebComponentProps } from 'oak-frontend-base';
import ApplicationUpsert from '../upsert';

type Config = WebConfig | WechatPublicConfig | WechatMpConfig;

export default function Render(
    props: WebComponentProps<
        EntityDict,
        'application',
        false,
        {
            name: string;
            description: string;
            id: string;
            tabValue: 'detail';
            type: EntityDict['application']['Schema']['type'];
        }
    >
) {
    const { id, name, description, type, oakFullpath, oakExecutable, oakExecuting } = props.data;
    const { t, clean, execute } = props.methods;
    const [open, setOpen] = useState(false);

    if (id && oakFullpath) {
        return (
            <>
                <Modal
                    open={open}
                    width={800}
                    onCancel={() => {
                        clean();
                        setOpen(false);
                    }}
                    footer={
                        <Button
                            type="primary"
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
                    <ApplicationUpsert
                        oakPath={oakFullpath}
                        oakId={id}
                    />
                </Modal>
                <Descriptions column={2} bordered>
                    <Descriptions.Item label="id">
                        <Typography.Paragraph copyable>
                            {id}
                        </Typography.Paragraph>
                    </Descriptions.Item>
                    <Descriptions.Item
                        label={t('application:attr.name')}
                    >
                        {name}
                    </Descriptions.Item>
                    <Descriptions.Item
                        label={t(
                            'application:attr.description'
                        )}
                    >
                        {description}
                    </Descriptions.Item>
                    <Descriptions.Item
                        label={t('application:attr.type')}
                    >
                        {t(`application:v.type.${type}`)}
                    </Descriptions.Item>
                    <Descriptions.Item span={2}>
                        <Row justify="end">
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
}