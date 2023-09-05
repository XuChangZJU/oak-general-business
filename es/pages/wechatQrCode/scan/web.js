import { jsx as _jsx } from "react/jsx-runtime";
import { LoadingOutlined, WarningOutlined, } from '@ant-design/icons';
import Style from './web.module.less';
import Success from '../../../components/common/result/success';
import Fail from '../../../components/common/result/fail';
export default function render(props) {
    const { oakLoading, expired, illegal, loading } = props.data;
    let V;
    if (oakLoading || loading) {
        V = (_jsx(Success, { icon: _jsx(LoadingOutlined, { className: Style.brand_icon }), title: "\u52A0\u8F7D\u4E2D", description: "\u6B63\u5728\u83B7\u53D6\u6570\u636E\uFF0C\u8BF7\u7A0D\u540E" }));
    }
    else if (illegal) {
        V = (_jsx(Fail, { title: "\u4E8C\u7EF4\u7801\u975E\u6CD5", description: "\u62B1\u6B49\uFF0C\u8BE5\u7801\u4E0D\u5B58\u5728\uFF0C\u8BF7\u91CD\u65B0\u626B\u4E8C\u7EF4\u7801" }));
    }
    else if (expired) {
        V = (_jsx(Fail, { icon: _jsx(WarningOutlined, { className: Style.icon }), title: "\u4E8C\u7EF4\u7801\u5DF2\u8FC7\u671F", description: "\u62B1\u6B49\uFF0C\u8BE5\u7801\u5DF2\u8FC7\u671F" }));
    }
    else {
        V = (_jsx(Success, { icon: _jsx(LoadingOutlined, { className: Style.brand_icon }), title: "\u8DF3\u8F6C\u4E2D", description: "\u6B63\u5728\u8DF3\u8F6C...\uFF0C\u8BF7\u7A0D\u540E" }));
    }
    return _jsx("div", { className: Style.container, children: V });
}
