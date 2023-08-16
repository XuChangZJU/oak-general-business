import React, { useState } from 'react';
import {
    Form,
    Radio,
    Button,
    Input,
    Space,
    NoticeBar,
    Selector,
} from 'antd-mobile';
import UserEntityGrantDetail from '../../../../pages/userEntityGrant/detail';
import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../../../oak-app-domain';

import Style from './web.module.less';

type Unit = 'minute' | 'hour' | 'day';

export default function render(
    props: WebComponentProps<
        EntityDict,
        'userEntityGrant',
        false,
        {
            relations: EntityDict['relation']['OpSchema'][];
            period: number;
            userEntityGrant: EntityDict['userEntityGrant']['OpSchema'];
            userEntityGrantId: string;
            unit: Unit;
            maxes: Record<Unit, number>;
        },
        {
            confirm: () => Promise<void>;
            onBack: () => void;
            setInit: () => void;
            setPeriod: (p: number) => void;
            setUnit: (u: Unit) => void;
        }
    >
) {
    const {
        relations,
        userEntityGrant,
        userEntityGrantId,
        period,
        unit,
        maxes,
        oakExecutable,
    } = props.data;
    const { relationId, type, number, entity } = userEntityGrant || {};
    const { update, t, onBack, confirm, setInit, setPeriod, setUnit } =
        props.methods;

    const P = !!userEntityGrantId ? (
        <>
            <NoticeBar content={t('shareCode')} color='info' />
            <UserEntityGrantDetail
                showBack={false}
                oakId={userEntityGrantId}
                oakAutoUnmount={true}
                oakPath="$userRelation/upsert/byUserEntityGrant-userEntityGrant/detail"
            ></UserEntityGrantDetail>
            <div
                style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                }}
            >
                <Button color="primary" onClick={() => setInit()} block>
                    {t('restart')}
                </Button>
            </div>
        </>
    ) : (
        <Form>
            <Form.Item
                label={t('userEntityGrant:attr.relation')}
                name="relation"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <>
                    <Radio.Group
                        value={relationId}
                        onChange={(value) => {
                            update({ relationId: value as string });
                        }}
                    >
                        {
                            relations.map(
                                (ele) => <Radio value={ele.id} style={{ marginRight: 20 }}>
                                    {ele.display || t(`${entity as string}:r.${ele.name}`)}
                                </Radio>
                            )
                        }
                    </Radio.Group>
                </>
            </Form.Item>
            {type === 'grant' && (
                <Form.Item
                    label={t('userEntityGrant:attr.number')}
                    name="number"
                    rules={[
                        {
                            required: true,
                            message: t('chooseNumber'),
                        },
                    ]}
                >
                    <>
                        <Radio.Group
                            value={number}
                            onChange={(value) => {
                                update({ number: value as number });
                            }}
                        >
                            <Radio value={1} style={{ marginRight: 20 }}>{t('single')}</Radio>
                            <Radio value={10000}>{t('unlimited')}</Radio>
                        </Radio.Group>
                    </>
                </Form.Item>
            )}
            <Form.Item
                label={t('userEntityGrant:attr.expiresAt')}
                name="period"
                rules={[
                    {
                        required: true,
                        message: t('chooseExpiresAt'),
                    },
                ]}
                help={<div style={{ marginBottom: 16 }}>{t('expiresAt')}</div>}
                extra={
                    <Selector
                        options={[
                            {
                                label: t('unit.hour'),
                                value: 'hour',
                            },
                            {
                                label: t('unit.minute'),
                                value: 'minute',
                            }
                        ]}
                        defaultValue={['minute']}
                        value={unit && [unit]}
                        onChange={(arr) => setUnit(arr[0])}
                    />
                }
            >
                <>
                    <Input
                        min={1}
                        max={maxes[unit]}
                        value={`${period}`}
                        type="number"
                        placeholder={t('chooseExpiresAt')}
                        onChange={(value) => {
                            const v = parseInt(value);
                            setPeriod(v);
                        }}
                    />
                </>
            </Form.Item>
            <Form.Item>
                <Space>
                    <Button color="primary" onClick={() => confirm()} disabled={oakExecutable !== true}>
                        {t('common::action.confirm')}
                    </Button>
                    <Button onClick={() => onBack()}>
                        {t('common::back')}
                    </Button>
                </Space>
            </Form.Item>
        </Form>
    );
    return <div className={Style.container}>{P}</div>;
}
