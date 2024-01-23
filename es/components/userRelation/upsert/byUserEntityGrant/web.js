import React from 'react';
import { Form, Radio, Checkbox, Button, Input, Space, NoticeBar, Selector, Switch, } from 'antd-mobile';
import UserEntityGrantShare from '../../../userEntityGrant/share';
import Style from './web.module.less';
export default function render(props) {
    const { relations, userEntityGrant, userEntityGrantId, period, unit, maxes, rules, oakExecutable, } = props.data;
    const { relationIds, type, multiple, relationEntity, rule } = userEntityGrant || {};
    const { update, t, onBack, confirm, setInit, setPeriod, setUnit } = props.methods;
    const P = !!userEntityGrantId ? (<>
            <NoticeBar content={t('shareCode')} color="info"/>
            <UserEntityGrantShare oakId={userEntityGrantId} oakAutoUnmount={true} oakPath="$userRelation/upsert/byUserEntityGrant-userEntityGrant/detail"></UserEntityGrantShare>
            <div style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
        }}>
                <Button color="primary" onClick={() => setInit()} block>
                    {t('restart')}
                </Button>
            </div>
        </>) : (<Form>
            <Form.Item label={t('userEntityGrant:attr.relationIds')} required>
                <Checkbox.Group value={relationIds || []} onChange={(val) => {
            update({ relationIds: val });
        }}>
                    <Space direction="vertical">
                        {relations?.map((ele) => (<Checkbox value={ele.id}>
                                {ele.display ||
                t(`${relationEntity}:r.${ele.name}`)}
                            </Checkbox>))}
                    </Space>
                </Checkbox.Group>
            </Form.Item>
            {relationIds?.length > 1 && (<Form.Item label={t('userEntityGrant:attr.rule')} required help={t('helpRule')}>
                    <Radio.Group value={rule} onChange={(val) => update({
                rule: val,
            })}>
                        <Space direction="vertical">
                            {rules.map((ele) => (<Radio value={ele}>
                                    {t(`userEntityGrant:v.rule.${ele}`)}
                                </Radio>))}
                        </Space>
                    </Radio.Group>
                </Form.Item>)}
            {type === 'grant' && (<Form.Item label={t('multiple')} required help={t('helpMultiple')}>
                    <Switch checked={multiple || false} onChange={(val) => update({ multiple: val })}/>
                </Form.Item>)}
            <Form.Item label={t('userEntityGrant:attr.expiresAt')} name="period" rules={[
            {
                required: true,
                message: t('chooseExpiresAt'),
            },
        ]} help={<div style={{ marginBottom: 16 }}>{t('expiresAt')}</div>} extra={<Selector options={[
                {
                    label: t('unit.hour'),
                    value: 'hour',
                },
                {
                    label: t('unit.minute'),
                    value: 'minute',
                },
            ]} defaultValue={['minute']} value={unit && [unit]} onChange={(arr) => setUnit(arr[0])}/>}>
                <>
                    <Input min={1} max={maxes[unit]} value={`${period}`} type="number" placeholder={t('chooseExpiresAt')} onChange={(value) => {
            const v = parseInt(value);
            setPeriod(v);
        }}/>
                </>
            </Form.Item>
            <div className={Style.btnContainer}>
                <Button color="primary" onClick={() => confirm()} disabled={oakExecutable !== true} style={{ flex: 2 }}>
                    {t('common::action.confirm')}
                </Button>
                <Button onClick={() => onBack()} style={{ flex: 1 }}>
                    {t('common::back')}
                </Button>
            </div>
        </Form>);
    return <div className={Style.container}>{P}</div>;
}
