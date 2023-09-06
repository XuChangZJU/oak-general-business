import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { isMobile, isCaptcha, } from 'oak-domain/lib/utils/validator';
import { MobileOutlined } from '@ant-design/icons';
import { Form, Input, Button } from 'antd';
import Style from './web.module.less';
export default function render(props) {
    const { mobile, captcha, counter } = props.data;
    const { t, setMobile, setCaptcha, sendCaptcha, loginByMobile } = props.methods;
    const validMobile = isMobile(mobile);
    const validCaptcha = isCaptcha(captcha);
    const allowSubmit = validMobile && validCaptcha;
    const LoginCaptcha = (_jsxs(Form, { colon: true, children: [_jsx(Form.Item, { name: "mobile", children: _jsx(Input, { allowClear: true, value: mobile, "data-attr": "mobile", type: "tel", maxLength: 11, prefix: _jsx(MobileOutlined, {}), placeholder: t('placeholder.Mobile'), size: "large", onChange: (e) => {
                        setMobile(e.target.value);
                    }, className: Style['loginbox-input'] }) }), _jsx(Form.Item, { name: "captcha", children: _jsx(Input, { allowClear: true, value: captcha, "data-attr": "captcha", 
                    // type="number"
                    maxLength: 4, placeholder: t('placeholder.Captcha'), size: "large", onChange: (e) => {
                        setCaptcha(e.target.value);
                    }, className: Style['loginbox-input'], suffix: _jsx(Button, { type: "link", disabled: !validMobile || counter > 0, onClick: () => sendCaptcha(), children: counter > 0 ? `${counter}秒后可重发` : t('Send') }) }) }), _jsx(Form.Item, { children: _jsx(Button, { block: true, size: "large", type: "primary", htmlType: "submit", disabled: !allowSubmit, onClick: () => loginByMobile(), children: t('Login') }) })] }));
    return (_jsx("div", { className: Style['loginbox-main'], children: _jsxs("div", { className: Style['loginbox-wrap'], children: [_jsx("div", { className: Style['loginbox-hd'], children: "\u4E3A\u4E86\u66F4\u597D\u7684\u4F53\u9A8C\uFF0C\u8BF7\u7ED1\u5B9A\u624B\u673A\u53F7" }), _jsx("div", { className: Style['loginbox-bd'], children: _jsx("div", { className: Style['loginbox-mobile'], children: LoginCaptcha }) })] }) }));
}
