import React from 'react';
import SessionMessageCell from '../../../components/sessionMessage/cell';
import MessageUpsert from '../../../components/sessionMessage/upsert';
import Header from '../../../components/session/forMessage';
import Style from './web.module.less';
export default function Render(props) {
    const { data, methods } = props;
    const { sessionId, isEntity, sessionMessages, oakFullpath, sessionMessageId, entityDisplay, entityProjection, } = data;
    const { customUpload, setContent, sendMessage } = methods;
    return (<div className={Style.container}>
            <Header sessionId={sessionId} isEntity={isEntity} oakPath={'$$sessionMessage/list-session/header'} oakAutoUnmount={true} entityDisplay={entityDisplay} entityProjection={entityProjection}/>
            <div className={Style.inner} id="comment">
                {sessionMessages
            ?.sort((a, b) => a.$$createAt$$ -
            b.$$createAt$$)
            .map((sessionMessage, index) => {
            return (<SessionMessageCell key={sessionMessage.id} oakId={sessionMessage.id} oakPath={oakFullpath
                    ? `${oakFullpath}.${sessionMessage.id}`
                    : ''} isEntity={isEntity}/>);
        })}
            </div>

            <div className={Style.bottom} id="bottom">
                {sessionMessageId && (<MessageUpsert key={`MessageUpsert_${sessionMessageId}`} isEntity={isEntity} oakId={sessionMessageId} oakPath={oakFullpath
                ? `${oakFullpath}.${sessionMessageId}`
                : ''} oakAutoUnmount={true} send={() => {
                sendMessage();
            }} setText={(text) => {
                setContent(text);
            }} customUpload={(file) => {
                customUpload(file);
            }}/>)}
            </div>
        </div>);
}
