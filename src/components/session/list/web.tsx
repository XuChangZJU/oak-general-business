import React from 'react';
import Style from './mobile.module.less';
import Header from '../../../components/session/header';
import SessionCell from '../../../components/session/cell';
import MessageNumber from '../../../components/session/messageNumber';
import classNames from 'classnames';
import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../../oak-app-domain';

export default function Render(
    props: WebComponentProps<
        EntityDict,
        'session',
        true,
        {
            sessions: EntityDict['session']['Schema'][];
            selectedSessionId: string;
            entityFilter: object;
        },
        {
            setSelectedSessionId: (sessionId: string) => void;
            navigateToMessage: (sessionId: string) => void;
        }
    >
) {
    const { data, methods } = props;
    const {
        sessions,
        selectedSessionId,
        oakFullpath,
        entityFilter,
    } = data;
    const { navigateToMessage, setSelectedSessionId } = methods;

    return (
        <div className={Style.container}>
            <div className={Style.conversationContainer}>
                <Header />
                {/* <ConversationMessageNumber
                    number={unReadConversation}
                    clear={clearUnRead}
                /> */}
                {sessions?.map((session: any, index: number) => {
                    return (
                        <SessionCell
                            entityFilter={entityFilter}
                            selectedId={selectedSessionId}
                            name={session?.name}
                            onSelect={(id: string) => {
                                navigateToMessage(id);
                            }}
                            oakId={session.id}
                            key={session.id}
                            oakPath={
                                oakFullpath
                                    ? `${oakFullpath}.${session.id}`
                                    : ''
                            }
                        />
                    );
                })}
            </div>
        </div>
    );
}
