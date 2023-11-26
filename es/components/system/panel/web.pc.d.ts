import React from 'react';
import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../../oak-app-domain';
import { Config } from '../../../types/Config';
import { Style } from '../../../types/Style';
export default function Render(props: WebComponentProps<EntityDict, 'system', false, {
    id: string;
    config: Config;
    name: string;
    style: Style;
    application$system: EntityDict['application']['OpSchema'][];
}>): React.JSX.Element | undefined;
