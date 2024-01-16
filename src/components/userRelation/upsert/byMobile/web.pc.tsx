import React, { useState } from 'react';
import { Form, Input, Button, Space } from 'antd';
import Style from './web.pc.module.less';
import OnUser from '../onUser/index';
import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../../../oak-app-domain';

export default function Render(
    props: WebComponentProps<
        EntityDict,
        'mobile',
        false,
        {
            entity: keyof EntityDict;
            entityId: string;
            relations: EntityDict['relation']['OpSchema'][];
            mobileValue: string;
            mobileValueReady: boolean;
            userId: string;
            legal: boolean;
            isNew: boolean;
            passwordRequire: boolean;
            allowUpdateName?: boolean;
            allowUpdateNickname?: boolean;
        },
        {
            onMobileChange: (value: string) => Promise<void>;
            onConfirm: () => Promise<void>;
            onReset: () => void;
        }
    >
) {
    const {
        mobileValue,
        mobileValueReady,
        relations,
        entity,
        entityId,
        userId,
        oakFullpath,
        oakExecutable,
        legal,
        isNew,
        passwordRequire,
        allowUpdateName,
        allowUpdateNickname,
    } = props.data;
    const { onConfirm, onMobileChange, onReset, t } = props.methods;
    const [passwordConfirm, setPasswordConfirm] = useState(true);
    return (
        <div className={Style.container}>
            <Form colon labelCol={{ span: 4 }} wrapperCol={{ span: 8 }}>
                <Form.Item
                    label="手机号码"
                    required
                    // name="mobile"
                    rules={[
                        {
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
                    <Input
                        maxLength={11}
                        value={mobileValue}
                        onChange={(e) => {
                            const strValue = e.target.value;
                            onMobileChange(strValue);
                        }}
                        placeholder="请输入手机号码"
                        type="tel"
                    />
                </Form.Item>
            </Form>
            {mobileValueReady && (
                <OnUser
                    oakAutoUnmount={true}
                    oakPath={`${oakFullpath}.user`}
                    entity={entity}
                    entityId={entityId}
                    relations={relations}
                    setPasswordConfirm={setPasswordConfirm}
                    passwordRequire={passwordRequire}
                    allowUpdateName={allowUpdateName}
                    allowUpdateNickname={allowUpdateNickname}
                />
            )}
            <Form colon labelCol={{ span: 4 }} wrapperCol={{ span: 8 }}>
                <Form.Item wrapperCol={{ offset: 4 }}>
                    <Space>
                        <Button
                            style={{ flex: 2 }}
                            type="primary"
                            htmlType="reset"
                            onClick={async () => {
                                await onConfirm();
                                setPasswordConfirm(true);
                            }}
                            disabled={
                                !legal ||
                                !oakExecutable ||
                                (isNew && !passwordConfirm)
                            }
                        >
                            {t('common::action.confirm')}
                        </Button>
                        <Button
                            htmlType="reset"
                            onClick={() => onReset()}
                            style={{ flex: 1 }}
                        >
                            {t('common::reset')}
                        </Button>
                    </Space>
                </Form.Item>
            </Form>
        </div>
    );
}
