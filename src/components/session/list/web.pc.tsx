import React from 'react';
import MessageList from '../../sessionMessage/list';
import Header from '../../../components/session/header';
import SessionCell from '../../../components/session/cell';
import MessageNumber from '../../../components/session/messageNumber';
import classNames from 'classnames';

import Style from './web.module.less';
import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../../oak-app-domain';

export default function Render(
    props: WebComponentProps<
        EntityDict,
        'session',
        false,
        {
            sessions: any;
            selectedSessionId: string;
            // unReadConversation: number;
            className: string;
            dialog: boolean;
            entityFilter: object;
            entityDisplay: (data: any) => any[];
            entityProjection: object;
        },
        {
            setSelectedSessionId: (conversationId: string) => void;
        }
    >
) {
    const { data, methods } = props;
    const {
        sessions,
        selectedSessionId,
        oakFullpath,
        // unReadConversation = 0,
        entityFilter,
        dialog = false,
        className,
        entityDisplay,
        entityProjection,
    } = data;
    const { setSelectedSessionId } = methods;
    return (
        <div className={Style.container}>
            <div
                className={classNames(Style.bothContainer, className, {
                    [Style.dialogContainer]: dialog,
                })}
            >
                <div className={Style.conversationContainer}>
                    <Header />
                    {/* <MessageNumber
                        number={unReadConversation}
                        // clear={clearUnRead}
                    /> */}
                    <div className={Style.inner}>
                        {sessions?.map((session: any, index: number) => {
                            return (
                                <SessionCell
                                    entityFilter={entityFilter}
                                    name={session?.name}
                                    selectedId={selectedSessionId}
                                    onSelect={(id: string) => {
                                        setSelectedSessionId(id);
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
                {selectedSessionId && (
                    <MessageList
                        sessionId={selectedSessionId}
                        // isCombine={true}
                        isEntity={entityFilter ? true : false}
                        isUser={entityFilter ? false : true}
                        oakAutoUnmount={true}
                        entityDisplay={entityDisplay}
                        entityProjection={entityProjection}
                        oakPath={
                            oakFullpath
                                ? `$$sessionMessage/list`
                                : undefined
                        }
                    />
                )}
            </div>
        </div>
    );
}
