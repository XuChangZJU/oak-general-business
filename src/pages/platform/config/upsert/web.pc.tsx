import React from 'react';
import ConfigUpsert from '../../../../components/config/upsert/index';
import Style from './web.module.less';

export default function render(this: any) {
    const { namespace, oakId } = this.props;
    const { config, name } = this.state;
    return (
        <div className={Style.container}>
            <ConfigUpsert
                config={config}
                entity="platform"
                entityId={oakId}
                name={name}
                namespace={namespace}
            />
        </div>
    );
}