import React, { useEffect, useState, useRef } from 'react';
import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from "../../../oak-app-domain";
import Style from './web.module.less';
import { Space, Button, Popover, Form, Input, Radio, Modal, Select } from 'antd';
import Preview from '../preview';
import TagList from '../tagList';
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
            file: File;
            errorIndex: number[];
            oakId: string;
            menuIndex: number;
            applicationId: string;
            menuType: string;
            menuId: number;
            wechatId: string;
            iState: string;
        },
        {
        }
    >
) {
    const { data, methods } = props;
    const {
        id,
        oakFullpath,
        config,
        menuIndex,
        applicationId,
        menuType,
        menuId,
        wechatId,
        iState,
    } = data;
    const {
        updateItem,
        removeItem,
        execute,
    } = methods
    const [isPreview, setIsPreview] = useState(false);
    const [selectedBtn, setSelectedBtn] = useState(0);
    const [selectedSubBtn, setSelectedSubBtn] = useState(0);
    const [currentIndex, setCurrentIndex] = useState(1);
    const [open, setOpen] = useState(false);
    const [errorIndex, setErrorIndex] = useState([] as number[]);

    const changeConfig = (config: any) => {
        updateItem({
            menuConfig: config
        }, id)
    };
    const changeMenuId = (menuId: number) => {
        updateItem({
            menuId
        }, id)
    };
    const deleteMenu = () => {
        removeItem(id);
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
    const createMenu = async () => {
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
                            menuIndex={menuIndex}
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
                            menuIndex={menuIndex}
                            changeConfig={changeConfig}
                            selectedBtn={selectedBtn}
                            selectedSubBtn={selectedSubBtn}
                            currentIndex={currentIndex}
                            getErrorIndex={getErrorIndex}
                            createMenu={createMenu}
                            changeIsPreview={changeIsPreview}
                            getOpen={getOpen}
                            menuType={menuType}
                            applicationId={applicationId}
                            changeMenuId={changeMenuId}
                            deleteMenu={deleteMenu}
                            menuId={menuId}
                            wechatId={wechatId}
                            iState={iState}
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