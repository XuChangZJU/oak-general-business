import React from 'react';
import ConfigUpsert from '../../../../components/config/upsert';
import PageHeader from '../../../../components/common/pageHeader';

import Style from './web.module.less';

export default function render(this: any) {
    const { namespace, oakId } = this.props;
    const { config, name } = this.state;
    return (
        <PageHeader showBack={true} title="系统配置">
            <div className={Style.container}>
                <ConfigUpsert
                    config={config}
                    entity="system"
                    entityId={oakId}
                    name={name}
                    namespace={namespace}
                />
            </div>
        </PageHeader>
    );
}