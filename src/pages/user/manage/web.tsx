import * as React from 'react';
import { Button, List, Tag, Avatar } from 'tdesign-react';
import { Icon } from 'tdesign-icons-react';
import Style from './mobile.module.less';
import { getName } from '../../../utils/randomUser'

const { ListItem, ListItemMeta } = List;

export default function render(this: any) {
    const {
        event
    } = this.props;
    const { stateColor, userArr } = this.state;
    return (
        <div className={Style.container}>
            <List split={true}>
                {userArr?.map((ele: any, index: number) => {
                    return (
                        <div onClick={() => this.onCellClicked(ele.id, event)}>
                            <ListItem
                                action={<Icon size={18} name="chevron-right" />}
                            >
                                <ListItemMeta
                                    image={
                                        ele.avatar ? (
                                            <Avatar
                                                className={Style.avatar}
                                                image={ele.avatar}
                                            />
                                        ) : (
                                            <Avatar className={Style.avatar}>
                                                <span className={Style.text}>
                                                    {getName(ele.name)}
                                                </span>
                                            </Avatar>
                                        )
                                    }
                                    title={<div>{ele.name || '--'}</div>}
                                    description={
                                        <div className={Style.description}>
                                            <div className={Style.row}>
                                                <span className={Style.label}>
                                                    昵称:&nbsp;
                                                </span>
                                                <span className={Style.value}>
                                                    {ele.nickname || '--'}
                                                </span>
                                            </div>
                                            <div className={Style.row}>
                                                <span className={Style.label}>
                                                    手机号:&nbsp;
                                                </span>
                                                <span className={Style.value}>
                                                    {ele.mobile || '--'}
                                                </span>
                                            </div>
                                            <Tag
                                                theme={
                                                    stateColor[ele.userState]
                                                }
                                            >
                                                {ele.userState
                                                    ? this.t(
                                                          `user:v.userState.${ele.userState}`
                                                      )
                                                    : '未知'}
                                            </Tag>
                                        </div>
                                    }
                                />
                            </ListItem>
                        </div>
                    );
                })}
            </List>

            <div className={Style.fab}>
                <Button
                    size="large"
                    shape="circle"
                    onClick={(event) => {
                        this.goNewUser();
                    }}
                    icon={<Icon name="add" />}
                ></Button>
            </div>
        </div>
    );
}
