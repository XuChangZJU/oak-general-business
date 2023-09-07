import { jsx as _jsx } from "react/jsx-runtime";
import { List } from 'antd-mobile';
import Style from './web.module.less';
export default function render(props) {
    const { data: { areas }, methods: { onItemClicked, t } } = props;
    if (areas && areas.length > 0) {
        return (_jsx(List, { children: areas.map((area) => (_jsx(List.Item, { onClick: () => onItemClicked(area), arrow: true, children: area.name }, area.id))) }));
    }
    return (_jsx("div", { className: Style.container, children: t('common::noData') }));
}
