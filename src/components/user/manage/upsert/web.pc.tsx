import React from 'react';
import { Button, Checkbox, Input, Form, Radio, DatePicker, Space } from 'antd';
import dayjs from 'dayjs';
import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../../../oak-app-domain';
import PageHeader from '../../../../components/common/pageHeader';
import Style from './web.module.less';


export default function Render(
    props: WebComponentProps<
        EntityDict,
        'user',
        false,
        {
            nickname?: string;
            name?: string;
            gender?: string;
            birth?: string;
            idCardType?: string;
            idNumber?: string;
            GenderOptions: Array<{ value: 'male' | 'female'; label: string }>;
            IDCardTypeOptions: Array<{ value: string; label: string }>;
        },
        {
            confirm: () => void;
        }
    >
) {
    const { data, methods } = props;
    const { GenderOptions, IDCardTypeOptions } = data;

    const { t, update, confirm } = methods;

    return (
        <PageHeader>
            <div className={Style.container}>
                <Form
                    layout="horizontal"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600 }}
                >
                    <Form.Item label={t('user:attr.nickname')} required>
                        <Input
                            onChange={(e) =>
                                update({ nickname: e.target.value })
                            }
                            value={data.nickname || ''}
                        />
                    </Form.Item>
                    <Form.Item label={t('user:attr.name')}>
                        <Input
                            onChange={(e) => update({ name: e.target.value })}
                            value={data.name || ''}
                        />
                    </Form.Item>
                    <Form.Item label={t('user:attr.birth')}>
                        <DatePicker
                            value={data.birth ? dayjs(data.birth) : undefined}
                            format={'YYYY/MM/DD'}
                            onChange={(value) =>
                                update({ birth: dayjs(value).valueOf() })
                            }
                        />
                    </Form.Item>

                    <Form.Item label={t('user:attr.gender')}>
                        <Radio.Group
                            onChange={(e) => {
                                update({
                                    gender: e.target
                                        .value as EntityDict['user']['OpSchema']['gender'],
                                });
                            }}
                            value={data.gender}
                        >
                            {GenderOptions.map((ele, idx) => (
                                <Radio value={ele.value} key={idx}>
                                    {ele.label}
                                </Radio>
                            ))}
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item label={t('user:attr.idCardType')}>
                        <Radio.Group
                            onChange={(e) => {
                                update({
                                    idCardType: e.target
                                        .value as EntityDict['user']['OpSchema']['idCardType'],
                                });
                            }}
                            value={data.idCardType}
                        >
                            {IDCardTypeOptions.map((ele, idx) => (
                                <Radio
                                    value={ele.value}
                                    key={idx}
                                    className={Style.radio}
                                >
                                    {ele.label}
                                </Radio>
                            ))}
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item label={t('user:attr.idNumber')}>
                        <Input
                            onChange={(e) =>
                                update({ idNumber: e.target.value })
                            }
                            value={data.idNumber || ''}
                        />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button
                            type="primary"
                            color="primary"
                            onClick={() => confirm()}
                        >
                            {t('common::action.confirm')}
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </PageHeader>
    );
}
