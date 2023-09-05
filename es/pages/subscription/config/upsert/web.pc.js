import { jsx as _jsx } from "react/jsx-runtime";
import ConfigUpsert from '../../../../components/config/application';
import PageHeader from '../../../../components/common/pageHeader';
import Style from './web.module.less';
export default function render(props) {
    const { oakId, config, name } = props.data;
    return (_jsx(PageHeader, { showBack: true, title: "\u8BA2\u9605\u53F7\u914D\u7F6E", children: _jsx("div", { className: Style.container, children: _jsx(ConfigUpsert, { isService: false, type: "wechatPublic", config: config, entity: "subscription", entityId: oakId, name: name }) }) }));
}
