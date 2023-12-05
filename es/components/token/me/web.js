import React from 'react';
import { List, Button, Avatar } from 'antd-mobile';
import { UserOutlined, MobileOutlined } from '@ant-design/icons';
import Style from './mobile.module.less';
export default function Render(props) {
    const { avatar, isLoggedIn, refreshing, mobileText, isRoot, oakExecuting, tokenId, nickname, oakDirty, } = props.data;
    const { doLogin, t, goMyMobile, goUserManage, goMyInfo } = props.methods;
    return (<div className={Style.container}>
            <div className={Style.userInfo}>
                <Avatar className={Style.avatar} src={avatar}/>
                <span className={Style.nickname}>{nickname || '未设置'}</span>
                {isLoggedIn ? (<Button color="primary" size="small" disabled={refreshing} loading={refreshing} onClick={() => goMyInfo()}>
                        {t('common::action.update')}
                    </Button>) : (<Button size="small" disabled={refreshing} loading={refreshing} onClick={() => doLogin()}>
                        {t('login')}
                    </Button>)}
            </div>
            <List className={Style.list}>
                <List.Item onClick={() => goMyMobile()} prefix={<MobileOutlined />} title="手机号" extra={mobileText}></List.Item>

                {isRoot && (<List.Item onClick={() => goUserManage()} prefix={<UserOutlined />} title="用户管理"></List.Item>)}
            </List>
        </div>);
}
