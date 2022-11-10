import React, { useState } from 'react';
import { Button, Checkbox, Input, Form, Radio, DatePicker, Row, Col, CheckboxOptionType } from 'antd';
import dayjs from 'dayjs';
import Style from './web.module.less';
import { EntityDict } from '../../../../general-app-domain';
import { WebComponentProps } from 'oak-frontend-base';


export default function render(props: WebComponentProps<EntityDict, 'user', false, {
    nickname?: string;
    name?: string;
    gender?: string;
    birth?: string;
    idCardType?: string;
    idNumber?: string;
    GenderOptions: Array<CheckboxOptionType>;
    IDCardTypeOptions: Array<CheckboxOptionType>;
}, {

}>) {
    const { data, methods } = props;
    const { GenderOptions, IDCardTypeOptions } = data;
    const [nickname, setNickname] = useState(undefined as undefined | string);
    const [name, setName] = useState(undefined as undefined | string);
    const [birth, setBirth] = useState(undefined as undefined | number);
    const nicknameValue = nickname !== undefined ? nickname : data.nickname;
    const nameValue = name !== undefined ? name : data.name;
    const birthValue = birth !== undefined ? birth : data.birth;
    const [gender, setGender] = useState(undefined as undefined | string);
    const genderValue = gender !== undefined ? gender : data.gender;
    const [idCardType, setIdCardType] = useState(undefined as undefined | string);
    const idCardTypeValue = idCardType !== undefined ? idCardType : data.idCardType;

    const confirmEnabled = nickname && nickname !== data.nickname || 
    
    const { execute, t } = methods;

    return (
        <div
            className={Style.container}
        >
            <Row>
                <Col xs={12} sm={4}>
                    <Form colon={true}>
                        <Form.Item label="昵称" requiredMark>
                            <>
                                <Input
                                    onChange={(e) => setNickname(e.target.value)}
                                    value={nicknameValue}
                                />
                            </>
                        </Form.Item>
                        <Form.Item label="姓名" requiredMark>
                            <>
                                <Input
                                    onChange={(e) => setName(e.target.value)}
                                    value={nameValue}
                                />
                            </>
                        </Form.Item>
                        <Form.Item label="出生日期" requiredMark>
                            <>
                                <DatePicker
                                    allowClear={false}
                                    mode="date"
                                    value={
                                        (birthValue
                                            ? dayjs(birthValue).format(
                                                  'YYYY-MM-DD'
                                              )
                                            : ''
                                    ) as any}
                                    onChange={(value) => {
                                        const val = dayjs(value as any).valueOf();
                                        setBirth(val);
                                    }}
                                    format="YYYY-MM-DD"
                                />
                            </>
                        </Form.Item>

                        <Form.Item label="性别" requiredMark>
                            <>
                                <Radio.Group
                                    options={GenderOptions}
                                    onChange={async (e) => {
                                        const id = await generateNewId();
                                        setGender(e.target.value);
                                    }}
                                    value={genderValue}
                                />
                            </>
                        </Form.Item>
                        <Form.Item label="证件类别" requiredMark>
                            <>
                                <Radio.Group
                                    options={IDCardTypeOptions}
                                    onChange={(e) => setIdCardType(e.target.value)}
                                    value={idCardTypeValue}
                                />
                            </>
                        </Form.Item>
                        <Form.Item label="证件号" requiredMark>
                            <>
                                <Input
                                    onChange={(e) => {
                                        this.setUpdateData(
                                            'idNumber',
                                            e.target.value
                                        );
                                    }}
                                />
                            </>
                        </Form.Item>
                        <Form.Item>
                            <Button
                                type="primary"
                                onClick={() => execute({
                                    nickname,
                                    name,
                                    gender,
                                    birth,
                                    idCardType,                                    
                                } as EntityDict['user']['Update']['data'])}
                            >
                                {t('common:action.confirm')}
                            </Button>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        </div>
    );
}
