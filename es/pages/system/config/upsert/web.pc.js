import { jsx as _jsx } from "react/jsx-runtime";
import ConfigUpsert from '../../../../components/config/upsert';
import PageHeader from '../../../../components/common/pageHeader';
import Style from './web.module.less';
export default function Render(props) {
    const { oakId, config, name } = props.data;
    return (_jsx(PageHeader, { showBack: true, title: "\u7CFB\u7EDF\u914D\u7F6E", children: _jsx("div", { className: Style.container, children: _jsx(ConfigUpsert, { config: config, entity: "system", entityId: oakId, name: name }) }) }));
}
