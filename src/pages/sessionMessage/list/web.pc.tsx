import React, { useState, useEffect } from 'react';
import { Button, Image, Input, Upload, Modal } from 'antd';
import { PictureOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import MessageCell from '../../../components/sessionMessage/cell';
// import Header from '../../../components/session/forMessage';

import Style from './web.module.less';
import { WebComponentProps } from 'oak-frontend-base';
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
            userType: string;
            employerId: string;
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
        userType,
        sessionMessageList,
        oakFullpath,
        text,
        employerId,
        buttonHidden,
    } = data;
    const {
        setButtonHidden,
        customUpload,
        setContent,
        pageScroll,
        createMessage,
    } = methods;
    const [bottomHeight, setBottomHeight] = useState(0);
    useEffect(() => {
        if (buttonHidden) {
            const newBottomHeight =
                window.document.getElementById('bottom')?.offsetHeight!;
            setBottomHeight(newBottomHeight);
        } else {
            setBottomHeight(0);
        }
    }, [buttonHidden]);

    return (
        <div className={Style.container}>
            {/* <Header
                showBack={false}
                userType={userType}
                sessionId={sessionId}
                userId={employerId}
            /> */}
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
                            />
                        );
                    })}
            </div>

            <div className={Style.bottom} id="bottom">
                <div className={Style.toolbar}>
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
                </div>
                <div className={Style.textareaBox}>
                    <Input.TextArea
                        className={Style.textarea}
                        rows={5}
                        onChange={(e) => {
                            setContent(e.target.value);
                        }}
                        onFocus={() => {
                            setButtonHidden(true);
                        }}
                        onPressEnter={(e) => {
                            e.preventDefault();
                            createMessage();
                            pageScroll('comment');
                        }}
                        value={text}
                    />
                    <div className={Style.btn}>
                        <Button
                            type="primary"
                            disabled={text ? false : true}
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
