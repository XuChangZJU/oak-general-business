import React from 'react';
import { Form, Radio, Button } from 'tdesign-react';
const { FormItem } = Form;

export default function render() {
    const { relation } = this.state;
    const { relations, entity, entityId } = this.props;
    const relationArr =
        typeof relations === 'object'
            ? relations
            : relations && JSON.parse(relations);
    return (
        <div>
            <Form>
                <FormItem
                    label="权限"
                    rules={[
                        {
                            required: true,
                            message: '请选择一个权限',
                            type: 'error',
                        },
                    ]}
                >
                    <Radio.Group
                        value={relation}
                        onChange={(value) => {
                            this.setRadioValue(value);
                        }}
                        options={relationArr.map((ele) => ({
                            value: ele,
                            label:
                                (this.t && this.t(entity + ':r.' + ele)) || ele,
                        }))}
                    ></Radio.Group>
                </FormItem>
                <FormItem style={{ marginLeft: 100 }}>
                    <Button
                        type="submit"
                        theme="primary"
                        style={{ marginRight: 10 }}
                        onClick={() => {
                            this.confirm();
                        }}
                    >
                        提交
                    </Button>
                    <Button
                        type="reset"
                        variant="outline"
                        theme="danger"
                        onClick={() => {
                            this.reset();
                        }}
                    >
                        重置
                    </Button>
                </FormItem>
            </Form>
        </div>
    );
}
