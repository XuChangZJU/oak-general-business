import React, { useState, useEffect, useRef } from 'react';
import { Button, Image, Input, Upload, Modal } from 'antd';
import { PictureOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import MessageCell from '../../../components/sessionMessage/cell';
import Header from '../../../components/session/forMessage';

import Style from './web.module.less';
import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../../oak-app-domain';
import ExtraFileUpload from "../../../components/extraFile/upload";
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
            isUser: boolean;
            employerId: string;
            sessionMessageType: string;
            sessionMessageId: string;
            entityDisplay: (data: any) => any[];
            entityProjection: object;
            isWeChat: boolean;
        },
        {
            setButtonHidden: (isHidden: boolean) => void;
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
        sessionMessageType,
        sessionMessageId,
        entityDisplay,
        entityProjection,
        isWeChat,
    } = data;
    const {
        setButtonHidden,
        customUpload,
        setContent,
        pageScroll,
        createMessage,
    } = methods;
    const [bottomHeight, setBottomHeight] = useState(0);
    const textareaRef = useRef(null);

    useEffect(() => {
        if (buttonHidden) {
            const newBottomHeight =
                window.document.getElementById('bottom')?.offsetHeight!;
            setBottomHeight(newBottomHeight);
        } else {
            setBottomHeight(0);
        }
    }, [buttonHidden]);
    const handleKeyDown = (event: any) => {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            createMessage();
            pageScroll('comment');
        }
    };
    return (
        <div className={Style.container}>
            <Header
                sessionId={sessionId}
                isEntity={isEntity}
                oakPath={
                    'session:header1'
                }
                oakAutoUnmount={true}
                entityDisplay={entityDisplay}
                entityProjection={entityProjection}
            />
            <div
                className={Style.inner}
                style={{
                    marginBottom: bottomHeight ? `${bottomHeight}px` : '168px',
                }}
                id="comment"
                onClick={() => setButtonHidden(true)}
            >
                {sessionMessageList
                    ?.sort(
                        (a, b) =>
                            (a.$$createAt$$ as number) -
                            (b.$$createAt$$ as number)
                    )
                    .map((sessionMessage, index: number) => {
                        return (
                            <MessageCell
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
                <div className={Style.toolbar}>
                    {/* {
                        sessionMessageId && (
                            <ExtraFileUpload
                                oakPath={
                                    data.oakFullpath
                                        ? `${data.oakFullpath}.${sessionMessageId}.extraFile$entity`
                                        : undefined
                                }
                                showUploadList={false}
                                type="image"
                                origin="qiniu"
                                tag1="image"
                                // maxNumber={1}
                                entity="sessionMessage"
                                accept="image/*"
                                theme="file"
                            >
                                <PictureOutlined className={Style.icon} />
                            </ExtraFileUpload>
                        )
                    } */}
                    {
                        isWeChat ? (
                            //微信资源库
                            <PictureOutlined className={Style.icon} />
                        ) : (
                            <Upload
                                accept={'image/*'}
                                multiple={false}
                                showUploadList={false}
                                customRequest={() => { }}
                                onChange={({ file }) => {
                                    customUpload(file as customFile);
                                }}
                            >
                                <PictureOutlined className={Style.icon} />
                            </Upload>
                        )
                    }

                </div>

                <div className={Style.textareaBox}>
                    <Input.TextArea
                        ref={textareaRef}
                        className={Style.textarea}
                        maxLength={500}
                        placeholder="Enter 发送，Shift + Enter换行"
                        rows={5}
                        onChange={(e) => {
                            setContent(e.target.value);
                        }}
                        onFocus={() => {
                            setButtonHidden(true);
                        }}
                        // onPressEnter={(e) => {
                        //     e.preventDefault();
                        //     createMessage();
                        //     pageScroll('comment');
                        // }}
                        onKeyDown={handleKeyDown}
                        value={text}
                    />
                    <div className={Style.btn}>
                        <Button
                            type="primary"
                            disabled={!text}
                            onClick={() => {
                                createMessage();
                                pageScroll('comment');
                            }}
                        >
                            发送
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
