import React from 'react';
import { Button, Form, Input, Tooltip, Tabs } from 'antd';
import { Style as StyleType, ColorType } from '../../../types/Style';
import { set, get } from 'oak-domain/lib/utils/lodash';

import Style from './index.module.less';

type StyleProps = {
    value?: StyleType | null;
    onChange: (value: StyleType) => void;
};

const Colors: ColorType[] = ['primary', 'success', 'error', 'warning', 'info'];

function Color(props: { value: StyleType['color'], setValue: (path: string, value: string) => void }) {
    const { value = {}, setValue } = props;;
    return (
        <Form>
            {Colors.map((ele) => (
                <Form.Item
                    key={ele}
                    label={ele}
                    requiredMark
                    name="folder"
                    tooltip={`设置系统【${ele}】颜色`}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <>
                        <Input
                            onChange={(e) => {
                                setValue(ele, e.target.value);
                            }}
                            value={get(value, ele)}
                        />
                    </>
                </Form.Item>
            ))}
        </Form>
    );
}

export default function Render(props: StyleProps) {
    const { value: styleValue, onChange } = props;

    const setStyle = (path: string, value: string) => {
        const newStyle = set(styleValue || {}, path, value);
        onChange(newStyle);
    };

    return (
        <div>
            <Tabs
                onChange={() => {}}
                type="card"
                items={[
                    {
                        label: '颜色',
                        key: 'color',
                        component: Color,
                    },
                ].map((ele, i) => {
                    const ItemComponent = ele.component;
                    return {
                        label: ele.label,
                        key: ele.key,
                        children: (
                            <ItemComponent
                                value={get(styleValue, ele.key)}
                                setValue={(path, value) => {
                                    setStyle(`${ele.key}.${path}`, value);
                                }}
                            />
                        ),
                    };
                })}
            />
        </div>
    );
}

