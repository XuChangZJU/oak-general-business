import React from 'react';
import ConfigUpsert from '../../../../components/config/application';
import PageHeader from '../../../../components/common/pageHeader';

import Style from './web.module.less';

export default function render(this: any) {
    const { namespace, oakId } = this.props;
    const { config, name, type } = this.state;
    return (
        <PageHeader showBack={true} title="应用配置">
            <div className={Style.container}>
                <ConfigUpsert
                    type={type}
                    config={config}
                    entity="application"
                    entityId={oakId}
                    name={name}
                    namespace={namespace}
                />
            </div>
        </PageHeader>
    );
}