import { Fragment as _Fragment, jsx as _jsx } from "react/jsx-runtime";
import { useEffect } from 'react';
import { message } from 'antd';
export default function render(props) {
    const [messageApi, contextHolder] = message.useMessage();
    const { data } = props.data;
    useEffect(() => {
        if (data) {
            messageApi[data.type](data);
        }
    }, [data]);
    return _jsx(_Fragment, { children: contextHolder });
}
