import { jsx as _jsx } from "react/jsx-runtime";
import ConfigUpsert from '../../../../components/config/application';
export default function render(props) {
    const { oakId, config, name } = props.data;
    return (_jsx(ConfigUpsert, { isService: false, type: "wechatPublic", config: config, entity: "subscription", entityId: oakId, name: name }));
}
