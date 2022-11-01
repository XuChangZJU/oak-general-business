import React from 'react';
import { Form, Radio, Button } from 'antd';
import Style from './web.module.less';

export default function render(this: any) {
    const { relation } = this.state;
    const { relations, entity, entityId } = this.props;
    const relationArr =
        typeof relations === 'object'
            ? relations
            : relations && JSON.parse(relations);
    return (
        <div className={Style.pageWithPadding}>
            <div className={Style.formContainer}>
                <Form>
                    <Form.Item
                        label="权限"
                        rules={[
                            {
                                required: true,
                                message: '请选择一个权限',
                            },
                        ]}
                    >
                        <Radio.Group
                            value={relation}
                            onChange={(value) => {
                                this.setRadioValue(value);
                            }}
                            options={relationArr.map((ele: string) => ({
                                value: ele,
                                label:
                                    (this.t && this.t(entity + ':r.' + ele)) ||
                                    ele,
                            }))}
                        ></Radio.Group>
                    </Form.Item>
                    <Form.Item style={{ marginLeft: 100 }}>
                        <Button
                            htmlType="submit"
                            type="primary"
                            style={{ marginRight: 10 }}
                            onClick={() => {
                                this.confirm();
                            }}
                        >
                            提交
                        </Button>
                        <Button
                            htmlType="reset"
                            onClick={() => {
                                this.reset();
                            }}
                        >
                            重置
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
}
