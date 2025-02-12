import React, { useState } from 'react';
import { Dropdown } from 'antd';
import { WifiOutlined, LeftOutlined, UserOutlined, MenuOutlined } from '@ant-design/icons';
import Style from './web.module.less';
import { Editor } from '@wangeditor/editor-for-react';
import ShowNews from '../showNews';
export default function Render(props) {
    const { button } = props.data;
    const { getMaterialImgAndVoice, getArticle, getMaterialVideo, setMessage } = props.methods;
    const [sendMsg, setSendMsg] = useState([]);
    const editorConfig = {
        readOnly: true,
        autoFocus: true,
        scroll: false,
    };
    const onClick = ({ key }) => {
        const index = Math.floor(Number(key) / 10);
        const index2 = Number(key) % 10;
        menuAction(button[index].sub_button[index2]);
    };
    const isValidUrl = (url) => {
        const urlPattern = /^(https?:\/\/)([\w-]+\.)+[a-z]{2,6}(\S*)$/;
        return urlPattern.test(url);
    };
    const menuAction = async (menu) => {
        if (menu.type === 'view' && menu.url) {
            if (isValidUrl(menu.url)) {
                window.open(menu.url);
            }
            else {
                setMessage({
                    type: 'warning',
                    content: 'URL无效'
                });
            }
            return;
        }
        if (menu.type === 'miniprogram' && menu.url) {
            setSendMsg([...sendMsg, { type: 'miniprogram', content: '不支持查看小程序，请前往微信公众号平台查看' }]);
            return;
        }
        if (menu.subType === 'text' && menu.content) {
            setSendMsg([...sendMsg, { type: 'text', content: menu.content }]);
            return;
        }
        if (menu.subType === 'image' && menu.media_id) {
            setSendMsg([...sendMsg, { type: 'image', content: await getMaterialImgAndVoice('image', menu.media_id) }]);
            return;
        }
        if (menu.type === 'article_id' && menu.article_id) {
            setSendMsg([...sendMsg, { type: 'article_id', content: await getArticle(menu.article_id) }]);
            return;
        }
        if (menu.subType === 'voice' && menu.media_id) {
            setSendMsg([...sendMsg, { type: 'voice', content: { url: await getMaterialImgAndVoice('voice', menu.media_id), media_id: menu.media_id } }]);
            return;
        }
        if (menu.subType === 'video' && menu.media_id) {
            setSendMsg([...sendMsg, { type: 'video', content: { url: await getMaterialVideo(menu.media_id).url, media_id: menu.media_id } }]);
            return;
        }
    };
    return (<div className={Style.container}>
            <div className={Style.phone}>
                <div className={Style.topBar}>
                    <div className={Style.time}>1:21</div>
                    <div className={Style.icons}>
                        <WifiOutlined style={{ fontSize: 14 }}/>
                    </div>
                </div>
                <div className={Style.actionBar}>
                    <LeftOutlined style={{ fontSize: 20 }}/>
                    <UserOutlined style={{ fontSize: 20 }}/>
                </div>
                <div className={Style.page}>
                    {(sendMsg && sendMsg.length > 0) &&
            sendMsg.map((ele) => {
                if (ele.type === 'text') {
                    return <div className={Style.msg}>
                                    <Editor defaultConfig={editorConfig} value={ele.content} mode="default" className={Style.editor}/>
                                </div>;
                }
                else if (ele.type === 'image') {
                    return <img src={ele.content} className={Style.img}/>;
                }
                else if (ele.type === 'article_id') {
                    return <div className={Style.news}>
                                    <ShowNews news={ele.content}/>
                                </div>;
                }
                else if (ele.type === 'voice') {
                    return <div className={Style.msg}>
                                    <a style={{ color: '#1677ff' }} href={ele.content.url} download={true}>{ele.content.media_id}</a>
                                </div>;
                }
                else if (ele.type === 'video') {
                    return <div className={Style.msg}>
                                    <a style={{ color: '#1677ff' }} href={ele.content.url} download={true}>{ele.content.media_id}</a>
                                </div>;
                }
                else if (ele.type === 'miniprogram') {
                    return <div className={Style.msg}>{ele.content}</div>;
                }
            })}
                </div>
                <div className={Style.bottomBar}>
                    <div className={Style.keyBoard}>

                    </div>
                    <div className={Style.buttonList}>
                        {button?.map((ele, index) => {
            if (ele.sub_button && ele.sub_button.length > 0) {
                const items = ele.sub_button.map((sub, index2) => {
                    return {
                        label: sub.name,
                        key: `${index * 10 + index2}`,
                    };
                });
                return <Dropdown arrow={false} menu={{ items, onClick }} placement='top'>
                                        <div className={Style.button}>
                                            <MenuOutlined style={{ fontSize: 12, color: '#d0d0d0' }}/>
                                            <div className={Style.buttonName} style={{ marginLeft: 5 }}>{ele.name}</div>
                                        </div>
                                    </Dropdown>;
            }
            else {
                return <div className={Style.button} onClick={() => {
                        menuAction(ele);
                    }}>
                                        <div className={Style.buttonName}>{ele.name}</div>
                                    </div>;
            }
        })}
                    </div>
                </div>
            </div>
        </div>);
}
