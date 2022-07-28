import React from 'react';
import {
    isMobile,
    isPassword,
    isCaptcha,
} from 'oak-domain/lib/utils/validator';
import { DesktopIcon, LockOnIcon, MobileIcon } from 'tdesign-icons-react';
import { Form, Input, Button, Checkbox, Tabs } from 'tdesign-react';

const { TabPanel } = Tabs;
const { FormItem } = Form;

export default function render() {
    const { t } = this;
    const { onlyCaptcha, onlyPassword, width } = this.props;
    const { mobile, captcha, password, counter } = this.state;
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
                    placeholder="Mobile"
                    size="large"
                    onChange={(value, context) => {
                        this.setState({
                            mobile: value,
                        });
                    }}
                />
            </FormItem>
            <FormItem name="password">
                <Input
                    clearable
                    value={password}
                    data-attr="password"
                    prefixIcon={<LockOnIcon />}
                    type="password"
                    placeholder="Password"
                    size="large"
                    onChange={(value, context) => {
                        this.setState({
                            password: value,
                        });
                    }}
                />
            </FormItem>
            <FormItem>
                <Checkbox>{t('Remember me')}</Checkbox>
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
                    placeholder="Mobile"
                    size="large"
                    onChange={(value, context) => {
                        this.setState({
                            mobile: value,
                        });
                    }}
                />
            </FormItem>
            <FormItem name="captcha">
                <Input
                    clearable
                    value={captcha}
                    data-attr="captcha"
                    type="number"
                    maxlength={4}
                    placeholder="Captcha"
                    size="large"
                    onChange={(value, context) => {
                        this.setState({
                            captcha: value,
                        });
                    }}
                />
                <Button
                    size="large"
                    theme="primary"
                    disabled={!validMobile || counter > 0}
                    onClick={() => this.sendCaptcha()}
                >
                    {counter > 0 ? counter : t('Send')}
                </Button>
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
            <div className="page-body">
                <div
                    style={{
                        flex: 2,
                    }}
                />
                {LoginCaptcha}
                <div
                    style={{
                        flex: 3,
                    }}
                />
            </div>
        );
    } else if (onlyPassword) {
        return (
            <div className="page-body">
                <div
                    style={{
                        flex: 2,
                    }}
                />
                {LoginPassword}
                <div
                    style={{
                        flex: 3,
                    }}
                />
            </div>
        );
    }
    return (
        <div className="page-body">
            <div
                style={{
                    flex: 2,
                }}
            />
            <div
                style={{
                    minHeight: 500,
                    lineHeight: 22,
                    width: width === 'xs' ? 320 : 400,
                }}
            >
                <Tabs
                    theme="normal"
                    placement="top"
                    defaultValue="1"
                    size="medium"
                    onChange={(value) => {
                        this.setState({
                            tabValue: value,
                        });
                    }}
                >
                    <TabPanel
                        className="tabPanel"
                        key="tab_1"
                        label={t('in Password')}
                        value="1"
                    >
                        {LoginPassword}
                    </TabPanel>
                    <TabPanel
                        className="tabPanel"
                        key="tab_2"
                        label={t('in Captcha')}
                        value="2"
                    >
                        {LoginCaptcha}
                    </TabPanel>
                </Tabs>
            </div>
            <div
                style={{
                    flex: 3,
                }}
            />
        </div>
    );
}
