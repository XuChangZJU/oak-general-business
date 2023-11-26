import React, { useState, useEffect } from 'react';
import { Modal, Popover } from 'antd';
const { confirm } = Modal;
import Style from './web.module.less';
import { WifiOutlined, LeftOutlined, ArrowLeftOutlined, ArrowRightOutlined, UserOutlined, ArrowDownOutlined, DeleteOutlined, ArrowUpOutlined, PlusOutlined } from '@ant-design/icons';
export default function Render(props) {
    const { config, errorIndex, menuIndex, menuType, changeConfig, getSelectedBtn, getSelectedSubBtn, getCurrentIndex, isPreview, open, tabKey, } = props.data;
    const { deleteMenuItem, toRight, toLeft, toUp, toDown, deleteSubMenuItem, } = props.methods;
    const [selectedBtn, setSelectedBtn] = useState(0);
    const [selectedSubBtn, setSelectedSubBtn] = useState(0);
    const [currentIndex, setCurrentIndex] = useState(1);
    const [onlyOne, setOnlyOne] = useState(true);
    const [currentMenuType, setCurrentMenuType] = useState(0);
    useEffect(() => {
        if (config && config.button && config.button[0] && onlyOne) {
            setSelectedBtn(1);
            getSelectedBtn(1);
            setOnlyOne(false);
        }
    }, [config]);
    useEffect(() => {
        if (selectedBtn !== 0) {
            setSelectedSubBtn(0);
            getSelectedSubBtn(0);
            setCurrentIndex(selectedBtn - 1);
            getCurrentIndex(selectedBtn - 1);
        }
    }, [selectedBtn]);
    useEffect(() => {
        if (selectedSubBtn !== 0) {
            setSelectedBtn(0);
            getSelectedBtn(0);
        }
    }, [selectedSubBtn]);
    useEffect(() => {
        if (menuType && menuType === 'common') {
            setCurrentMenuType(1);
            return;
        }
        if (menuType && menuType === 'conditional') {
            setCurrentMenuType(2);
            return;
        }
    }, [menuType]);
    return (<div className={Style.container}>
            <div className={Style.phone}>
                <div className={Style.topBar}>
                    <div className={Style.time}>1:21</div>
                    <div className={Style.icons}>
                        <WifiOutlined style={{ fontSize: 12 }}/>
                    </div>
                </div>
                <div className={Style.actionBar}>
                    <LeftOutlined style={{ fontSize: 18 }}/>
                    <UserOutlined style={{ fontSize: 18 }}/>
                </div>
                <div className={Style.page}></div>
                <div className={Style.bottomBar}>
                    <div className={Style.keyBoard}>
                    </div>
                    {config && config.button && config.button.length > 0 ? (<div className={Style.menu}>
                                {config.button.map((ele, index) => (<Popover open={!open && !isPreview && currentIndex === index && ((menuType === 'common' && currentMenuType === 1) || (menuType === 'conditional' && currentMenuType === 2)) && tabKey === 'menu'} trigger={'click'} content={<div className={Style.subMenu}>
                                                    {config.button[index].sub_button.length > 0 ? (<>
                                                                {config.button[index].sub_button.map((ele, index2) => (<div className={Style.subMenuContent}>
                                                                            <div className={Style.subMenuItem} style={errorIndex?.includes((index + 1) * 10 + index2) ? {
                                border: '1px solid #FF4D4F',
                                color: '#FF4D4F'
                            }
                                :
                                    selectedSubBtn === index2 + 1 ?
                                        {
                                            border: '1px solid #1677FF',
                                            color: '#1677FF'
                                        } :
                                        {}} onClick={() => {
                                setSelectedSubBtn(index2 + 1);
                                getSelectedSubBtn(index2 + 1);
                            }}>
                                                                                {ele.name}
                                                                            </div>
                                                                            {selectedSubBtn === index2 + 1 &&
                                <div className={Style.subButtonGroup}>
                                                                                    {selectedSubBtn > 1
                                        && config.button[currentIndex].sub_button.length !== 1 &&
                                        <div className={Style.buttonItem} onClick={() => {
                                                toUp(currentIndex, selectedSubBtn);
                                                setSelectedSubBtn(selectedSubBtn - 1);
                                                getSelectedSubBtn(selectedSubBtn - 1);
                                            }}>
                                                                                            <ArrowUpOutlined />
                                                                                        </div>}
                                                                                    <div className={Style.buttonItem} onClick={() => {
                                        const modal = confirm({
                                            title: '确定删除该菜单吗？',
                                            content: '删除后不可恢复',
                                            okText: '确定',
                                            cancelText: '取消',
                                            onOk: async (e) => {
                                                if (selectedSubBtn !== 1 && config.button[currentIndex].sub_button.length > 1) {
                                                    setSelectedSubBtn(selectedSubBtn - 1);
                                                    getSelectedSubBtn(selectedSubBtn - 1);
                                                }
                                                else if (selectedSubBtn === 1 && config.button[currentIndex].sub_button.length > 1) {
                                                    setSelectedSubBtn(1);
                                                    getSelectedSubBtn(1);
                                                }
                                                else {
                                                    setSelectedBtn(currentIndex + 1);
                                                    getSelectedBtn(currentIndex + 1);
                                                }
                                                deleteSubMenuItem(selectedSubBtn - 1, currentIndex);
                                                modal.destroy();
                                            },
                                        });
                                    }}>
                                                                                        <DeleteOutlined />
                                                                                    </div>
                                                                                    {selectedSubBtn < config.button[currentIndex].sub_button.length
                                        && config.button[currentIndex].sub_button.length > 1 &&
                                        <div className={Style.buttonItem} onClick={() => {
                                                toDown(currentIndex, selectedSubBtn);
                                                setSelectedSubBtn(selectedSubBtn + 1);
                                                getSelectedSubBtn(selectedSubBtn + 1);
                                            }}>
                                                                                            <ArrowDownOutlined />
                                                                                        </div>}
                                                                                </div>}
                                                                        </div>))}
                                                                {config.button[index].sub_button.length !== 5 &&
                            <div style={{ border: 0 }} className={Style.subMenuItem} onClick={() => {
                                    config.button[index] = {
                                        name: config.button[index].name,
                                        sub_button: [
                                            ...config.button[index].sub_button,
                                            {
                                                name: '子菜单名称',
                                            }
                                        ]
                                    };
                                    changeConfig(config);
                                    setSelectedSubBtn(config.button[index].sub_button.length);
                                    getSelectedSubBtn(config.button[index].sub_button.length);
                                }}>
                                                                        <PlusOutlined />添加
                                                                    </div>}
                                                            </>) : (<div style={{ border: 0 }} className={Style.subMenuItem} onClick={() => {
                            config.button[index] = {
                                name: config.button[index].name,
                                sub_button: [
                                    {
                                        name: '子菜单名称',
                                    }
                                ]
                            };
                            changeConfig(config);
                            setSelectedSubBtn(1);
                            getSelectedSubBtn(1);
                        }}><PlusOutlined />添加
                                                            </div>)}
                                                </div>}>
                                            <div className={Style.menuItem} onClick={() => { setSelectedBtn(index + 1); getSelectedBtn(index + 1); }} style={errorIndex?.includes(index) ?
                    { margin: 0, border: '1px solid #FF4D4F' }
                    :
                        selectedBtn === index + 1 ?
                            { margin: 0, border: '1px solid #1677FF', color: '#1677FF' }
                            :
                                {}}>
                                                <div className={Style.menuName} style={errorIndex?.includes(index) ? {
                    color: '#FF4D4F'
                } : {}}>
                                                    {ele.name}
                                                </div>
                                                {selectedBtn === index + 1 &&
                    <div className={Style.buttonGroup}>
                                                        {selectedBtn > 1
                            && config.button.length !== 1
                            && <div className={Style.buttonItem} onClick={() => {
                                    toLeft(selectedBtn);
                                    setSelectedBtn(selectedBtn - 1);
                                    getSelectedBtn(selectedBtn - 1);
                                }} style={{ color: '#1F1F1F' }}>
                                                                <ArrowLeftOutlined />
                                                            </div>}
                                                        <div className={Style.buttonItem} onClick={() => {
                            const modal = confirm({
                                title: '确定删除该菜单吗？',
                                content: '删除后不可恢复',
                                okText: '确定',
                                cancelText: '取消',
                                onOk: async (e) => {
                                    if (selectedBtn !== 1 && config.button.length > 1) {
                                        setSelectedBtn(selectedBtn - 1);
                                        getSelectedBtn(selectedBtn - 1);
                                    }
                                    else if (selectedBtn === 1 && config.button.length > 1) {
                                        setSelectedBtn(1);
                                        getSelectedBtn(1);
                                    }
                                    else {
                                        setSelectedBtn(currentIndex + 1);
                                        getSelectedBtn(currentIndex + 1);
                                    }
                                    deleteMenuItem(selectedBtn - 1);
                                    modal.destroy();
                                },
                            });
                        }} style={{ color: '#1F1F1F' }}>
                                                            <DeleteOutlined />
                                                        </div>
                                                        {selectedBtn < config.button.length
                            && config.button.length > 1 &&
                            <div className={Style.buttonItem} onClick={() => {
                                    toRight(selectedBtn);
                                    setSelectedBtn(selectedBtn + 1);
                                    getSelectedBtn(selectedBtn + 1);
                                }} style={{ color: '#1F1F1F' }}>
                                                                <ArrowRightOutlined />
                                                            </div>}
                                                    </div>}
                                            </div>
                                        </Popover>))}
                                {config.button.length !== 3 &&
                <div className={Style.button2} onClick={() => {
                        config.button = [
                            ...config.button, {
                                name: '菜单名称',
                                sub_button: [],
                            }
                        ];
                        changeConfig(config);
                        setSelectedBtn(config.button.length);
                        getSelectedBtn(config.button.length);
                    }}>
                                        <PlusOutlined />
                                    </div>}
                            </div>) : (<div className={Style.button} onClick={() => {
                config.button = [{
                        name: '菜单名称',
                        sub_button: [],
                    }];
                changeConfig(config);
                setSelectedBtn(1);
                getSelectedBtn(1);
            }}>
                                <PlusOutlined />添加菜单
                            </div>)}
                </div>
            </div>
        </div>);
}
