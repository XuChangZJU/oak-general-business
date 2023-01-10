import React, { RefObject } from 'react';
import {
    List,
    DatePicker,
    Avatar,
    Popup,
    Form,
    Button,
    Input,
    Radio,
    Space,
} from 'antd-mobile';
import type { DatePickerRef } from 'antd-mobile/es/components/date-picker';
import dayjs from 'dayjs';
import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../../general-app-domain';
import OakGallery from '../../../components/extraFile/gallery';
import Style from './mobile.module.less';



//todo 头像跟绑定手机号 未实现

type DataProps = {
    visible: boolean;
    nickname: string;
    name: string;
    birth: string;
    gender: string;
    mobile: string;
    avatarUrl: string;
    attr: string;
    genderOptions: Array<{ label: string; value: string }>;
    attrs: Record<string, string>;
};

type MethodsProps = {
    setMobile: () => void;
    setAvatar: () => void;
    setVisible: (visible: boolean, attr: string) => void;
    setCustomData: (attr: string, value: string | number) => void;
    onConfirm: (attr: string) => Promise<void>;
};

export default function render(
    props: WebComponentProps<EntityDict, 'user', false, DataProps, MethodsProps>
) {
    const { data, methods } = props;
    const { t, clean, setAvatar, setVisible, setMobile } = methods;
    const { visible, nickname, name, birth, gender, mobile, avatarUrl, attr } =
        data;

    return (
        <div className={Style.container}>
            <List className={Style.list}>
                <List.Item
                    extra={<Avatar src={avatarUrl} className={Style.avatar} />}
                    onClick={() => {
                        setAvatar();
                    }}
                >
                    头像
                </List.Item>
                <List.Item
                    extra={nickname ? nickname : '未设置'}
                    onClick={() => {
                        setVisible(true, 'nickname');
                    }}
                >
                    昵称
                </List.Item>
                <List.Item
                    extra={gender ? gender : '未设置'}
                    onClick={() => {
                        setVisible(true, 'gender');
                    }}
                >
                    性别
                </List.Item>
                <List.Item
                    extra={birth ? dayjs(birth).format('YYYY-MM-DD') : '未设置'}
                    onClick={() => {
                        setVisible(true, 'birth');
                    }}
                >
                    出生年月
                </List.Item>
                <List.Item
                    extra={mobile ? mobile : '未设置'}
                    onClick={() => {
                        setMobile();
                    }}
                >
                    手机号码
                </List.Item>
            </List>

            <Popup
                visible={visible}
                onMaskClick={() => {
                    clean();
                    setVisible(false, attr);
                }}
                bodyStyle={{
                    borderTopLeftRadius: '8px',
                    borderTopRightRadius: '8px',
                    minHeight: '20vh',
                }}
            >
                <AttrUpsert data={data} methods={methods} />
            </Popup>
        </div>
    );
}

function AttrUpsert(props: { data: DataProps; methods: MethodsProps }) {
    const { data, methods } = props;
    const { attr, genderOptions, attrs } = data;

    const { setCustomData, onConfirm, setVisible } = methods;

    const label = attrs[attr as keyof typeof attrs];

    return (
        <div>
            <Form
                footer={
                    <Button
                        block
                        type="submit"
                        color="primary"
                        size="large"
                        onClick={async () => {
                            await onConfirm(attr);
                        }}
                    >
                        提交
                    </Button>
                }
            >
                <Form.Header>修改信息</Form.Header>

                {attr === 'nickname' && (
                    <Form.Item
                        name={attr}
                        label={label}
                        rules={[{ required: true }]}
                    >
                        <Input
                            placeholder={`请输入${label}`}
                            defaultValue={data[attr]}
                            onChange={(value) => {
                                setCustomData(attr, value);
                            }}
                        />
                    </Form.Item>
                )}
                {attr === 'gender' && (
                    <Form.Item
                        name={attr}
                        label={label}
                        rules={[{ required: true }]}
                    >
                        <Radio.Group
                            defaultValue={data[attr]}
                            onChange={(value) => {
                                setCustomData(attr, value);
                            }}
                        >
                            <Space direction="vertical">
                                {genderOptions.map(
                                    (ele: { value: string; label: string }) => (
                                        <Radio value={ele.value}>
                                            {ele.label}
                                        </Radio>
                                    )
                                )}
                            </Space>
                        </Radio.Group>
                    </Form.Item>
                )}
                {attr === 'birth' && (
                    <Form.Item
                        name={attr}
                        label={label}
                        onClick={(
                            e,
                            datePickerRef: RefObject<DatePickerRef>
                        ) => {
                            datePickerRef.current?.open();
                        }}
                    >
                        <DatePicker
                            defaultValue={data[attr] ? dayjs(data[attr]).toDate() : null}
                            onConfirm={(value) => {
                                setCustomData(
                                    attr,
                                    dayjs(value).startOf('day').valueOf()
                                );
                            }}
                            max={dayjs().toDate()}
                        >
                            {(value) =>
                                value
                                    ? dayjs(value).format('YYYY-MM-DD')
                                    : '请选择日期'
                            }
                        </DatePicker>
                    </Form.Item>
                )}
            </Form>
        </div>
    );
}
