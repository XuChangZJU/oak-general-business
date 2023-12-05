import React from 'react';
import SessionMessageList from '../../sessionMessage/list';
import Header from '../../../components/session/header';
import SessionCell from '../../../components/session/cell';
import classNames from 'classnames';
import Style from './web.module.less';
export default function Render(props) {
    const { data, methods } = props;
    const { sessions, selectedSessionId, oakFullpath, entityFilter, dialog = false, className, entityDisplay, entityProjection, } = data;
    const { setSelectedSessionId } = methods;
    return (<div className={Style.container}>
            <div className={classNames(Style.bothContainer, className, {
            [Style.dialogContainer]: dialog,
        })}>
                <div className={Style.conversationContainer}>
                    <Header />
                    {/* <MessageNumber
            number={unReadConversation}
            // clear={clearUnRead}
        /> */}
                    <div className={Style.inner}>
                        {sessions?.map((session, index) => {
            return (<SessionCell isEntity={entityFilter ? true : false} name={session?.name} selectedId={selectedSessionId} onSelect={(id) => {
                    setSelectedSessionId(id);
                }} oakId={session.id} key={session.id} oakPath={oakFullpath
                    ? `${oakFullpath}.${session.id}`
                    : ''}/>);
        })}
                    </div>
                </div>
                {selectedSessionId && (<SessionMessageList sessionId={selectedSessionId} isEntity={entityFilter ? true : false} oakAutoUnmount={true} entityDisplay={entityDisplay} entityProjection={entityProjection} oakPath={oakFullpath
                ? `$$session/list-SessionMessageList`
                : undefined}/>)}
            </div>
        </div>);
}
