import { jsx as _jsx } from "react/jsx-runtime";
import ConfigUpsert from '../../../../components/config/application';
import PageHeader from '../../../../components/common/pageHeader';
import Style from './web.module.less';
export default function render(props) {
    const { oakId, config, name, type } = props.data;
    return (_jsx(PageHeader, { showBack: true, title: "\u5E94\u7528\u914D\u7F6E", children: _jsx("div", { className: Style.container, children: _jsx(ConfigUpsert, { type: type, config: config, entity: "application", entityId: oakId, name: name }) }) }));
}
