import { jsx as _jsx } from "react/jsx-runtime";
import { Tabs } from 'antd';
import SubscribedList from './subscribedList';
export default function Render(props) {
    const { oakFullpath, applicationId } = props.data;
    const { t } = props.methods;
    const items = [
        {
            key: '1',
            label: '已关注',
            children: (_jsx(SubscribedList, { oakAutoUnmount: true, applicationId: applicationId, oakPath: `${oakFullpath}.wechatUsers` })),
        },
    ];
    return _jsx(Tabs, { items: items });
}
