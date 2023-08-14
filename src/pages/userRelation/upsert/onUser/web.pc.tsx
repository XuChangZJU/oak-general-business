import React from 'react';
import { Form, Checkbox, Input } from 'antd';
import Style from './web.module.less';
import UserRelation from './userRelation';
import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../../../general-app-domain';
import { firstLetterUpperCase } from 'oak-domain/lib/utils/string';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';

export default function Render(props: WebComponentProps<EntityDict, 'user', false, {
    name: string;
    nickname: string;
    password: string;
    mobileValue: string;
    mobileValueReady: boolean;
    oakId: string;
    relations: string[];
    entity: keyof EntityDict;
    entityId: string;
    isNew: boolean;
}, {
    onMobileChange: (value: string) => Promise<void>;
    onConfirm: () => Promise<void>;
    onReset: () => void;
}>) {
    const { name, isNew, nickname, password, relations, oakFullpath, entity, entityId } = props.data;
    const { t, update } = props.methods;
    return (
        <div className={Style.container}>
            <Form colon labelCol={{ span: 4 }} wrapperCol={{ span: 8 }}>
                <Form.Item style={{ marginBottom: 0 }} label={<div className={Style.tip}>{!isNew ? t('existedUser') : t('newUser')}</div>} colon={false} />
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
                            onChange={(e) => {
                                const strValue = e.target.value;
                                update({
                                    name: strValue,
                                });
                            }}
                            value={name}
                            placeholder={t('placeholder.name')}
                        />
                    </>
                </Form.Item>
                {
                    !isNew ? <Form.Item
                        label={t('user:attr.nickname')}
                        name="nickname"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <>
                            <Input
                                disabled={true}
                                value={nickname}
                            />
                        </>
                    </Form.Item> :
                        <>
                            <Form.Item
                                label={t('user:attr.password')}
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}
                            >
                                <>
                                    <Input.Password
                                        value={password}
                                        onChange={(e) => {
                                            const strValue = e.target.value;
                                            update({
                                                password: strValue,
                                            });
                                        }}
                                        iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                        placeholder={t('placeholder.password')}
                                    />
                                </>
                            </Form.Item>
                        </>

                }
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
                        oakPath={oakFullpath ? `${oakFullpath}.user${firstLetterUpperCase(entity)}$user`
                            : undefined
                        }
                        entity={entity}
                        entityId={entityId}
                        relations={relations}
                    />
                </Form.Item>
            </Form>
        </div>
    );
}
