import React from 'react';
import { Button, Modal } from 'antd';
const { confirm } = Modal;
export default function Render(props) {
    const { data, methods } = props;
    const { oakFullpath } = data;
    const { t } = methods;
    return (<Button size="small" onClick={() => {
            confirm({
                title: t('unbindTip'),
                content: t('unbindContent'),
                okText: t('common::action.confirm'),
                cancelText: t('common::action.cancel'),
                onOk() {
                    methods.update({
                        userId: null,
                    });
                    methods.execute();
                    methods.setMessage({
                        content: t('unbindSuccess'),
                        type: 'success',
                    });
                },
            });
        }}>
            {t('unbind')}
        </Button>);
}
