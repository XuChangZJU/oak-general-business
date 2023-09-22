import React, { useEffect, useState, useRef } from 'react';
import { WechatMpInstance, WechatPublicInstance, WechatSDK } from 'oak-external-sdk';
import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from "../../../oak-app-domain";
import Style from './web.module.less';
import { Space, Button, Form, Input, Radio, Modal } from 'antd';
import Preview from '../preview';
import ActionPhone from '../actionPhone';
import MenuInfo from '../menuInfo';
export default function Render(
    props: WebComponentProps<
        EntityDict,
        'wechatMenu',
        true,
        {
            id: string;
            config: any;
            totalConfig: any;
            file: File;
            wechatInstance: WechatPublicInstance;
            errorIndex: number[];
            oakId: string;
            menuType: string;
            applicationId: string;
        },
        {
        }
    >
) {
    const { data, methods } = props;
    const { id, oakFullpath, config, wechatInstance, totalConfig, menuType, applicationId } = data;
    const {
        updateItem,
        execute
    } = methods;
    const [open, setOpen] = useState(false);
    const [isPreview, setIsPreview] = useState(false);
    const [selectedBtn, setSelectedBtn] = useState(0);
    const [selectedSubBtn, setSelectedSubBtn] = useState(0);
    const [currentIndex, setCurrentIndex] = useState(1);
    const [errorIndex, setErrorIndex] = useState([] as number[]);
    const changeConfig = (config: any) => {
        updateItem({
            menuConfig: config
        }, id)
    };
    const changePublishState = (publishState: "wait" | "success" | "fail") => {
        updateItem({
            publishState,
        }, id)
    }
    const getSelectedBtn = (selectedBtn: number) => {
        setSelectedBtn(selectedBtn);
    };
    const getSelectedSubBtn = (selectedSubBtn: number) => {
        setSelectedSubBtn(selectedSubBtn);
    };
    const getCurrentIndex = (currentIndex: number) => {
        setCurrentIndex(currentIndex);
    };
    const getErrorIndex = (errorIndex: number[]) => {
        setErrorIndex(errorIndex);
    };
    const createMenu = async() => {
        await execute();
    };
    const changeIsPreview = (isPreview: boolean) => {
        setIsPreview(isPreview);
    };
    const getOpen = (open: boolean) => {
        setOpen(open);
    }
    if (oakFullpath) {
        return (
            <div className={Style.container}>
                <div className={Style.content}>
                    <div className={Style.leftBar}>
                        <ActionPhone
                            oakAutoUnmount={true}
                            config={config}
                            changeConfig={changeConfig}
                            menuType={menuType}
                            getSelectedBtn={getSelectedBtn}
                            getSelectedSubBtn={getSelectedSubBtn}
                            getCurrentIndex={getCurrentIndex}
                            errorIndex={errorIndex}
                            isPreview={isPreview}
                            open={open}
                        />
                    </div>
                    <div className={Style.rightBar}>
                        <MenuInfo
                            oakAutoUnmount={true}
                            config={config}
                            changeConfig={changeConfig}
                            changePublishState={changePublishState}
                            selectedBtn={selectedBtn}
                            selectedSubBtn={selectedSubBtn}
                            currentIndex={currentIndex}
                            getErrorIndex={getErrorIndex}
                            createMenu={createMenu}
                            changeIsPreview={changeIsPreview}
                            getOpen={getOpen}
                            menuType={menuType}
                            applicationId={applicationId}
                        />
                    </div>
                    <Modal
                        title='菜单预览'
                        open={isPreview}
                        onCancel={() => setIsPreview(false)}
                        footer={null}
                        width={424}
                    >
                        <Preview
                            button={config?.button}
                            applicationId={applicationId}
                        />
                    </Modal>
                </div >
            </div >
        )
    }
    return null;
}