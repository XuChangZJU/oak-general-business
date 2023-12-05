import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../../oak-app-domain';
import React from 'react';
export default function Render(props: WebComponentProps<EntityDict, 'messageTypeTemplate', true, {
    mtt: EntityDict['messageTypeTemplate']['Schema'][];
    wechatTemplates: EntityDict['wechatTemplate']['Schema'][];
    dirtyIds: string[];
    messageTypes: string[];
    applicationId: string;
}, {
    syncTemplate: () => Promise<void>;
}>): React.JSX.Element;
