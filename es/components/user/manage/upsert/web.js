import React, { useState } from 'react';
import { Button, Input, Form, Radio, DatePicker, Space } from 'antd-mobile';
import dayjs from 'dayjs';
import Style from './mobile.module.less';
export default function Render(props) {
    const { data, methods } = props;
    const { GenderOptions, IDCardTypeOptions } = data;
    const { t, update, confirm } = methods;
    const [birthPickerVisible, setBirthPickerVisible] = useState(false);
    return (<div className={Style.container}>
            <Form layout="horizontal">
                <Form.Item label={t('user:attr.nickname')} rules={[{ required: true }]}>
                    <Input onChange={(val) => update({ nickname: val })} value={data.nickname || ''}/>
                </Form.Item>
                <Form.Item label={t('user:attr.name')}>
                    <Input onChange={(val) => update({ name: val })} value={data.name || ''}/>
                </Form.Item>
                <Form.Item label={t('user:attr.birth')} onClick={() => {
            setBirthPickerVisible(true);
        }}>
                    <Input value={data.birth
            ? dayjs(data.birth).format('YYYY-MM-DD')
            : ''} readOnly/>
                </Form.Item>

                <Form.Item label={t('user:attr.gender')}>
                    <Radio.Group onChange={(e) => {
            update({
                gender: e,
            });
        }} value={data.gender}>
                        <Space direction="horizontal">
                            {GenderOptions.map((ele, idx) => (<Radio value={ele.value} key={idx} className={Style.radio}>
                                    {ele.label}
                                </Radio>))}
                        </Space>
                    </Radio.Group>
                </Form.Item>
                <Form.Item label={t('user:attr.idCardType')}>
                    <Radio.Group onChange={(e) => {
            update({
                idCardType: e,
            });
        }} value={data.idCardType}>
                        <Space direction="vertical">
                            {IDCardTypeOptions.map((ele, idx) => (<Radio value={ele.value} key={idx} className={Style.radio}>
                                    {ele.label}
                                </Radio>))}
                        </Space>
                    </Radio.Group>
                </Form.Item>
                <Form.Item label={t('user:attr.idNumber')}>
                    <Input onChange={(val) => update({ idNumber: val })} value={data.idNumber || ''}/>
                </Form.Item>
            </Form>
            <DatePicker visible={birthPickerVisible} max={new Date()} min={new Date('1900-01-01')} onConfirm={(value) => {
            const val = value.valueOf();
            update({ birth: val });
        }} onClose={() => {
            setBirthPickerVisible(false);
        }}/>
            <div style={{ flex: 1 }}/>
            <Button block color="primary" onClick={() => confirm()}>
                {t('common::action.confirm')}
            </Button>
        </div>);
}
