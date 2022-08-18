import React from 'react';
import { UserCircleIcon } from 'tdesign-icons-react';
import { Avatar, Button, Cell, CellGroup, Input, Popup } from 'tdesign-mobile-react';
import styles from './index.module.less';

export default function render(this: any) {
    const { avatar, nickname, isLoggedIn, refreshing, mobile, mobileCount, showDrawer, oakDirty } = this.state;
    const mobileText = mobileCount > 1 ? `${mobileCount}条手机号` : ( mobile || '未设置');
    return (
        <div className={styles['page-body']}>
            <div className={styles.userInfo}>
                {avatar ? (
                    <Avatar image={avatar} size="48px" />
                ) : (
                    <Avatar icon={<UserCircleIcon />} size="48px" />
                )}
                <span className="nickname">{nickname || '未设置'}</span>
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
            <CellGroup>
                <Cell
                    title="手机号"
                    arrow
                    note={mobileText}
                    onClick={() => this.goMyMobile()}
                />
            </CellGroup>
            <Popup
                placement="bottom"
                visible={showDrawer}
                onVisibleChange={() => {
                    this.setState({ showDrawer: false });
                    this.resetUpdateData();
                }}
            >
                <div style={{ backgroundColor: '#fff', padding: 10 }}>
                    <Input
                        label="昵称"
                        placeholder="请输入昵称"
                        value={nickname}
                        onChange={(value) => {
                            this.setUpdateData('0.user.nickname', value);
                        }}
                    />
                    <div style={{ height: 15 }} />
                    <Button
                        size="large"
                        theme="primary"
                        disabled={!oakDirty}
                        block
                        onClick={async () => {
                            await this.execute('update', undefined, '0.user');
                            this.setState({ showDrawer: false });
                            this.resetUpdateData();
                        }}
                    >
                        {this.t('common:action.confirm')}
                    </Button>
                </div>
            </Popup>
        </div>
    );
}
