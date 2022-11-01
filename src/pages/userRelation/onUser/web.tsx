import * as React from 'react';

import { Button, List, Avatar, Switch } from 'antd';
import Style from './web.module.less';
import { getName } from '../../../utils/randomUser';


export default function render(this: any) {
    const { t } = this;
    const { entity, relations } = this.props;
    const { searchValue, users, oakDirty } = this.state;
      const relations2 =
          typeof relations === 'object'
              ? relations
              : relations && JSON.parse(relations);
    return (
        <div className={Style.container}>
            <List>
                {users?.map((ele: any, index: number) => {
                    return (
                        <List.Item>
                            <List.Item.Meta
                                key={index}
                                avatar={
                                    ele.avatar ? (
                                        <Avatar
                                            className={Style.avatar}
                                            src={ele.avatar}
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
                                        <div className="relation">
                                            {relations2?.map(
                                                (
                                                    relation: string,
                                                    index2: number
                                                ) => (
                                                    <Switch
                                                        key={index2}
                                                        checked={
                                                            ele.hasRelation[
                                                                index2
                                                            ]
                                                        }
                                                        checkedChildren={[
                                                            t(
                                                                entity +
                                                                    ':r.' +
                                                                    relation
                                                            ),
                                                            t(
                                                                entity +
                                                                    ':r.' +
                                                                    relation
                                                            ),
                                                        ]}
                                                        onChange={(value) => {
                                                            this.onChangeValue(
                                                                value,
                                                                relation,
                                                                index
                                                            );
                                                        }}
                                                    />
                                                )
                                            )}
                                        </div>
                                    </div>
                                }
                            />
                        </List.Item>
                    );
                })}
            </List>

            <Button
                size="large"
                type="primary"
                block
                disabled={!oakDirty}
                onClick={() => {
                    this.confirm();
                }}
            >
                确定
            </Button>
        </div>
    );
}
