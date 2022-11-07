import { useState, useRef } from 'react';
import { Button, Input, Form, TextArea, List } from 'antd-mobile';
import { RightOutlined } from '@ant-design/icons';
import Style from './web.module.less';
import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../../general-app-domain';
import { OakInputIllegalException } from 'oak-domain/lib/types';
import assert from 'assert';
import { InputRef } from 'antd-mobile/es/components/input';
import { TextAreaRef } from 'antd-mobile/es/components/text-area';

export default function Render(props: WebComponentProps<EntityDict, 'address', false, {
    name?: string; phone?: string; districtName?: string; areaText?: string; detail?: string;
}, {
    callAreaPicker: () => void;
    confirm: (data: EntityDict['address']['Update']['data']) => Promise<void>;
}>) {
    const { callAreaPicker, t, confirm } = props.methods;
    const { data } = props;

    const inputName = useRef<InputRef>(null);
    const inputPhone = useRef<InputRef>(null);
    const inputDetail = useRef<TextAreaRef>(null);
    const [name, setName] = useState(undefined as undefined | string);
    const [phone, setPhone] = useState(undefined as undefined | string);
    const [detail, setDetail] = useState(undefined as undefined | string);
    const [help, setHelp] = useState({} as Record<string, string>);

    const nameValue = name === undefined ? data.name : name;
    const phoneValue = phone === undefined ? data.phone : phone;
    const detailValue = detail === undefined ? data.detail : detail;

    const localDirty = phone && phone !== data.phone || name && name !== data.name || detail && detail !== data.detail;

    return (
        <div className={Style.container}>
            <Form layout="horizontal">
                <Form.Item
                    label={t('address:attr.name')}
                    name="name"
                    help={help.name}
                >
                    <>
                        <Input
                            placeholder="姓名"
                            onChange={(v) => setName(v)}
                            value={nameValue}
                            data-attr="name"
                            ref={inputName}
                        />
                    </>
                </Form.Item>
                <Form.Item
                    label={t('address:attr.phone')}
                    name="phone"
                    help={help.phone}
                >
                    <>
                        <Input
                            placeholder="手机号"
                            onChange={(v) => setPhone(v)}
                            value={phoneValue}
                            data-attr="phone"
                            ref={inputPhone}
                        />
                    </>
                </Form.Item>
                <Form.Item
                    label={t('address:attr.area')}
                    name="areaText"
                    arrow
                    onClick={() => callAreaPicker()}
                /* help={
                    this.state.oakFocused?.attr === 'areaId'
                        ? this.state.oakFocused.message
                        : undefined
                } */
                >
                    <>
                        <Input
                            placeholder="所在地区"
                            value={data.areaText}
                            data-attr="areaText"
                            readOnly
                        />
                    </>
                </Form.Item>
                <Form.Item
                    label={t('address:attr.detail')}
                    name="detail"
                    help={help.detail}
                >
                    <>
                        <TextArea
                            maxLength={100}
                            onChange={(v) => setDetail(v)}
                            value={detailValue}
                            data-attr="detail"
                            placeholder="详细地址"
                            ref={inputDetail}
                            showCount
                        />
                    </>
                </Form.Item>
            </Form>
            <div style={{ flex: 1 }} />
            <Button
                block
                disabled={!data.oakDirty && !localDirty}
                color="primary"
                onClick={async () => {
                    try {
                        await confirm({ phone, name, detail })
                    }
                    catch (err) {
                        if (err instanceof OakInputIllegalException) {
                            const [attr] = err.getAttributes();
                            switch (attr) {
                                case 'name': {
                                    inputName.current?.focus();
                                    break;
                                }
                                case 'phone': {
                                    inputPhone.current?.focus();
                                    break;
                                }
                                case 'detail': {
                                    inputDetail.current?.focus();
                                    break;
                                }
                                default: {
                                    assert(false);
                                }
                            }
                            setHelp({
                                [attr]: err.message,
                            });
                        }
                        throw err;
                    }
                }}
            >
                {t('common:action.confirm')}
            </Button>
        </div>
    );
}
