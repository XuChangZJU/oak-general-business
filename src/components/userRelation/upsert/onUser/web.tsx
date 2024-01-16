import React, { useEffect } from 'react';
import { Form, Checkbox, Input } from 'antd-mobile';
import UserRelation from './userRelation';
import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../../../oak-app-domain';

export default function Render(
    props: WebComponentProps<
        EntityDict,
        'user',
        false,
        {
            name: string;
            nickname: string;
            password: string;
            mobileValue: string;
            mobileValueReady: boolean;
            oakId: string;
            relations: EntityDict['relation']['OpSchema'][];
            entity: keyof EntityDict;
            entityId: string;
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
        name,
        isNew,
        nickname,
        password,
        relations,
        oakFullpath,
        entity,
        entityId,
        passwordRequire,
        allowUpdateName,
        allowUpdateNickname,
    } = props.data;
        
    const { t, update } = props.methods;
    const [form] = Form.useForm();


    useEffect(() => {
        form.setFieldsValue({
            name,
        });
    }, [name]);

    useEffect(() => {
        form.setFieldsValue({
            nickname,
        });
    }, [nickname]);

    return (
        <Form form={form}>
            <Form.Item
                style={{ marginBottom: 0 }}
                label={!isNew ? t('existedUser') : t('newUser')}
            />
            <Form.Item
                label={t('user:attr.name')}
                name="name"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <>
                    <Input
                        disabled={!isNew && !allowUpdateName}
                        onChange={(value) => {
                            update({
                                name: value,
                            });
                        }}
                        value={name}
                        placeholder={t('placeholder.name')}
                    />
                </>
            </Form.Item>
            <Form.Item label={t('user:attr.nickname')} name="nickname">
                <>
                    <Input
                        disabled={!isNew && !allowUpdateNickname}
                        value={nickname}
                        onChange={(value) => {
                            update({
                                nickname: value,
                            });
                        }}
                        placeholder={t('placeholder.nickname')}
                    />
                </>
            </Form.Item>
            {isNew ? (
                <Form.Item
                    label={t('user:attr.password')}
                    name="password"
                    rules={[
                        {
                            required: passwordRequire,
                        },
                    ]}
                >
                    <>
                        <Input
                            value={password}
                            onChange={(value) => {
                                update({
                                    password: value,
                                });
                            }}
                            placeholder={t('placeholder.password')}
                        />
                    </>
                </Form.Item>
            ) : null}
            <Form.Item
                label={t('auth')}
                rules={[
                    {
                        required: true,
                    },
                ]}
                name="relation"
            >
                <UserRelation
                    oakAutoUnmount={true}
                    oakPath={`${oakFullpath}.userRelation$user`}
                    entity={entity}
                    entityId={entityId}
                    relations={relations}
                />
            </Form.Item>
        </Form>
    );
}