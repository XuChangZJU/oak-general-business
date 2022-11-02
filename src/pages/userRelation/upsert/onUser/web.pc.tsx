import React from 'react';
import { Form, Checkbox } from 'antd';
import Style from './web.module.less';
import Input from '../../../../components/common/input';

export default function render(this: any) {
    const { relations, entity, oakId } = this.props;
    const { name, nickname, password, userRelations } = this.state;
    return (
        <div className={Style.container}>
            <Form colon labelCol={{ span: 4 }} wrapperCol={{ span: 8 }}>
                <Form.Item style={{ marginBottom: 0 }} label={<div className={Style.tip}>{oakId ? '现有用户' : '新建用户'}</div>} colon={false} />
                <Form.Item
                    label="姓名"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: '姓名不能为空',
                        },
                    ]}
                >
                    <>
                        <Input
                            disabled={!!oakId}
                            onChange={async (e) => {
                                const strValue = e.target.value;
                                this.addOperation({
                                    action: 'create',
                                    data: {
                                        name: strValue,
                                    },
                                });
                            }}
                            value={name}
                            placeholder="请输入姓名"
                        />
                    </>
                </Form.Item>
                {
                    !!oakId ? <Form.Item
                    label="昵称"
                    name="nickname"
                >
                    <>
                        <Input
                            disabled={true}
                            value={nickname}
                        />
                    </>
                </Form.Item> : <Form.Item
                        label="密码"
                        name="mobile"
                        rules={[
                            {
                                required: true,
                                message: '密码不能为空',
                            },
                        ]}
                    >
                        <>
                            <Input
                                value={password}
                                onChange={async (e) => {
                                    const strValue = e.target.value;
                                    this.addOperation({
                                        action: 'create',
                                        data: {
                                            password: strValue,
                                        },
                                    });
                                }}
                                placeholder="不少于八位"
                            />
                        </>
                    </Form.Item>
                }
                <Form.Item
                    label="权限"
                    rules={[
                        {
                            required: true,
                            message: '请至少选择一个权限',
                        },
                    ]}
                    name="relation"
                >
                    <>
                        <Checkbox.Group
                            value={(userRelations || []).map((ele: any) => ele.relation)}
                            onChange={(value) => {
                                this.onRelationChange(value);
                            }}
                            options={relations.map((ele: string) => ({
                                value: ele,
                                label:
                                    (this.t && this.t(`${entity}:r.${ele}`)) ||
                                    ele,
                            }))}
                        ></Checkbox.Group>
                    </>
                </Form.Item>
            </Form>
        </div>
    );
}
