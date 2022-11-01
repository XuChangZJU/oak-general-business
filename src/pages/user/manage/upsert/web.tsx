import React from 'react';
import { Button, Checkbox, Input, Form, Radio, DatePicker, Row, Col } from 'antd';
import dayjs from 'dayjs';
import Style from './web.module.less';


export default function render(this: any) {
    const { gender, birth, GenderOptions, IDCardTypeOptions } = this.state;
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
                                    onChange={(e) => {
                                        this.setUpdateData('nickname', e.target.value);
                                    }}
                                    value={this.state.nickname}
                                />
                            </>
                        </Form.Item>
                        <Form.Item label="姓名" requiredMark>
                            <>
                                <Input
                                    onChange={(e) => {
                                        this.setUpdateData(
                                            'name',
                                            e.target.value
                                        );
                                    }}
                                    value={this.state.name}
                                />
                            </>
                        </Form.Item>
                        <Form.Item label="出生日期" requiredMark>
                            <>
                                <DatePicker
                                    allowClear={false}
                                    mode="date"
                                    value={
                                        (this.state.birth
                                            ? dayjs(this.state.birth).format(
                                                  'YYYY-MM-DD'
                                              )
                                            : ''
                                    ) as any}
                                    onChange={(value) => {
                                        const val = dayjs(value as any).valueOf();
                                        this.setUpdateData('birth', val);
                                    }}
                                    format="YYYY-MM-DD"
                                />
                            </>
                        </Form.Item>

                        <Form.Item label="性别" requiredMark>
                            <>
                                <Radio.Group
                                    options={GenderOptions}
                                    onChange={(e) => {
                                        this.setUpdateData('gender', e.target.value);
                                    }}
                                    value={this.state.gender}
                                />
                            </>
                        </Form.Item>
                        <Form.Item label="证件类别" requiredMark>
                            <>
                                <Radio.Group
                                    options={IDCardTypeOptions}
                                    onChange={(e) => {
                                        this.setUpdateData('idCardType', e.target.value);
                                    }}
                                    value={this.state.idCardType}
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
                                onClick={(event) => {
                                    this.confirm();
                                }}
                            >
                                确定
                            </Button>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        </div>
    );
}
