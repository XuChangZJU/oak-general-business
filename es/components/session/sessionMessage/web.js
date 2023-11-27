import React from 'react';
import SessionMessageList from '../../sessionMessage/list';
export default function Render(props) {
    const { data } = props;
    const { oakFullpath, newSessionId } = data;
    return newSessionId ? (<SessionMessageList oakAutoUnmount={true} oakPath={`${oakFullpath}.sessionMessages`} sessionId={newSessionId} isEntity={false}/>) : null;
}
