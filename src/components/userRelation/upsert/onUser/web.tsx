import React from 'react';
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
    } = props.data;
    const { t, update } = props.methods;

    return (
        <>
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
                        disabled={!isNew}
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
            {!isNew ? (
                <Form.Item
                    label={t('user:attr.nickname')}
                    name="nickname"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <>
                        <Input disabled={true} value={nickname} />
                    </>
                </Form.Item>
            ) : (
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
            )}
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
        </>
    );
}