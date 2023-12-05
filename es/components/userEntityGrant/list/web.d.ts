import React from 'react';
import { WebComponentProps, RowWithActions } from 'oak-frontend-base';
import { EntityDict } from '../../../oak-app-domain';
export default function render(props: WebComponentProps<EntityDict, 'userEntityGrant', true, {
    list: RowWithActions<EntityDict, 'userEntityGrant'>[];
}, {}>): React.JSX.Element;
