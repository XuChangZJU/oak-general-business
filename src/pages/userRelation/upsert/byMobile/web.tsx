import React from 'react';
import { Form, Input, Button, Space } from 'antd-mobile';
import Style from './mobile.module.less';
import OnUser from '../onUser/index';
import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../../../oak-app-domain';

export default function Render(props: WebComponentProps<EntityDict, 'mobile', false, {
    entity: keyof EntityDict;
    entityId: string;
    relations: EntityDict['relation']['OpSchema'][];
    mobileValue: string;
    mobileValueReady: boolean;
    userId: string;
}, {
    onMobileChange: (value: string) => Promise<void>;
    onConfirm: () => Promise<void>;
    onReset: () => void;
}>) {
    const { mobileValue, mobileValueReady, relations, entity, entityId, userId,
        oakFullpath, oakExecutable, oakDirty } = props.data;
    const { onConfirm, onMobileChange, onReset, t } = props.methods;
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
                        disabled={!oakExecutable}
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
            <Form.Item
                label="手机号码"
                name="mobile"
                rules={[
                    {
                        required: true,
                        message: '手机号不能为空',
                    },
                    {
                        min: 11,
                        message: '请输入11位手机号',
                    },
                    {
                        max: 11,
                        message: '请输入11位手机号',
                    },
                ]}
            >
                <>
                    <Input
                        maxLength={11}
                        value={mobileValue}
                        onChange={(value) => {
                            onMobileChange(value);
                        }}
                        placeholder={t('inputMobile')}
                        type="tel"
                        clearable
                    />
                </>
            </Form.Item>
            {mobileValueReady && userId && (
                <OnUser
                    oakAutoUnmount={true}
                    oakPath={oakFullpath ? `${oakFullpath}.user`
                        : undefined
                    }
                    entity={entity}
                    entityId={entityId}
                    relations={relations}
                    oakId={userId}
                />
            )}
        </Form>
    );
}
