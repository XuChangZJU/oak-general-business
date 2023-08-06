import React, { useState } from 'react';
import {
    Form,
    Radio,
    Button,
    Alert,
    InputNumber,
    Space,
    Modal,
    Select,
} from 'antd';
import UserEntityGrantDetail from '../../../../pages/userEntityGrant/detail';
import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../../../general-app-domain';

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
            unitArr: Array<{ label: string; value: Unit }>;
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
            <Alert
                showIcon
                message={t('shareCode')}
                type="info"
                style={{ marginBottom: 16 }}
            />
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
                    justifyContent: 'flex-end',
                }}
            >
                <Button type="primary" onClick={() => setInit()}>
                    {t('restart')}
                </Button>
            </div>
        </>
    ) : (
        <Form labelCol={{ span: 4 }} wrapperCol={{ span: 8 }}>
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
                        onChange={({ target }) => {
                            const { value } = target;
                            update({ relationId: value });
                        }}
                        options={relations?.map((ele) => ({
                            value: ele.id,
                            label: ele.display || t(`${entity as string}:r.${ele.name}`),
                        }))}
                    />
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
                            onChange={({ target }) => {
                                const { value } = target;
                                update({ number: value });
                            }}
                            options={[
                                { value: 1, label: t('single') },
                                { value: 10000, label: t('unlimited') },
                            ]}
                        />
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
                help={<div style={{ marginBottom: 16 }}>{t('expiresHelp')}</div>}
                tooltip="通过配置实现在规定的时效内扫描二维码不过期的效果。"
            >
                <>
                    <InputNumber
                        min={1}
                        max={maxes[unit]}
                        value={period}
                        onChange={(value) => setPeriod(value!)}
                        // addonAfter="分钟"
                        addonAfter={
                            <Select
                                value={unit}
                                style={{ width: 80 }}
                                onChange={(v) => {
                                    setUnit(v);
                                }}
                            >
                                <Select.Option value="minute">
                                    {t('unit.minute')}
                                </Select.Option>
                                <Select.Option value="hour">
                                    {t('unit.hour')}
                                </Select.Option>
                            </Select>
                        }
                    />
                </>
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 4 }}>
                <Space>
                    <Button type="primary" onClick={() => confirm()} disabled={oakExecutable !== true}>
                        {t('common:action.confirm')}
                    </Button>
                    <Button onClick={() => onBack()}>
                        {t('common:back')}
                    </Button>
                </Space>
            </Form.Item>
        </Form>
    );
    return <div className={Style.container}>{P}</div>;
}
