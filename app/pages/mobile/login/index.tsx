import React from 'react';
import { isMobile, isPassword, isCaptcha } from 'oak-domain/lib/utils/validator';
import { DesktopIcon, LockOnIcon, MobileIcon } from 'tdesign-icons-react';
import {
    Form,
    Input,
    Button,
    MessagePlugin,
    Checkbox,
    Tabs,
} from 'tdesign-react';


const { TabPanel } = Tabs;
const { FormItem } = Form;

export default function render() {
    const { onlyCaptcha, onlyPassword } = this.props;
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
                    prefixIcon={<MobileIcon className="site-form-item-icon" />}
                    placeholder="Mobile"
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
                    prefixIcon={<LockOnIcon className="site-form-item-icon" />}
                    type="password"
                    placeholder="Password"
                    onChange={(value, context) => {
                        this.setState({
                            password: value,
                        });
                    }}
                />
            </FormItem>
            <FormItem>
                <Checkbox>Remember me</Checkbox>
            </FormItem>

            <FormItem>
                <Button
                    block
                    theme="primary"
                    type="submit"
                    className="login-form-button"
                    disabled={!allowSubmit}
                    onClick={() => this.loginByMobile()}
                >
                    Log in
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
                    prefixIcon={<MobileIcon className="site-form-item-icon" />}
                    placeholder="Mobile"
                    style={{ width: 'calc(100% - 65px)' }}
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
                    onChange={(value, context) => {
                        this.setState({
                            captcha: value,
                        });
                    }}
                />
                <Button
                    theme="primary"
                    disabled={!validMobile || counter > 0}
                    onClick={() => this.sendCaptcha()}
                >
                    {counter > 0 ? counter : 'Send'}
                </Button>
            </FormItem>
            <FormItem>
                <Checkbox>Remember me</Checkbox>
            </FormItem>

            <FormItem>
                <Button
                    theme="primary"
                    className="login-form-button"
                    disabled={!allowSubmit}
                    onClick={() => this.loginByMobile()}
                >
                    Log in
                </Button>
            </FormItem>
        </Form>
    );
    if (onlyCaptcha) {
        return (
            <div className='page-body'>
                <div style={{
                    flex: 2,
                }} />
                {LoginCaptcha}
                <div style={{
                    flex: 3,
                }} />
            </div>
        );
    }
    else if (onlyPassword) {
        return (
            <div className='page-body'>
                <div style={{
                    flex: 2,
                }} />
                {LoginPassword}
                <div style={{
                    flex: 3,
                }} />
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
            <div style={{
                minHeight: 500,
                lineHeight: 22,
            }}>
                <Tabs
                    theme="normal"
                    placement="top"
                    defaultValue="1"
                    size="medium"
                    style={{ width: '100%' }}
                >
                    <TabPanel label="in Password" value="1">
                        {LoginPassword}
                    </TabPanel>
                    <TabPanel label="in Captcha" key="2">
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
