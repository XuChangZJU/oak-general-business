import React, { useState, useEffect } from 'react';
import { EntityDict } from "../../../oak-app-domain";
import { WebComponentProps } from 'oak-frontend-base';
import { Modal, Button, Space, Radio, Form, Input } from 'antd';
const { Search } = Input;
const { confirm } = Modal
import Style from './web.module.less';
import { generateNewIdAsync } from 'oak-domain/lib/utils/uuid';
import {
    EyeOutlined,
    CheckOutlined,
    DeleteOutlined,
    DownloadOutlined,
    SwapOutlined,
} from '@ant-design/icons'
import ShowNews from '../showNews';
import WechatMaterialLibrary from '../../wechatMaterialLibrary';
import SelectMiniprogram from '../selectMiniprogram';
import SelectArticle from '../selectArticle';
import TextClick from '../textClick';

export default function Render(
    props: WebComponentProps<
        EntityDict,
        keyof EntityDict,
        false,
        {
            id: string;
            config: any;
            menuIndex: number;
            file: File;
            errorIndex: number[];
            oakId: string;
            menuType: string;
            selectedBtn: number;
            selectedSubBtn: number;
            currentIndex: number;
            getNewSelectedBtn: (selectedBtn: number) => void;
            getNewSelectedSubBtn: (selectedSubBtn: number) => void;
            getNewCurrentIndex: (currentIndex: number) => void;
            changeIsPreview: (isPreview: boolean) => void;
            getOpen: (open: boolean) => void;
            applicationId: string;
            menuId: number;
        },
        {
            setConfig: (
                index: number,
                content: any,
                currentIndex?: number
            ) => void;
            confirmName: (menuName: string) => string;
            confirmSubName: (menuName: string) => string;
            toRight: (index: number) => void;
            toLeft: (index: number) => void;
            toUp: (currentIndex: number, index: number) => void;
            toDown: (currentIndex: number, index: number) => void;
            editMenuName: (
                index: number,
                name: string,
                currentIndex?: number
            ) => void;
            deleteMenuContent: (index: number, currentIndex?: number) => void;
            getMaterialImgAndVoice: (
                type: string,
                mediaId: string
            ) => Promise<string>;
            getMaterialVideo: (mediaId: string) => void;
            decideMenuContentLabel: (
                obj: any,
                type: 'news' | 'image' | 'video' | 'voice' | 'text'
            ) => string;
            getArticle: (article_id: string) => void;
            createMenu: (errorInfo: string, errorUrlInfo: string) => void;
            deleteConditionalMenu: () => void;
            confirmUrl: (url: string) => string;
        }
    >
) {
    const { data, methods } = props;
    const {
        config,
        menuIndex,
        selectedBtn,
        selectedSubBtn,
        currentIndex,
        changeIsPreview,
        getOpen,
        menuType,
        applicationId,
        menuId,
    } = data;
    const {
        setConfig,
        confirmName,
        confirmSubName,
        editMenuName,
        deleteMenuContent,
        getMaterialImgAndVoice,
        getMaterialVideo,
        decideMenuContentLabel,
        getArticle,
        createMenu,
        deleteConditionalMenu,
        confirmUrl,
    } = methods;
    const [msgType, setMsgType] = useState('sendMsg');
    const [errorInfo, setErrorInfo] = useState('');
    const [errorUrlInfo, setErrorUrlInfo] = useState('');
    const [onlyOne, setOnlyOne] = useState(true);
    const [menuName, setMenuName] = useState('');
    const [open, setOpen] = useState(false);
    const [type, setType] = useState(
        '' as 'image' | 'news' | 'voice' | 'video' | 'text' | ''
    );
    const [menuContent, setMenuContent] = useState(null as any);
    const [decidedMenuContent, setDecidedMenuContent] = useState(null as any);
    const [url, setUrl] = useState('');
    const getUrl = (url: string) => {
        setUrl(url);
    };
    const getMenuContent = (menuContent: any) => {
        setMenuContent(menuContent);
        if (msgType === 'miniprogram') {
            if (selectedBtn > 0) {
                setConfig(selectedBtn - 1, {
                    type: 'miniprogram',
                    url: menuContent.url,
                    pagepath: menuContent.pagepath,
                    appid: menuContent.appid,
                });
            } else {
                setConfig(
                    selectedSubBtn - 1,
                    {
                        type: 'miniprogram',
                        url: menuContent.url,
                        pagepath: menuContent.pagepath,
                        appid: menuContent.appid,
                    },
                    currentIndex
                );
            }
        }
    };
    const changeOpen = (open: boolean) => {
        setOpen(open);
        getOpen(open);
    };
    const getDecidedMenuContent = async (menuContent: any) => {
        setDecidedMenuContent(menuContent);
        if (selectedBtn > 0) {
            setConfig(selectedBtn - 1, {
                type: 'click',
                key: await generateNewIdAsync(),
                subType: 'text',
                content: menuContent,
            });
        } else {
            setConfig(
                selectedSubBtn - 1,
                {
                    type: 'click',
                    key: await generateNewIdAsync(),
                    subType: 'text',
                    content: menuContent,
                },
                currentIndex
            );
        }
    };
    useEffect(() => {
        console.log(config);
        if (config && config.button && config.button[0] && onlyOne) {
            setMenuName(config.button[0].name);
            setOnlyOne(false);
        }
    }, [config]);

    useEffect(() => {
        const fetchData = async (id: string, type: string) => {
            if (type === 'news') {
                setDecidedMenuContent({
                    content: { news_item: await getArticle(id) },
                });
            }
            if (type === 'video') {
                setDecidedMenuContent(await getMaterialVideo(id));
            }
            if (type === 'image' || type === 'voice') {
                setDecidedMenuContent({
                    url: await getMaterialImgAndVoice(type, id),
                    media_id: id,
                });
            }
        };
        if (selectedBtn !== 0) {
            const menuConfig = config.button[selectedBtn - 1];
            setMenuName(menuConfig?.name);
            if (menuConfig?.type === 'media_id') {
                setUrl('');
                setMsgType('sendMsg');
                setType(menuConfig.subType);
                if (menuConfig.subType === 'video') {
                    fetchData(menuConfig.media_id, 'video');
                } else {
                    fetchData(menuConfig.media_id, menuConfig.subType);
                }
            } else if (menuConfig?.type === 'click') {
                setUrl('');
                setMsgType('sendMsg');
                setType('text');
                setDecidedMenuContent(menuConfig.content);
            } else if (menuConfig?.type === 'article_id') {
                setUrl('');
                setMsgType('sendMsg');
                setType('news');
                fetchData(menuConfig.article_id, 'news');
            } else if (menuConfig?.type === 'miniprogram') {
                setUrl('');
                setMsgType('miniprogram');
                setMenuContent({
                    appid: menuConfig.appid,
                    url: menuConfig.url,
                    pagepath: menuConfig.pagepath,
                });
            } else if (menuConfig?.type === 'view') {
                setMsgType('view');
                setUrl(menuConfig.url);
            } else {
                setUrl('');
                setType('');
                setMsgType('sendMsg');
                setDecidedMenuContent(null);
                setMenuContent(null);
            }
        }
    }, [selectedBtn]);

    useEffect(() => {
        const fetchData = async (id: string, type: string) => {
            if (type === 'news') {
                setDecidedMenuContent({
                    content: { news_item: await getArticle(id) },
                });
            }
            if (type === 'video') {
                setDecidedMenuContent(await getMaterialVideo(id));
            }
            if (type === 'image' || type === 'voice') {
                setDecidedMenuContent({
                    url: await getMaterialImgAndVoice(type, id),
                    media_id: id,
                });
            }
        };
        if (selectedSubBtn !== 0) {
            const subMenuConfig =
                config.button[currentIndex]?.sub_button[selectedSubBtn - 1];
            setMenuName(subMenuConfig?.name);
            if (subMenuConfig?.type === 'media_id') {
                setUrl('');
                setMsgType('sendMsg');
                setType(subMenuConfig.subType);
                if (subMenuConfig.subType === 'video') {
                    fetchData(subMenuConfig.media_id, 'video');
                } else {
                    fetchData(subMenuConfig.media_id, subMenuConfig.subType);
                }
            } else if (subMenuConfig?.type === 'click') {
                setUrl('');
                setMsgType('sendMsg');
                setType('text');
                setDecidedMenuContent(subMenuConfig.content);
            } else if (subMenuConfig?.type === 'article_id') {
                setUrl('');
                setMsgType('sendMsg');
                setType('news');
                fetchData(subMenuConfig?.article_id, 'news');
            } else if (subMenuConfig?.type === 'miniprogram') {
                setUrl('');
                setMsgType('miniprogram');
                setMenuContent({
                    appid: subMenuConfig.appid,
                    url: subMenuConfig.url,
                    pagepath: subMenuConfig.pagepath,
                });
            } else if (subMenuConfig?.type === 'view') {
                setMsgType('view');
                setUrl(subMenuConfig.url);
            } else {
                setType('');
                setUrl('');
                setMsgType('sendMsg');
                setDecidedMenuContent(null);
                setMenuContent(null);
            }
        }
    }, [selectedSubBtn]);
    useEffect(() => {
        if (url && url.length > 0) {
            if (selectedBtn > 0) {
                setConfig(selectedBtn - 1, { type: 'view', url });
            } else {
                setConfig(
                    selectedSubBtn - 1,
                    { type: 'view', url },
                    currentIndex
                );
            }
        }
    }, [url]);
    return (
        <div className={Style.container}>
            {config &&
            config.button &&
            config.button.length > 0 &&
            (selectedBtn !== 0 || selectedSubBtn !== 0) ? (
                <div className={Style.upsertMenu}>
                    <div className={Style.content}>
                        <div className={Style.title}>
                            {selectedSubBtn !== 0 ? '子菜单信息' : '菜单信息'}
                        </div>
                        <div style={{ marginBottom: 32 }}>
                            <Form.Item
                                label={<div className={Style.label}>名称</div>}
                                colon={false}
                                help={
                                    <div>
                                        <div>{`仅支持中英文和数字，字数不超过${
                                            selectedSubBtn !== 0 ? 8 : 4
                                        }个汉字或${
                                            selectedSubBtn !== 0 ? 16 : 8
                                        }个字母。`}</div>
                                        {errorInfo && (
                                            <div style={{ color: '#fa5151' }}>
                                                {errorInfo}
                                            </div>
                                        )}
                                    </div>
                                }
                            >
                                <Input
                                    style={{ width: 340 }}
                                    onChange={(val) => {
                                        setMenuName(val.target.value);
                                        if (selectedSubBtn !== 0) {
                                            setErrorInfo(
                                                confirmSubName(val.target.value)
                                            );
                                            if (
                                                !confirmSubName(
                                                    val.target.value
                                                )
                                            ) {
                                                editMenuName(
                                                    selectedSubBtn - 1,
                                                    val.target.value,
                                                    currentIndex
                                                );
                                            }
                                        } else {
                                            setErrorInfo(
                                                confirmName(val.target.value)
                                            );
                                            if (
                                                !confirmName(val.target.value)
                                            ) {
                                                editMenuName(
                                                    selectedBtn - 1,
                                                    val.target.value
                                                );
                                            }
                                        }
                                    }}
                                    status={errorInfo ? 'error' : ''}
                                    value={menuName}
                                />
                            </Form.Item>
                        </div>
                        {(config.button[currentIndex]?.sub_button?.length ===
                            0 &&
                            selectedSubBtn === 0) ||
                        selectedSubBtn > 0 ? (
                            <>
                                <Form.Item
                                    colon={false}
                                    label={
                                        <div className={Style.label}>
                                            消息类型
                                        </div>
                                    }
                                >
                                    <Radio.Group
                                        value={msgType}
                                        onChange={(val) =>
                                            setMsgType(val.target.value)
                                        }
                                    >
                                        <Radio value={'sendMsg'}>
                                            发送消息
                                        </Radio>
                                        <Radio value={'view'}>跳转页面</Radio>
                                        <Radio value={'miniprogram'}>
                                            跳转小程序
                                        </Radio>
                                    </Radio.Group>
                                </Form.Item>
                                {msgType === 'sendMsg' ? (
                                    <>
                                        <Form.Item
                                            colon={false}
                                            label={
                                                <div className={Style.label}>
                                                    {decideMenuContentLabel(
                                                        decidedMenuContent,
                                                        type as
                                                            | 'video'
                                                            | 'image'
                                                            | 'text'
                                                            | 'news'
                                                            | 'voice'
                                                    )}
                                                </div>
                                            }
                                        >
                                            {!decidedMenuContent &&
                                            type !== 'text' ? (
                                                <div
                                                    className={
                                                        Style.menuContent
                                                    }
                                                >
                                                    <div
                                                        className={Style.item}
                                                        onClick={() => {
                                                            setOpen(true);
                                                            getOpen(true);
                                                            setType('news');
                                                        }}
                                                    >
                                                        图文信息
                                                    </div>
                                                    <div
                                                        className={Style.item}
                                                        onClick={() => {
                                                            setType('text');
                                                        }}
                                                    >
                                                        文字
                                                    </div>
                                                    <div
                                                        className={Style.item}
                                                        onClick={() => {
                                                            setOpen(true);
                                                            getOpen(true);
                                                            setType('image');
                                                        }}
                                                    >
                                                        图片
                                                    </div>
                                                    <div
                                                        className={Style.item}
                                                        onClick={() => {
                                                            setOpen(true);
                                                            getOpen(true);
                                                            setType('voice');
                                                        }}
                                                    >
                                                        音频
                                                    </div>
                                                    {/* <div className={Style.item}>
                                                                                视频号动态
                                                                            </div> */}
                                                    <div
                                                        className={Style.item}
                                                        onClick={() => {
                                                            setOpen(true);
                                                            getOpen(true);
                                                            setType('video');
                                                        }}
                                                    >
                                                        视频
                                                    </div>
                                                </div>
                                            ) : type === 'image' ? (
                                                <div
                                                    className={Style.coverImage}
                                                >
                                                    <img
                                                        className={Style.img}
                                                        src={
                                                            decidedMenuContent.url
                                                        }
                                                    />
                                                    <div
                                                        className={
                                                            Style.buttonGroup
                                                        }
                                                    >
                                                        <div
                                                            className={
                                                                Style.buttonItem
                                                            }
                                                            onClick={() => {
                                                                const modal =
                                                                    confirm({
                                                                        title: '确定删除该图片吗？',
                                                                        content:
                                                                            '删除后不可恢复',
                                                                        okText: '确定',
                                                                        cancelText:
                                                                            '取消',
                                                                        onOk: async (
                                                                            e
                                                                        ) => {
                                                                            modal!.destroy();
                                                                            setDecidedMenuContent(
                                                                                null
                                                                            );
                                                                            if (
                                                                                selectedBtn >
                                                                                0
                                                                            ) {
                                                                                deleteMenuContent(
                                                                                    selectedBtn -
                                                                                        1
                                                                                );
                                                                            } else {
                                                                                deleteMenuContent(
                                                                                    selectedSubBtn -
                                                                                        1,
                                                                                    currentIndex
                                                                                );
                                                                            }
                                                                        },
                                                                    });
                                                            }}
                                                        >
                                                            <DeleteOutlined />
                                                        </div>
                                                        <div
                                                            className={
                                                                Style.buttonItem
                                                            }
                                                            onClick={() => {
                                                                setOpen(true);
                                                                getOpen(true);
                                                            }}
                                                        >
                                                            <SwapOutlined />
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : type === 'voice' ? (
                                                <div
                                                    className={Style.fileCover}
                                                >
                                                    <a
                                                        href={
                                                            decidedMenuContent.url
                                                        }
                                                        download={true}
                                                        style={{
                                                            color: '#1677FF',
                                                            cursor: 'pointer',
                                                        }}
                                                    >
                                                        <DownloadOutlined />
                                                        {
                                                            decidedMenuContent.media_id
                                                        }
                                                    </a>
                                                    <div
                                                        className={
                                                            Style.buttonGroup
                                                        }
                                                    >
                                                        <div
                                                            className={
                                                                Style.buttonItem
                                                            }
                                                            onClick={() => {
                                                                const modal =
                                                                    confirm({
                                                                        title: '确定删除该音频吗？',
                                                                        content:
                                                                            '删除后不可恢复',
                                                                        okText: '确定',
                                                                        cancelText:
                                                                            '取消',
                                                                        onOk: async (
                                                                            e
                                                                        ) => {
                                                                            modal!.destroy();
                                                                            setDecidedMenuContent(
                                                                                null
                                                                            );
                                                                            if (
                                                                                selectedBtn >
                                                                                0
                                                                            ) {
                                                                                deleteMenuContent(
                                                                                    selectedBtn -
                                                                                        1
                                                                                );
                                                                            } else {
                                                                                deleteMenuContent(
                                                                                    selectedSubBtn -
                                                                                        1,
                                                                                    currentIndex
                                                                                );
                                                                            }
                                                                        },
                                                                    });
                                                            }}
                                                        >
                                                            <DeleteOutlined />
                                                        </div>
                                                        <div
                                                            className={
                                                                Style.buttonItem
                                                            }
                                                            onClick={() => {
                                                                setOpen(true);
                                                                getOpen(true);
                                                            }}
                                                        >
                                                            <SwapOutlined />
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : type === 'video' ? (
                                                <div
                                                    className={Style.fileCover}
                                                >
                                                    <a
                                                        href={
                                                            decidedMenuContent.url
                                                        }
                                                        download={true}
                                                        style={{
                                                            color: '#1677FF',
                                                            cursor: 'pointer',
                                                        }}
                                                    >
                                                        <DownloadOutlined />
                                                        {
                                                            decidedMenuContent.media_id
                                                        }
                                                    </a>
                                                    <div
                                                        className={
                                                            Style.buttonGroup
                                                        }
                                                    >
                                                        <div
                                                            className={
                                                                Style.buttonItem
                                                            }
                                                            onClick={() => {
                                                                const modal =
                                                                    confirm({
                                                                        title: '确定删除该视频吗？',
                                                                        content:
                                                                            '删除后不可恢复',
                                                                        okText: '确定',
                                                                        cancelText:
                                                                            '取消',
                                                                        onOk: async (
                                                                            e
                                                                        ) => {
                                                                            modal!.destroy();
                                                                            setDecidedMenuContent(
                                                                                null
                                                                            );
                                                                            if (
                                                                                selectedBtn >
                                                                                0
                                                                            ) {
                                                                                deleteMenuContent(
                                                                                    selectedBtn -
                                                                                        1
                                                                                );
                                                                            } else {
                                                                                deleteMenuContent(
                                                                                    selectedSubBtn -
                                                                                        1,
                                                                                    currentIndex
                                                                                );
                                                                            }
                                                                        },
                                                                    });
                                                            }}
                                                        >
                                                            <DeleteOutlined />
                                                        </div>
                                                        <div
                                                            className={
                                                                Style.buttonItem
                                                            }
                                                            onClick={() => {
                                                                setOpen(true);
                                                                getOpen(true);
                                                            }}
                                                        >
                                                            <SwapOutlined />
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : type === 'news' ? (
                                                <div className={Style.news}>
                                                    <ShowNews
                                                        news={
                                                            decidedMenuContent
                                                                ?.content
                                                                ?.news_item
                                                        }
                                                        oakAutoUnmount={false}
                                                    />
                                                    <div
                                                        className={
                                                            Style.buttonGroup
                                                        }
                                                        style={{
                                                            height: '100%',
                                                        }}
                                                    >
                                                        <div
                                                            className={
                                                                Style.buttonItem
                                                            }
                                                            onClick={() => {
                                                                const modal =
                                                                    confirm({
                                                                        title: '确定删除该图文信息吗？',
                                                                        content:
                                                                            '删除后不可恢复',
                                                                        okText: '确定',
                                                                        cancelText:
                                                                            '取消',
                                                                        onOk: async (
                                                                            e
                                                                        ) => {
                                                                            modal!.destroy();
                                                                            setDecidedMenuContent(
                                                                                null
                                                                            );
                                                                            if (
                                                                                selectedBtn >
                                                                                0
                                                                            ) {
                                                                                deleteMenuContent(
                                                                                    selectedBtn -
                                                                                        1
                                                                                );
                                                                            } else {
                                                                                deleteMenuContent(
                                                                                    selectedSubBtn -
                                                                                        1,
                                                                                    currentIndex
                                                                                );
                                                                            }
                                                                        },
                                                                    });
                                                            }}
                                                        >
                                                            <DeleteOutlined />
                                                        </div>
                                                        <div
                                                            className={
                                                                Style.buttonItem
                                                            }
                                                            onClick={() => {
                                                                setOpen(true);
                                                                getOpen(true);
                                                            }}
                                                        >
                                                            <SwapOutlined />
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : null}
                                            {type === 'text' && (
                                                <div className={Style.editor}>
                                                    <TextClick
                                                        oakAutoUnmount={true}
                                                        value={
                                                            decidedMenuContent
                                                        }
                                                        getDecidedMenuContent={
                                                            getDecidedMenuContent
                                                        }
                                                    />
                                                    <div
                                                        className={
                                                            Style.buttonGroup
                                                        }
                                                        style={{
                                                            height: 36,
                                                            position:
                                                                'absolute',
                                                            right: -50,
                                                        }}
                                                    >
                                                        <div
                                                            className={
                                                                Style.buttonItem
                                                            }
                                                            onClick={() => {
                                                                const modal =
                                                                    confirm({
                                                                        title: '确定删除该文字吗？',
                                                                        content:
                                                                            '删除后不可恢复',
                                                                        okText: '确定',
                                                                        cancelText:
                                                                            '取消',
                                                                        onOk: async (
                                                                            e
                                                                        ) => {
                                                                            modal!.destroy();
                                                                            setType(
                                                                                'news'
                                                                            );
                                                                            setDecidedMenuContent(
                                                                                null
                                                                            );
                                                                            if (
                                                                                selectedBtn >
                                                                                0
                                                                            ) {
                                                                                deleteMenuContent(
                                                                                    selectedBtn -
                                                                                        1
                                                                                );
                                                                            } else {
                                                                                deleteMenuContent(
                                                                                    selectedSubBtn -
                                                                                        1,
                                                                                    currentIndex
                                                                                );
                                                                            }
                                                                        },
                                                                    });
                                                            }}
                                                        >
                                                            <DeleteOutlined />
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </Form.Item>
                                        <Modal
                                            open={open}
                                            footer={
                                                <Space>
                                                    <Button
                                                        type={'primary'}
                                                        disabled={
                                                            !menuContent!!
                                                        }
                                                        onClick={() => {
                                                            setOpen(false);
                                                            getOpen(false);
                                                            setDecidedMenuContent(
                                                                menuContent
                                                            );
                                                            if (
                                                                selectedBtn > 0
                                                            ) {
                                                                if (
                                                                    type !==
                                                                    'news'
                                                                ) {
                                                                    if (
                                                                        type ===
                                                                        'image'
                                                                    ) {
                                                                        setConfig(
                                                                            selectedBtn -
                                                                                1,
                                                                            {
                                                                                type: 'media_id',
                                                                                media_id:
                                                                                    menuContent.media_id,
                                                                                subType:
                                                                                    'image',
                                                                            }
                                                                        );
                                                                    }
                                                                    if (
                                                                        type ===
                                                                        'voice'
                                                                    ) {
                                                                        setConfig(
                                                                            selectedBtn -
                                                                                1,
                                                                            {
                                                                                type: 'media_id',
                                                                                media_id:
                                                                                    menuContent.media_id,
                                                                                subType:
                                                                                    'voice',
                                                                            }
                                                                        );
                                                                    }
                                                                    if (
                                                                        type ===
                                                                        'video'
                                                                    ) {
                                                                        setConfig(
                                                                            selectedBtn -
                                                                                1,
                                                                            {
                                                                                type: 'media_id',
                                                                                media_id:
                                                                                    menuContent.media_id,
                                                                                subType:
                                                                                    'video',
                                                                            }
                                                                        );
                                                                    }
                                                                } else {
                                                                    setConfig(
                                                                        selectedBtn -
                                                                            1,
                                                                        {
                                                                            type: 'article_id',
                                                                            article_id:
                                                                                menuContent.article_id,
                                                                        }
                                                                    );
                                                                }
                                                            } else {
                                                                if (
                                                                    type !==
                                                                    'news'
                                                                ) {
                                                                    if (
                                                                        type ===
                                                                        'image'
                                                                    ) {
                                                                        setConfig(
                                                                            selectedSubBtn -
                                                                                1,
                                                                            {
                                                                                type: 'media_id',
                                                                                media_id:
                                                                                    menuContent.media_id,
                                                                                subType:
                                                                                    'image',
                                                                            },
                                                                            currentIndex
                                                                        );
                                                                    }
                                                                    if (
                                                                        type ===
                                                                        'voice'
                                                                    ) {
                                                                        setConfig(
                                                                            selectedSubBtn -
                                                                                1,
                                                                            {
                                                                                type: 'media_id',
                                                                                media_id:
                                                                                    menuContent.media_id,
                                                                                subType:
                                                                                    'voice',
                                                                            },
                                                                            currentIndex
                                                                        );
                                                                    }
                                                                    if (
                                                                        type ===
                                                                        'video'
                                                                    ) {
                                                                        setConfig(
                                                                            selectedSubBtn -
                                                                                1,
                                                                            {
                                                                                type: 'media_id',
                                                                                media_id:
                                                                                    menuContent.media_id,
                                                                                subType:
                                                                                    'video',
                                                                            },
                                                                            currentIndex
                                                                        );
                                                                    }
                                                                } else {
                                                                    setConfig(
                                                                        selectedSubBtn -
                                                                            1,
                                                                        {
                                                                            type: 'article_id',
                                                                            article_id:
                                                                                menuContent.article_id,
                                                                        },
                                                                        currentIndex
                                                                    );
                                                                }
                                                            }
                                                        }}
                                                    >
                                                        确定
                                                    </Button>
                                                    <Button
                                                        type={'default'}
                                                        onClick={() => {
                                                            setOpen(false);
                                                            getOpen(false);
                                                            setMenuContent(
                                                                null
                                                            );
                                                        }}
                                                    >
                                                        取消
                                                    </Button>
                                                </Space>
                                            }
                                            onCancel={() => {
                                                setOpen(false);
                                                getOpen(false);
                                                setMenuContent(null);
                                            }}
                                            destroyOnClose={true}
                                            width={960}
                                        >
                                            <WechatMaterialLibrary
                                                oakAutoUnmount={true}
                                                type={
                                                    type as
                                                        | 'news'
                                                        | 'image'
                                                        | 'video'
                                                        | 'voice'
                                                }
                                                getMenuContent={getMenuContent}
                                                applicationId={applicationId}
                                            />
                                        </Modal>
                                    </>
                                ) : msgType === 'view' ? (
                                    <Form.Item
                                        colon={false}
                                        label={
                                            <div className={Style.label}>
                                                网页链接
                                            </div>
                                        }
                                        help={
                                            <>
                                                {errorUrlInfo && (
                                                    <div
                                                        style={{
                                                            color: '#fa5151',
                                                        }}
                                                    >
                                                        {errorUrlInfo}
                                                    </div>
                                                )}
                                            </>
                                        }
                                    >
                                        <div
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                            }}
                                        >
                                            <Input
                                                placeholder="公众号链接:请以https://或http://开头"
                                                style={{ width: 340 }}
                                                value={url}
                                                onChange={(val) => {
                                                    setUrl(val.target.value);
                                                    setErrorUrlInfo(
                                                        confirmUrl(
                                                            val.target.value
                                                        )
                                                    );
                                                }}
                                                status={
                                                    errorUrlInfo ? 'error' : ''
                                                }
                                            />
                                            <a
                                                style={{ padding: '10px 0' }}
                                                onClick={() => {
                                                    setOpen(true);
                                                    getOpen(true);
                                                }}
                                            >
                                                选择图文链接
                                            </a>
                                        </div>
                                        <Modal
                                            open={open}
                                            footer={null}
                                            title={'选择图文链接'}
                                            onCancel={() => {
                                                setOpen(false);
                                                getOpen(false);
                                            }}
                                            width={600}
                                        >
                                            <SelectArticle
                                                oakAutoUnmount={true}
                                                changeOpen={changeOpen}
                                                getUrl={getUrl}
                                                applicationId={applicationId}
                                            />
                                        </Modal>
                                    </Form.Item>
                                ) : (
                                    <Form.Item
                                        colon={false}
                                        label={
                                            <div className={Style.label}>
                                                小程序
                                            </div>
                                        }
                                    >
                                        <Button
                                            onClick={() => {
                                                setOpen(true);
                                                getOpen(true);
                                            }}
                                        >
                                            选择小程序
                                        </Button>
                                        {menuContent && menuContent.appid && (
                                            <div>{menuContent.appid}</div>
                                        )}
                                        <Modal
                                            title={'添加小程序'}
                                            open={open}
                                            footer={null}
                                            onCancel={() => {
                                                setOpen(false);
                                                getOpen(false);
                                            }}
                                        >
                                            <SelectMiniprogram
                                                oakAutoUnmount={true}
                                                getMenuContent={getMenuContent}
                                                changeOpen={changeOpen}
                                            />
                                        </Modal>
                                    </Form.Item>
                                )}
                            </>
                        ) : null}
                    </div>
                    <div className={Style.actionBar}>
                        <Space>
                            <Button onClick={() => changeIsPreview(true)}>
                                <EyeOutlined />
                                预览
                            </Button>
                            <Button
                                type="primary"
                                onClick={async () => {
                                    createMenu(errorInfo, errorUrlInfo);
                                }}
                            >
                                <CheckOutlined />
                                发布
                            </Button>
                            {menuType === 'conditional' && config && menuId && (
                                <Button
                                    type="primary"
                                    danger
                                    onClick={() => {
                                        const modal = confirm({
                                            title: '确定删除该个性化菜单吗？',
                                            content: '删除后不可恢复',
                                            okText: '确定',
                                            cancelText: '取消',
                                            onOk: async (e) => {
                                                await deleteConditionalMenu();
                                                modal!.destroy();
                                            },
                                        });
                                    }}
                                >
                                    <DeleteOutlined />
                                    删除
                                </Button>
                            )}
                        </Space>
                    </div>
                </div>
            ) : (
                <div className={Style.empty}>
                    <div className={Style.content}>
                        你未添加自定义菜单，点击左侧添加菜单为公众号创建菜单栏。
                    </div>
                    <div className={Style.actionBar}>
                        <Space>
                            <Button onClick={() => changeIsPreview(true)}>
                                <EyeOutlined />
                                预览
                            </Button>
                            <Button
                                type="primary"
                                onClick={async () => {
                                    createMenu(errorInfo, errorUrlInfo);
                                }}
                            >
                                <CheckOutlined />
                                发布
                            </Button>
                        </Space>
                    </div>
                </div>
            )}
        </div>
    );
}

