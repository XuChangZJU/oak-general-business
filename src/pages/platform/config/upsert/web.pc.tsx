import React, { useRef } from 'react';
import { Button } from 'tdesign-react';
import ConfigUpsert from '../../../../components/config/upsert/index';
import Styles from './web.module.less';

export default function render(this: any) {
    const { t } = this;
    const { namespace, oakId } = this.props;
    const { config } = this.state;
    const { name } = this.state;
    return (
        <div>
            <ConfigUpsert
                config={config}
                entity="platform"
                entityId={oakId}
                name={name}
            />
        </div>
    );
}