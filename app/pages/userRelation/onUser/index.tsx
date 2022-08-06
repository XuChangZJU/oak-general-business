import * as React from 'react';
import { Search, Fab, Cell, Image, Switch, Button } from 'tdesign-mobile-react';
import { SearchIcon, Icon } from 'tdesign-icons-react';

export default function render() {
    const { t } = this;
    const { entity, relations } = this.props;
    const { searchValue, users, oakDirty } = this.state;
      const relations2 =
          typeof relations === 'object'
              ? relations
              : relations && JSON.parse(relations);
    return (
        <div style={{ height: '100vh' }}>
            <Search
                focus={false}
                placeholder="请输入"
                value={searchValue || ''}
                onChange={this.searchValueChange}
                action="取消"
                onActionClick={() => {
                    this.searchCancel();
                }}
                onSubmit={(value, event) => {
                    // value清空
                    this.searchConfirm();
                }}
                onClear={() => {
                    this.searchCancel();
                }}
                leftIcon={<SearchIcon />}
            />

            {users?.map((ele, index) => {
                return (
                    <Cell
                        key={index}
                        title={ele.nickname || '未设置'}
                        image={
                            <Image
                                src={ele.avatar}
                                alt="头像"
                                style={{ width: 80, height: 80 }}
                            />
                        }
                        description={
                            <div className="description">
                                <div className="name">
                                    姓名: {ele.name || '未设置'}
                                </div>
                                <div className="mobile">
                                    手机: {ele.mobile || '未设置'}
                                </div>
                                <div className="relation">
                                    {relations2?.map((relation, index2) => (
                                        <Switch
                                            key={index2}
                                            defaultValue={
                                                ele.hasRelation[index2]
                                            }
                                            label={[
                                                t(entity + ':r.' + relation),
                                                t(entity + ':r.' + relation),
                                            ]}
                                            onChange={(value) => {
                                                this.onChangeValue(
                                                    value,
                                                    relation,
                                                    index
                                                );
                                            }}
                                        />
                                    ))}
                                </div>
                            </div>
                        }
                    />
                );
            })}
            <Button
                theme="primary"
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
