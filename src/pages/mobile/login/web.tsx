import React from 'react';
import {
    isMobile,
    isCaptcha,
} from 'oak-domain/lib/utils/validator';
import { MobileIcon } from 'tdesign-icons-react';
import { Form, Input, Button, Checkbox } from 'tdesign-react';
import Style from './web.module.less';

const { FormItem } = Form;

export default function render(this: any) {
    const { t } = this;
    const { mobile, captcha, password, counter } = this.state;
    const validMobile = isMobile(mobile);
    const validCaptcha = isCaptcha(captcha);
    const allowSubmit = validMobile && validCaptcha;

    const LoginCaptcha = (
        <Form colon={true} labelWidth={0}>
            <FormItem name="mobile">
                <Input
                    clearable
                    value={mobile}
                    data-attr="mobile"
                    type="tel"
                    maxlength={11}
                    prefixIcon={<MobileIcon />}
                    placeholder={t('placeholder.Mobile')}
                    size="large"
                    onChange={(value, context) => {
                        this.setState({
                            mobile: value,
                        });
                    }}
                    className={Style['loginbox-input']}
                />
            </FormItem>
            <FormItem name="captcha">
                <Input
                    clearable
                    value={captcha}
                    data-attr="captcha"
                    // type="number"
                    maxlength={4}
                    placeholder={t('placeholder.Captcha')}
                    size="large"
                    onChange={(value, context) => {
                        this.setState({
                            captcha: value,
                        });
                    }}
                    className={Style['loginbox-input']}
                    suffix={
                        <Button
                            variant="text"
                            size="small"
                            theme="primary"
                            disabled={!validMobile || counter > 0}
                            onClick={() => this.sendCaptcha()}
                        >
                            {counter > 0 ? `${counter}秒后可重发` : t('Send')}
                        </Button>
                    }
                />
            </FormItem>

            <FormItem>
                <Button
                    block
                    size="large"
                    theme="primary"
                    type="submit"
                    disabled={!allowSubmit}
                    onClick={() => this.loginByMobile()}
                >
                    {t('Log in')}
                </Button>
            </FormItem>
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
                            <Checkbox
                                label={
                                    <div>阅读并同意 服务条款 和 隐私政策</div>
                                }
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
