import React from 'react';
import { List, Button, Avatar, Input, Drawer } from 'tdesign-react';
import { UserCircleIcon, Icon } from 'tdesign-icons-react';

import Style from './web.module.less';

const { ListItem, ListItemMeta } = List;

export default function render(this: any) {
    const { avatar, nickname, isLoggedIn, refreshing, mobile, mobileCount, showDrawer, oakDirty } = this.state;
    const mobileText = mobileCount > 1 ? `${mobileCount}条手机号` : ( mobile || '未设置');
    return (
        <div className={Style.container}>
            <div className={Style.userInfo}>
                {avatar ? (
                    <Avatar className={Style.avatar} image={avatar} />
                ) : (
                    <Avatar
                        className={Style.avatar}
                        icon={<UserCircleIcon className={Style.userIcon} />}
                    />
                )}
                <span className={Style.nickname}>{nickname || '未设置'}</span>
                {isLoggedIn ? (
                    <Button
                        theme="primary"
                        size="small"
                        disabled={refreshing}
                        loading={refreshing}
                        onClick={() =>
                            this.setState({
                                showDrawer: true,
                            })
                        }
                    >
                        {this.t('common:action.update')}
                    </Button>
                ) : (
                    <Button
                        size="small"
                        disabled={refreshing}
                        loading={refreshing}
                        onClick={() => this.doLogin()}
                    >
                        {this.t('login')}
                    </Button>
                )}
            </div>
            <List
                layout="horizontal"
                size="medium"
                className={Style.list}
                split={true}
            >
                <div onClick={() => this.goMyMobile()}>
                    <ListItem action={<Icon size={18} name="chevron-right" />}>
                        <ListItemMeta
                            image={<Icon size={18} name="mobile" />}
                            title="手机号"
                            description={mobileText}
                        />
                    </ListItem>
                </div>
            </List>
            <Drawer
                placement="bottom"
                visible={showDrawer}
                header="修改昵称"
                onConfirm={async () => {
                    await this.execute('update', undefined, '0.user');
                    this.setState({ showDrawer: false });
                    this.resetUpdateData();
                }}
                onCancel={() => {
                    this.setState({ showDrawer: false });
                    this.resetUpdateData();
                }}
                onClose={() => {
                    this.setState({ showDrawer: false });
                    this.resetUpdateData();
                }}
            >
                <Input
                    placeholder="请输入昵称"
                    value={nickname}
                    onChange={(value) => {
                        this.setUpdateData('0.user.nickname', value);
                    }}
                />
            </Drawer>
        </div>
    );
}
