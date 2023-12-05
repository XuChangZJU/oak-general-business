import React from 'react';
import ConfigUpsert from '../../../../components/config/application';
export default function render(props) {
    const { oakId, config, name } = props.data;
    return (<ConfigUpsert isService={false} type="wechatPublic" config={config} entity="subscription" entityId={oakId} name={name}/>);
}
