
import React, { useEffect } from 'react';
import { message } from 'antd';
import { MessageProps } from 'oak-frontend-base/lib/types/Message';

export default function render(props: { data: { data: MessageProps } }) {
    const [messageApi, contextHolder] = message.useMessage();
    const { data } = props.data;

    useEffect(() => {
        if (data) {
            messageApi[data.type as MessageProps['type']](data as any);
        }
    }, [data]);

    return <>{contextHolder}</>;
}
