import React from 'react';
import {
    isMobile,
    isPassword,
    isCaptcha,
} from 'oak-domain/lib/utils/validator';
import { LockOnIcon, MobileIcon, Icon } from 'tdesign-icons-react';
import { Form, Input, Button, Checkbox, Radio } from 'tdesign-react';
import classNames from 'classnames';
import Style from './web.module.less';

const { FormItem } = Form;

export default function render(this: any) {
    const { t } = this;
    const { onlyCaptcha, onlyPassword, width } = this.props;
    const { mobile, captcha, password, counter, tabValue = 1} = this.state;
    const validMobile = isMobile(mobile);
    const validCaptcha = isCaptcha(captcha);
    const validPassword = isPassword(password);
    const allowSubmit = validMobile && (validCaptcha || validPassword);

    const LoginPassword = (
        <Form colon={true} labelWidth={0}>
            <FormItem name="mobile">
                <Input
                    clearable
                    value={mobile}
                    type="tel"
                    data-attr="mobile"
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
            <FormItem name="password">
                <Input
                    clearable
                    value={password}
                    data-attr="password"
                    prefixIcon={<LockOnIcon />}
                    type="password"
                    placeholder={t('placeholder.Password')}
                    size="large"
                    onChange={(value, context) => {
                        this.setState({
                            password: value,
                        });
                    }}
                    className={Style['loginbox-input']}
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

    if (onlyCaptcha) {
          return (
              <div className={Style['loginbox-main']}>
                  <div className={Style['loginbox-wrap']}>
                      <div className={Style['loginbox-bd']}>
                          <div
                              className={classNames(
                                  Style['loginbox-mobile'],
                                  Style['loginbox-only']
                              )}
                          >
                              {LoginCaptcha}
                          </div>
                      </div>
                  </div>
              </div>
          );
    } else if (onlyPassword) {
          return (
              <div className={Style['loginbox-main']}>
                  <div className={Style['loginbox-wrap']}>
                      <div className={Style['loginbox-bd']}>
                          <div
                              className={classNames(
                                  Style['loginbox-password'],
                                  Style['loginbox-only']
                              )}
                          >
                              {LoginPassword}
                          </div>
                      </div>
                  </div>
              </div>
          );
    }
    return (
        <div className={Style['loginbox-main']}>
            <div className={Style['loginbox-wrap']}>
                <div className={Style['loginbox-hd']}>
                    <Radio.Group
                        variant="default-filled"
                        defaultValue={tabValue}
                        onChange={(value) => {
                            this.setState({
                                tabValue: value,
                            });
                        }}
                        className={Style['loginbox-hd__tab']}
                    >
                        <Radio.Button
                            value={1}
                            className={classNames(
                                Style['loginbox-hd__tabcon'],
                                {
                                    current: tabValue === 1,
                                }
                            )}
                        >
                            {t('in Password')}
                        </Radio.Button>
                        <Radio.Button
                            value={2}
                            className={classNames(
                                Style['loginbox-hd__tabcon'],
                                {
                                    current: tabValue === 2,
                                }
                            )}
                        >
                            {t('in Captcha')}
                        </Radio.Button>
                        <Radio.Button
                            value={3}
                            className={classNames(
                                Style['loginbox-hd__tabcon'],
                                {
                                    current: tabValue === 3,
                                }
                            )}
                        >
                            {t('in QrCode')}
                        </Radio.Button>
                    </Radio.Group>
                </div>
                <div className={Style['loginbox-bd']}>
                    <div
                        className={Style['loginbox-password']}
                        style={tabValue === 1 ? {} : { display: 'none' }}
                    >
                        {LoginPassword}
                    </div>
                    <div
                        className={Style['loginbox-mobile']}
                        style={tabValue === 2 ? {} : { display: 'none' }}
                    >
                        {LoginCaptcha}
                    </div>
                    <div
                        className={Style['loginbox-qrcode']}
                        style={tabValue === 3 ? {} : { display: 'none' }}
                    >
                        <div className={Style['loginbox-qrcode__sociallogin']}>
                            请使用微信扫一扫登录
                            <span
                                className={Style['loginbox-qrcode__refresh']}
                                onClick={() => {
                                    this.setMessage({
                                        type: 'success',
                                        content: '刷新二维码',
                                    });
                                }}
                            >
                                刷新
                                <Icon
                                    name="refresh"
                                    className={
                                        Style['loginbox-qrcode__refresh-icon']
                                    }
                                />
                            </span>
                        </div>
                        <div className={Style['loginbox-qrcode__iframe']}></div>
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
