import React from 'react';
import { Cell, Image, Checkbox } from 'tdesign-mobile-react';
import { Button } from 'tdesign-react';
import PageHeader from '../../../components/common/pageHeader';
import Style from './web.module.less';


export default function render(this: any) {
    const {t} = this;
    const { entity } = this.props;
    const { avatar, nickname, name, mobile, relationArr } = this.state;
    return (
        <PageHeader showBack={true} title="人员详情">
            <div className={Style.container}>
                <Cell
                    title={nickname || '未设置'}
                    image={
                        <Image
                            src={avatar}
                            alt="头像"
                            style={{ width: 80, height: 80 }}
                        />
                    }
                    description={
                        <div className="description">
                            <div className="name">姓名: {name || '未设置'}</div>
                            <div className="mobile">
                                手机: {mobile || '未设置'}
                            </div>
                        </div>
                    }
                />
                {relationArr?.map((item: any) => (
                    <Checkbox
                        checked={item.checked}
                        label={t(entity + ':r.' + item.value)}
                        onChange={(checked) => {
                            this.onChangeValue(item.value, checked);
                        }}
                    />
                ))}
                <Button theme="primary" block onClick={() => this.onConfirm()}>
                    保存
                </Button>
            </div>
        </PageHeader>
    );
}
