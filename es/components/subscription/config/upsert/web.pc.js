import { jsx as _jsx } from "react/jsx-runtime";
import ConfigUpsert from '../../../../components/config/application';
import Style from './web.module.less';
export default function render(props) {
    const { oakId, config, name } = props.data;
    return (_jsx("div", { className: Style.container, children: _jsx(ConfigUpsert, { isService: false, type: "wechatPublic", config: config, entity: "subscription", entityId: oakId, name: name }) }));
}
