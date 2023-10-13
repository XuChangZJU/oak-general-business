import React, { useState, useEffect, useRef } from 'react';
import { Button, Input, Upload } from 'antd';
import { PictureOutlined } from '@ant-design/icons';
import SessionMessageCell from '../../../components/sessionMessage/cell';
import MessageUpsert from '../../../components/sessionMessage/upsert';
import Header from '../../../components/session/forMessage';

import Style from './web.module.less';
import { WebComponentProps, RowWithActions } from 'oak-frontend-base';
import { EntityDict } from '../../../oak-app-domain';

interface customFile {
    name: string;
    size: number;
    type: string;
    originFileObj: File;
}

export default function Render(
    props: WebComponentProps<
        EntityDict,
        'sessionMessage',
        true,
        {
            sessionMessageList: EntityDict['sessionMessage']['Schema'][];
            text: string;
            buttonHidden: boolean;
            sessionId: string;
            isEntity: boolean;
            sessionMessageId: string;
            entityDisplay: (
                data:
                    | EntityDict['session']['Schema'][]
                    | RowWithActions<EntityDict, 'session'>[]
            ) => any[];
            entityProjection: object;
            isWeChat: boolean;
        },
        {
            customUpload: (file: customFile) => void;
            setContent: (text: string) => void;
            pageScroll: (id: string) => void;
            createMessage: () => void;
        }
    >
) {
    const { data, methods } = props;
    const {
        sessionId,
        isEntity,
        sessionMessageList,
        oakFullpath,
        text,
        buttonHidden,
        sessionMessageId,
        entityDisplay,
        entityProjection,
        isWeChat,
    } = data;
    const {
        customUpload,
        setContent,
        pageScroll,
        createMessage,
    } = methods;

    return (
        <div className={Style.container}>
            <Header
                sessionId={sessionId}
                isEntity={isEntity}
                oakPath={'$$sessionMessage/list-session/header'}
                oakAutoUnmount={true}
                entityDisplay={entityDisplay}
                entityProjection={entityProjection}
            />
            <div className={Style.inner} id="comment">
                {sessionMessageList
                    ?.sort(
                        (a, b) =>
                            (a.$$createAt$$ as number) -
                            (b.$$createAt$$ as number)
                    )
                    .map((sessionMessage, index: number) => {
                        return (
                            <SessionMessageCell
                                key={sessionMessage.id}
                                oakId={sessionMessage.id}
                                oakPath={
                                    oakFullpath
                                        ? `${oakFullpath}.${sessionMessage.id}`
                                        : ''
                                }
                                isEntity={isEntity}
                            />
                        );
                    })}
            </div>

            <div className={Style.bottom} id="bottom">
                {sessionMessageId && (
                    <MessageUpsert
                        key={`MessageUpsert_${sessionMessageId}`}
                        isEntity={isEntity}
                        oakId={sessionMessageId}
                        oakPath={
                            oakFullpath
                                ? `${oakFullpath}.${sessionMessageId}`
                                : ''
                        }
                        oakAutoUnmount={true}
                        send={() => {
                            createMessage();
                        }}
                        setText={(text) => {
                            setContent(text);
                        }}
                        customUpload={(file) => {

                        }}
                    />
                )}
            </div>
        </div>
    );
}
