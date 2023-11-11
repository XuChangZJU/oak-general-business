import React from 'react';
import SessionMessageList from '../../sessionMessage/list'
import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../../oak-app-domain';

export default function Render(
    props: WebComponentProps<
        EntityDict,
        'session',
        false,
        {
            newSessionId: string;
        },
        {}
    >
) {
    const { data } = props;
    const { oakFullpath, newSessionId } = data;
    return newSessionId ? (
        <SessionMessageList
            oakAutoUnmount={true}
            oakPath={`${oakFullpath}.sessionMessages`}
            sessionId={newSessionId}
            isEntity={false}
        />
    ) : null;
}