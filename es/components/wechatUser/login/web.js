import { jsx as _jsx } from "react/jsx-runtime";
import { Button } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { isWeiXin } from 'oak-frontend-base/es/utils/utils';
import Fail from '../../common/result/fail';
import Success from '../../common/result/success';
import Style from './web.module.less';
export default function render(props) {
    const { error, loading } = props.data;
    let V;
    if (loading) {
        V = (_jsx(Success, { icon: _jsx(LoadingOutlined, { className: Style.brand_icon }), title: "\u767B\u5F55\u4E2D", description: "\u6B63\u5728\u767B\u5F55..\uFF0C\u8BF7\u7A0D\u540E" }));
    }
    else if (error) {
        V = (_jsx(Fail, { title: error, description: "\u62B1\u6B49\uFF0C\u767B\u5F55\u5931\u8D25\uFF0C\u8BF7\u8054\u7CFB\u7BA1\u7406\u5458\u8FDB\u884C\u6392\u67E5\uFF01", children: isWeiXin && (_jsx(Button, { type: "primary", onClick: () => {
                    WeixinJSBridge.call('closeWindow');
                }, children: "\u5173\u95ED" })) }));
    }
    return _jsx("div", { className: Style.container, children: V });
}
