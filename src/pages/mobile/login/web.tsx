import React from 'react';
import {
    isMobile,
    isPassword,
    isCaptcha,
} from 'oak-domain/lib/utils/validator';
import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../../oak-app-domain';
import { MobileOutlined } from '@ant-design/icons';
import { Form, Input, Button } from 'antd';
import Style from './mobile.module.less';

export default function render(
    props: WebComponentProps<
        EntityDict,
        'token',
        false,
        {
            counter: number;
            loginMode?: number;
            loginAgreed?: boolean;
            appId: string;
            onlyCaptcha?: boolean;
            onlyPassword?: boolean;
            loading: boolean;
            backUrl?: string;
            mobile: string;
            captcha: string;
            password: string;
        },
        {
            setCaptcha: (mobile: string) => void;
            setMobile: (mobile: string) => void;
            sendCaptcha: () => Promise<void>;
            loginByMobile: () => Promise<void>;
        }
    >
) {
    const { mobile, captcha, password, counter } = props.data;
    const { t, setMobile, setCaptcha, sendCaptcha, loginByMobile } =
        props.methods;
    const validMobile = isMobile(mobile);
    const validCaptcha = isCaptcha(captcha);
    const allowSubmit = validMobile && validCaptcha;

    const LoginCaptcha = (
        <Form colon={true}>
            <Form.Item name="mobile">
                <Input
                    allowClear
                    value={mobile}
                    data-attr="mobile"
                    type="tel"
                    maxLength={11}
                    prefix={<MobileOutlined />}
                    placeholder={t('placeholder.Mobile')}
                    size="large"
                    onChange={(e) => {
                        setMobile(e.target.value);
                    }}
                    className={Style['loginbox-input']}
                />
            </Form.Item>
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
                            disabled={!validMobile || counter > 0}
                            onClick={() => sendCaptcha()}
                        >
                            {counter > 0 ? `${counter}秒后可重发` : t('Send')}
                        </Button>
                    }
                />
            </Form.Item>

            <Form.Item>
                <Button
                    block
                    size="large"
                    type="primary"
                    htmlType="submit"
                    disabled={!allowSubmit}
                    onClick={() => loginByMobile()}
                >
                    {t('Login')}
                </Button>
            </Form.Item>
        </Form>
    );

    return (
        <div className={Style['loginbox-main']}>
            <div className={Style['loginbox-wrap']}>
                <div className={Style['loginbox-hd']}>
                    为了更好的体验，请绑定手机号
                </div>
                <div className={Style['loginbox-bd']}>
                    <div className={Style['loginbox-mobile']}>
                        {LoginCaptcha}
                    </div>
                </div>
            </div>
        </div>
    );
}
