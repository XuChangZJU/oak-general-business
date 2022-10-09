import * as React from 'react';
import { Cell, Image, Tag, Fab, TagProps } from 'tdesign-mobile-react';
import { Icon } from 'tdesign-icons-react';
import Style from './mobile.module.less';

type CustomTagProps = {
    children?: any;
};

const CustomTag: React.MemoExoticComponent<
    React.ForwardRefExoticComponent<
        CustomTagProps & TagProps & React.RefAttributes<HTMLDivElement>
    >
> = Tag;

export default function render(this: any) {
    const { t } = this;
    const { entity } = this.props;
    const { users } = this.state;
    return (
        <div
            style={{
                height: '100vh',
            }}
        >
            {users?.map((ele: any, index: number) => {
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
                                    {ele.relations?.map(
                                        (relation: string, index: number) => (
                                            <CustomTag
                                                key={index}
                                                variant="outline"
                                                theme="primary"
                                                className=""
                                                style={{}}
                                            >
                                                {t(`${entity}:r.${relation}`)}
                                            </CustomTag>
                                        )
                                    )}
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
