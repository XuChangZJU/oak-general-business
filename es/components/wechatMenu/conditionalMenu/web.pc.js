import React, { useState } from 'react';
import Style from './web.module.less';
import { Modal } from 'antd';
import Preview from '../preview';
import ActionPhone from '../actionPhone';
import MenuInfo from '../menuInfo';
export default function Render(props) {
    const { data, methods } = props;
    const { id, oakFullpath, config, menuIndex, applicationId, menuType, menuId, wechatId, iState, tabKey, } = data;
    const { updateItem, removeItem, execute, create, remove, } = methods;
    const [isPreview, setIsPreview] = useState(false);
    const [selectedBtn, setSelectedBtn] = useState(0);
    const [selectedSubBtn, setSelectedSubBtn] = useState(0);
    const [currentIndex, setCurrentIndex] = useState(1);
    const [open, setOpen] = useState(false);
    const [errorIndex, setErrorIndex] = useState([]);
    const changeConfig = (config) => {
        updateItem({
            menuConfig: config
        }, id);
    };
    const changeMenuId = (menuId) => {
        updateItem({
            menuId
        }, id);
    };
    const deleteMenu = () => {
        remove();
    };
    const getSelectedBtn = (selectedBtn) => {
        setSelectedBtn(selectedBtn);
    };
    const getSelectedSubBtn = (selectedSubBtn) => {
        setSelectedSubBtn(selectedSubBtn);
    };
    const getCurrentIndex = (currentIndex) => {
        setCurrentIndex(currentIndex);
    };
    const getErrorIndex = (errorIndex) => {
        setErrorIndex(errorIndex);
    };
    const createMenu = () => {
        create();
    };
    const changeIsPreview = (isPreview) => {
        setIsPreview(isPreview);
    };
    const getOpen = (open) => {
        setOpen(open);
    };
    if (oakFullpath) {
        return (<div className={Style.container}>
                <div className={Style.content}>
                    <div className={Style.leftBar}>
                        <ActionPhone oakAutoUnmount={true} config={config} menuIndex={menuIndex} changeConfig={changeConfig} menuType={menuType} getSelectedBtn={getSelectedBtn} getSelectedSubBtn={getSelectedSubBtn} getCurrentIndex={getCurrentIndex} errorIndex={errorIndex} isPreview={isPreview} open={open} tabKey={tabKey}/>
                    </div>
                    <div className={Style.rightBar}>
                        <MenuInfo oakAutoUnmount={true} config={config} menuIndex={menuIndex} changeConfig={changeConfig} selectedBtn={selectedBtn} selectedSubBtn={selectedSubBtn} currentIndex={currentIndex} getErrorIndex={getErrorIndex} createMenu={createMenu} changeIsPreview={changeIsPreview} getOpen={getOpen} menuType={menuType} applicationId={applicationId} changeMenuId={changeMenuId} deleteMenu={deleteMenu} menuId={menuId} wechatId={wechatId} iState={iState}/>
                    </div>
                    <Modal title='菜单预览' open={isPreview} onCancel={() => setIsPreview(false)} footer={null} width={424}>
                        <Preview button={config?.button} applicationId={applicationId}/>
                    </Modal>
                </div>
            </div>);
    }
    return null;
}
