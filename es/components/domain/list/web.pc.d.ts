import * as React from 'react';
import { EntityDict } from '../../../oak-app-domain';
import { WebComponentProps, RowWithActions } from 'oak-frontend-base';
export default function Render(props: WebComponentProps<EntityDict, 'domain', true, {
    list: RowWithActions<EntityDict, 'domain'>[];
    systemId: string;
}, {
    goDetail: (id: string) => void;
    goCreate: () => void;
    goUpdate: (id: string) => void;
}>): React.JSX.Element | null;
