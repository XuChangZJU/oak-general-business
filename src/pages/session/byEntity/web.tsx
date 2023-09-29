import React from 'react';
import SessionList from '../list';
import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../../oak-app-domain';

export default function Render(
    props: WebComponentProps<EntityDict, 'session', false, {}, {}>
) {
    const { data } = props;
    const { oakFullpath } = data;
    return (
        <SessionList
            oakAutoUnmount={true}
            oakPath={oakFullpath ? `$$session-byEntity/list` : undefined}
            entity=""
            entityFilter=""
        />
    );
}