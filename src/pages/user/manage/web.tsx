import * as React from 'react';
import { Fab, Cell, Tag } from 'tdesign-mobile-react';
import { Icon } from 'tdesign-icons-react';

export default function render(this: any) {
    const { t } = this;
    const {
        event
    } = this.props;
    const { stateColor, userArr } = this.state;
    return (
        <div style={{ height: '100vh' }}>
            {userArr?.map((ele: any, index: number) => {
                return (
                    <Cell
                        key={index}
                        onClick={() => this.onCellClicked(ele.id, event)}
                        image={<img className="avatar" src={ele.avatar} />}
                        title={ele.name || '未设置'}
                        description={
                            <div>
                                <div className="mobile">
                                    手机号：
                                    {ele.mobile || '未设置'}
                                </div>
                                <div style={{ display: 'flex' }}>
                                    <Tag theme={stateColor[ele.userState]}>
                                        {t(`user:v.userState.${ele.userState}`)}
                                    </Tag>
                                </div>
                            </div>
                        }
                    />
                );
            })}

            <Fab
                style={{
                    bottom: 50,
                    right: 16,
                }}
                buttonProps={{
                    theme: 'primary',
                }}
                onClick={(event) => {
                    this.goNewUser();
                }}
                icon={<Icon name="add" />}
            ></Fab>
        </div>
    );
}
