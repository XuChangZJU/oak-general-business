import React from 'react';
import Style from './mobile.module.less';
import Header from '../../../components/session/header';
import SessionCell from '../../../components/session/cell';
export default function Render(props) {
    const { data, methods } = props;
    const { sessions, selectedSessionId, oakFullpath, entityFilter } = data;
    const { navigateToMessage, setSelectedSessionId } = methods;
    return (<div className={Style.container}>
            <div className={Style.conversationContainer}>
                <Header />
                {/* <ConversationMessageNumber
            number={unReadConversation}
            clear={clearUnRead}
        /> */}
                {sessions?.map((session, index) => {
            return (<SessionCell isEntity={entityFilter ? true : false} selectedId={selectedSessionId} name={session?.name} onSelect={(id) => {
                    navigateToMessage(id);
                }} oakId={session.id} key={session.id} oakPath={oakFullpath
                    ? `${oakFullpath}.${session.id}`
                    : ''}/>);
        })}
            </div>
        </div>);
}
