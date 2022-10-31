import React from 'react';
import {
    isMobile,
    isCaptcha,
} from 'oak-domain/lib/utils/validator';
import { MailOutlined } from '@ant-design/icons';
import { Form, Input, Button, Checkbox } from 'antd';
import Style from './web.module.less';


export default function render(this: any) {
    const { mobile, captcha, password, counter } = this.state;
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
                    prefix={<MailOutlined />}
                    placeholder={this.t('placeholder.Mobile')}
                    size="large"
                    onChange={(e) => {
                        this.setState({
                            mobile: e.target.value,
                        });
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
                    placeholder={this.t('placeholder.Captcha')}
                    size="large"
                    onChange={(e) => {
                        this.setState({
                            captcha: e.target.value,
                        });
                    }}
                    className={Style['loginbox-input']}
                    suffix={
                        <Button
                            type="link"
                            disabled={!validMobile || counter > 0}
                            onClick={() => this.sendCaptcha()}
                        >
                            {counter > 0
                                ? `${counter}秒后可重发`
                                : this.t('Send')}
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
                    onClick={() => this.loginByMobile()}
                >
                    {this.t('Login')}
                </Button>
            </Form.Item>
        </Form>
    );

    return (
        <div className={Style['loginbox-main']}>
            <div className={Style['loginbox-wrap']}>
                <div className={Style['loginbox-hd']}>
                    为了更好的体验，请完善账号信息
                </div>
                <div className={Style['loginbox-bd']}>
                    <div
                        className={Style['loginbox-mobile']}
                    >
                        {LoginCaptcha}
                    </div>
                </div>
                <div className={Style['loginbox-ft']}>
                    <div className={Style['loginbox-ft__btn']}>
                        <div className={Style['loginbox-protocal']}>
                            <Checkbox>
                                <div>阅读并同意 服务条款 和 隐私政策</div>
                            </Checkbox>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
