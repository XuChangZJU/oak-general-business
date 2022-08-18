import * as React from 'react';
import { Cell, Image, Tag, Fab } from 'tdesign-mobile-react';
import { Icon } from 'tdesign-icons-react';

export default function render() {
    const { t } = this;
    const { entity } = this.props;
    const { users } = this.state;
    return (
        <div
            style={{
                height: '100vh',
            }}
        >
            {users?.map((ele, index) => {
                return (
                    <Cell
                        onClick={(e) => this.goDetail(ele.id)}
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
                                    {ele.relations?.map((relation, index) => (
                                        <Tag
                                            key={index}
                                            variant="outline"
                                            theme="primary"
                                        >
                                            {t(`${entity}:r.${relation}`)}
                                        </Tag>
                                    ))}
                                </div>
                            </div>
                        }
                    />
                );
            })}
            <Fab
                buttonProps={{
                    theme: 'primary',
                    shape: 'circle',
                    size: 'large',
                }}
                icon={<Icon name="add" />}
                style={{ right: '16px', bottom: '32px' }}
                onClick={() => {
                    this.goUpsert();
                }}
            />
        </div>
    );
}
