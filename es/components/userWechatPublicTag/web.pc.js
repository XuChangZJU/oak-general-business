import { jsx as _jsx } from "react/jsx-runtime";
import Style from './web.module.less';
import { Tabs } from 'antd';
import SubscribedList from './subscribedList';
export default function Render(props) {
    const { oakFullpath, applicationId } = props.data;
    const {} = props.methods;
    const items = [
        {
            key: '1',
            label: '已关注',
            children: _jsx(SubscribedList, { oakAutoUnmount: true, applicationId: applicationId, oakPath: '$subscribedList' })
        },
    ];
    if (oakFullpath) {
        return (_jsx("div", { className: Style.container, children: _jsx(Tabs, { items: items }) }));
    }
    return null;
}
