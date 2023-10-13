import React from 'react';
import SessionMessageList from '../../sessionMessage/list';
import Header from '../../../components/session/header';
import SessionCell from '../../../components/session/cell';
import MessageNumber from '../../../components/session/messageNumber';
import classNames from 'classnames';

import Style from './web.module.less';
import { WebComponentProps, RowWithActions } from 'oak-frontend-base';
import { EntityDict } from '../../../oak-app-domain';

type Session = EntityDict['session']['Schema'];

export default function Render(
    props: WebComponentProps<
        EntityDict,
        'session',
        true,
        {
            sessions: Partial<Session & { name: string }>[];
            selectedSessionId: string;
            className: string;
            dialog: boolean;
            entityFilter: object;
            entityDisplay: (
                data:
                    | EntityDict['session']['Schema'][]
                    | RowWithActions<EntityDict, 'session'>[]
            ) => any[];
            entityProjection: object;
        },
        {
            setSelectedSessionId: (sessionId: string) => void;
        }
    >
) {
    const { data, methods } = props;
    const {
        sessions,
        selectedSessionId,
        oakFullpath,
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
                        {sessions?.map((session, index: number) => {
                            return (
                                <SessionCell
                                    isEntity={entityFilter ? true : false}
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
                    <SessionMessageList
                        sessionId={selectedSessionId}
                        isEntity={entityFilter ? true : false}
                        oakAutoUnmount={true}
                        entityDisplay={entityDisplay}
                        entityProjection={entityProjection}
                        oakPath={
                            oakFullpath ? `$$sessionMessage/list` : undefined
                        }
                    />
                )}
            </div>
        </div>
    );
}
