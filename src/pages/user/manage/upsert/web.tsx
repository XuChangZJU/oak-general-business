import React, { Component } from 'react';
import { Button, Checkbox, Input, Form, Radio, DatePicker, Row, Col } from 'tdesign-react';
import { DateTime } from 'luxon';
const { FormItem } = Form;

export default function render(this: any) {
    const { gender, birth, GenderOptions, IDCardTypeOptions } = this.state;
    return (
        <div
            style={{
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                padding: 16,
            }}
        >
            <Row>
                <Col xs={12} sm={4}>
                    <Form labelWidth="100px" colon={true}>
                        <FormItem label="昵称" requiredMark>
                            <>
                                <Input
                                    onChange={(value) => {
                                        this.setUpdateData('nickname', value);
                                    }}
                                    value={this.state.nickname}
                                />
                            </>
                        </FormItem>
                        <FormItem label="姓名" requiredMark>
                            <>
                                <Input
                                    onChange={(value) => {
                                        this.setUpdateData('name', value);
                                    }}
                                    value={this.state.name}
                                />
                            </>
                        </FormItem>
                        <FormItem label="出生日期" requiredMark>
                            <>
                                <DatePicker
                                    allowInput={false}
                                    clearable={false}
                                    enableTimePicker={false}
                                    mode="date"
                                    presetsPlacement="bottom"
                                    value={
                                        this.state.birth
                                            ? DateTime.fromMillis(
                                                  this.state.birth
                                              ).toFormat('yyyy-LL-dd')
                                            : ''
                                    }
                                    onChange={(value) => {
                                        const val =
                                            DateTime.fromISO(value).toMillis();
                                        this.setUpdateData('birth', val);
                                    }}
                                    valueType="YYYY-MM-DD"
                                />
                            </>
                        </FormItem>

                        <FormItem label="性别" requiredMark>
                            <>
                                <Radio.Group
                                    options={GenderOptions}
                                    onChange={(value) => {
                                        this.setUpdateData('gender', value);
                                    }}
                                    value={this.state.gender}
                                />
                            </>
                        </FormItem>
                        <FormItem label="证件类别" requiredMark>
                            <>
                                <Radio.Group
                                    options={IDCardTypeOptions}
                                    onChange={(value) => {
                                        this.setUpdateData('idCardType', value);
                                    }}
                                    value={this.state.idCardType}
                                />
                            </>
                        </FormItem>
                        <FormItem label="证件号" requiredMark>
                            <>
                                <Input
                                    onChange={(value) => {
                                        this.setUpdateData('idNumber', value);
                                    }}
                                />
                            </>
                        </FormItem>
                        <FormItem style={{ marginLeft: 100 }}>
                            <Button
                                theme="primary"
                                onClick={(event) => {
                                    this.confirm();
                                }}
                            >
                                确定
                            </Button>
                        </FormItem>
                    </Form>
                </Col>
            </Row>
        </div>
    );
}
