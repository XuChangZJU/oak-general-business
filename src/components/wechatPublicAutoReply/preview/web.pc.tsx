import React, { useState, useEffect } from 'react';
import { EntityDict } from "../../../oak-app-domain";
import { WebComponentProps } from 'oak-frontend-base';
import { Modal, Button, Table, Space, Upload, Form, Input, Dropdown, MenuProps } from 'antd';
import { WifiOutlined, LeftOutlined, UserOutlined, MenuOutlined } from '@ant-design/icons'
import Style from './web.module.less';
import { Editor } from '@wangeditor/editor-for-react';
import { IEditorConfig } from '@wangeditor/editor';
import { WechatMpInstance, WechatPublicInstance, WechatSDK } from 'oak-external-sdk';
import { ReplyType } from '../../../types/WeChat';

export default function Render(
    props: WebComponentProps<
        EntityDict,
        keyof EntityDict,
        false,
        {
            type: ReplyType,
            content: { text: string, image: string, video: string, voice: string }
        },
        {
        }
    >
) {
    const { type, content } = props.data;
    const [sendMsg, setSendMsg] = useState('');
    const editorConfig: Partial<IEditorConfig> = {
        readOnly: true,
        autoFocus: true,
        scroll: false,
    };
    useEffect(() => {
        if (type === 'text' && content.text) {
            setSendMsg(content.text);
        };
        if (type === 'image' && content.image) {
            setSendMsg(content.image);
        };
        if (type === 'video' && content.video) {
            setSendMsg(content.video);
        };
        if (type === 'voice' && content.voice) {
            setSendMsg(content.voice);
        };
    }, [content, type]);
    return (
        <div className={Style.container}>
            <div className={Style.phone}>
                <div className={Style.topBar}>
                    <div className={Style.time}>1:21</div>
                    <div className={Style.icons}>
                        <WifiOutlined style={{ fontSize: 14 }} />
                    </div>
                </div>
                <div className={Style.actionBar}>
                    <LeftOutlined style={{ fontSize: 20 }} />
                    <UserOutlined style={{ fontSize: 20 }} />
                </div>
                <div className={Style.page}>
                    {
                        type === 'text' && sendMsg ? (
                            <div className={Style.msg}>
                                <Editor
                                    defaultConfig={editorConfig}
                                    value={sendMsg}
                                    mode="default"
                                    className={Style.editor}
                                />
                            </div>
                        ) : type === 'image' && sendMsg ? (
                            <img src={sendMsg} className={Style.img} />
                        ) : type === 'video' && sendMsg ? (
                            <div className={Style.msg}>
                                <a style={{ color: '#1677ff' }} href={sendMsg} download={true}>下载视频素材</a>
                            </div>
                        ) : type === 'video' && sendMsg ? (
                            <div className={Style.msg}>
                                <a style={{ color: '#1677ff' }} href={sendMsg} download={true}>下载音频素材</a>
                            </div>
                        ) : null
                    }
                </div>
                <div className={Style.bottomBar}>
                    <div className={Style.keyBoard}>

                    </div>
                    <div className={Style.buttonList}>
                        <div className={Style.button}>
                            <div className={Style.buttonName}>菜单名称</div>
                        </div>
                        <div className={Style.button}>
                            <div className={Style.buttonName}>菜单名称</div>
                        </div>
                        <div className={Style.button}>
                            <div className={Style.buttonName}>菜单名称</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
