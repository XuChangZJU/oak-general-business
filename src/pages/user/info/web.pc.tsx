import React from 'react';
import {
    Avatar,
    Space,
    Button,
    Input,
    Radio,
    DatePicker,
    Form,
    Typography,
} from 'antd';
import dayjs from 'dayjs';
import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../../general-app-domain';
import PageHeader from '../../../components/common/pageHeader';
import OakAvatar from '../../../components/extraFile/avatar';
import Style from './web.module.less';


export default function Render(
    props: WebComponentProps<
        EntityDict,
        'user',
        false,
        {
            visible: boolean;
            nickname: string;
            name: string;
            birth: string;
            gender: string;
            mobile: string;
            avatarUrl: string;
            attr: string;
            showBack: boolean;
            genderOptions: Array<{ label: string; value: string }>;
        },
        {
            updateMyInfo: () => void;
            goAddMobile: () => void;
        }
    >
) {
    const { data, methods } = props;
    const { t, updateMyInfo, goAddMobile } = methods;
    const {
        nickname,
        name,
        birth,
        gender,
        mobile,
        avatarUrl,
        showBack,
        oakExecuting,
        genderOptions,
        oakFullpath,
        oakDirty,
    } = data;

    return (
        <PageHeader title="个人信息" showBack={showBack}>
            <div className={Style.container}>
                <Form
                    labelCol={{ xs: { span: 4 }, md: { span: 6 } }}
                    wrapperCol={{ xs: { span: 16 }, md: { span: 12 } }}
                >
                    <Form.Item label={t('avatar')} name="extraFile$entity">
                        <>
                            <OakAvatar
                                oakAutoUnmount={true}
                                oakPath={
                                    oakFullpath
                                        ? oakFullpath + '.extraFile$entity'
                                        : undefined
                                }
                                entity="user"
                            />
                        </>
                    </Form.Item>
                    <Form.Item
                        label={t('user:attr.name')}
                        name="name"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <>
                            <Input
                                placeholder=""
                                onChange={(e) =>
                                    methods.update({
                                        name: e.target.value,
                                    })
                                }
                                value={name}
                            />
                        </>
                    </Form.Item>
                    <Form.Item
                        label={t('user:attr.nickname')}
                        name="nickname"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <>
                            <Input
                                placeholder=""
                                onChange={(e) =>
                                    methods.update({
                                        nickname: e.target.value,
                                    })
                                }
                                value={nickname}
                            />
                        </>
                    </Form.Item>
                    <Form.Item
                        name="gender"
                        label={t('user:attr.gender')}
                        // rules={[{ required: true }]}
                    >
                        <Space direction="vertical">
                            <Radio.Group
                                value={data.gender}
                                options={genderOptions}
                                onChange={({ target: { value } }) => {
                                    methods.update({ gender: value });
                                }}
                            />
                        </Space>
                    </Form.Item>
                    <Form.Item
                        label={t('user:attr.birth')}
                        name="birth"
                        // rules={[
                        //     {
                        //         required: true,
                        //     },
                        // ]}
                    >
                        <>
                            <DatePicker
                                placeholder="请选择"
                                format="YYYY-MM-DD"
                                inputReadOnly={true}
                                allowClear={false}
                                mode="date"
                                value={birth ? dayjs(birth) : undefined}
                                disabledDate={(current) => {
                                    if (
                                        dayjs(current).valueOf() >
                                        dayjs().valueOf()
                                    ) {
                                        return true;
                                    }
                                    return false;
                                }}
                                onChange={(value) => {
                                    if (value) {
                                        methods.update({
                                            birth: dayjs(value).valueOf(),
                                        });
                                    }
                                }}
                            />
                        </>
                    </Form.Item>
                    <Form.Item label={t('mobile')}>
                        <>
                            <Space>
                                <Typography>{mobile}</Typography>
                                <Button
                                    size="small"
                                    onClick={() => {
                                        goAddMobile();
                                    }}
                                >
                                    {mobile ? t('manage') : t('bind')}
                                </Button>
                            </Space>
                        </>
                    </Form.Item>
                    <Form.Item
                        wrapperCol={{
                            xs: { offset: 4 },
                            md: { offset: 6 },
                        }}
                    >
                        <Space>
                            <Button
                                disabled={oakExecuting || !oakDirty}
                                type="primary"
                                onClick={() => {
                                    updateMyInfo();
                                }}
                            >
                                确定
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </div>
        </PageHeader>
    );
}
