import React, { useState } from 'react';
import {
    Avatar,
    Space,
    Button,
    Input,
    Radio,
    DatePicker,
    Form,
    Typography,
    Modal,
} from 'antd';
import dayjs from 'dayjs';
import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../../general-app-domain';
import PageHeader from '../../../components/common/pageHeader';
import OakAvatar from '../../../components/extraFile/avatar';
import MobileLogin from '../../../pages/mobile/login';
import WechatLoginQrCode from '../../../components/wechatLogin/qrCode';
import WechatUserList from '../../../components/wechatUser/bindingList';
import {
    isMobile,
    isPassword,
    isCaptcha,
} from 'oak-domain/lib/utils/validator';

import Style from './web.module.less';

const { confirm } = Modal;
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
            wechatUser: EntityDict['wechatUser']['Schema'];
            counter: number;
        },
        {
            updateMyInfo: () => void;
            goAddMobile: () => void;
            sendCaptcha: () => void;
            unbunding: (captcha?: string) => void;
        }
    >
) {
    const { data, methods } = props;
    const { t, updateMyInfo, goAddMobile, sendCaptcha, unbunding  } = methods;
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
        wechatUser,
        counter,
    } = data;
    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [open3, setOpen3] = useState(false);
    const [captcha, setCaptcha] = useState('');

    return (
        <PageHeader title="个人设置" showBack={showBack}>
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
                                <Typography>{mobile || '未设置'}</Typography>
                                <Button
                                    size="small"
                                    onClick={() => {
                                        if (mobile) {
                                            goAddMobile();
                                            return;
                                        }
                                        setOpen(true);
                                    }}
                                >
                                    {mobile ? t('manage') : t('bind')}
                                </Button>
                            </Space>
                        </>
                    </Form.Item>
                    <Form.Item label="微信帐号">
                        <>
                            {wechatUser ? (
                                <Space>
                                    <Typography>{wechatUser.nickname}</Typography>
                                    <WechatUserList
                                        oakPath={oakFullpath ? `${oakFullpath}.wechatUser$user` : undefined}
                                    />
                                </Space>
                            ) : (
                                <Button
                                    size="small"
                                    onClick={() => {
                                        setOpen2(true);
                                    }}
                                >
                                    绑定
                                </Button>
                            )}
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
            <Modal
                title="绑定手机号"
                open={open}
                destroyOnClose={true}
                footer={null}
                onCancel={() => {
                    setOpen(false);
                }}
            >
                <MobileLogin
                    callback={() => {
                        setOpen(false);
                    }}
                    oakPath="$user/info-mobile/login"
                    oakAutoUnmount={true}
                />
            </Modal>

            <Modal
                title="绑定微信"
                open={open2}
                destroyOnClose={true}
                footer={null}
                maskClosable={false}
                onCancel={() => {
                    setOpen2(false);
                }}
            >
                <WechatLoginQrCode
                    oakPath="$user/info-wechatLogin/qrCode"
                    oakAutoUnmount={true}
                />
            </Modal>
            <Modal
                title={t('Mobile-Number-Verification')}
                open={open3}
                destroyOnClose={true}
                footer={[
                    <Button key="cancel" onClick={() => setOpen3(false)}>
                        {t('cancel')}
                    </Button>,
                    <Button
                        key="send"
                        type="primary"
                        disabled={!isCaptcha(captcha)}
                        onClick={() => {
                            unbunding(captcha);
                            setOpen3(false);
                        }}
                    >
                        {t('unbind')}
                    </Button>
                ]}
                maskClosable={false}
                onCancel={() => {
                    setOpen3(false);
                }}
            >
                <Space direction="vertical" style={{width: '100%'}}>
                    <Typography>
                        请输入{mobile && mobile.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')}收到的验证码
                    </Typography>
                    <Form.Item name="captcha">
                        <Input
                            allowClear
                            value={captcha}
                            data-attr="captcha"
                            // type="number"
                            maxLength={4}
                            placeholder={t('placeholder.Captcha')}
                            size="large"
                            onChange={(e) => {
                                setCaptcha(e.target.value);
                            }}
                            className={Style['loginbox-input']}
                            suffix={
                                <Button
                                    type="link"
                                    disabled={counter > 0}
                                    onClick={() => sendCaptcha()}
                                >
                                    {counter > 0 ? `${counter}秒后可重发` : t('send')}
                                </Button>
                            }
                        />
                    </Form.Item>
                </Space>
            </Modal>
        </PageHeader>
    );
}
