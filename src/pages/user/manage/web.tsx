import * as React from 'react';
import { Fab, Cell, Tag, TagProps } from 'tdesign-mobile-react';
import { Icon } from 'tdesign-icons-react';

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
                                    <CustomTag
                                        theme={stateColor[ele.userState]}
                                        className=""
                                        style={{}}
                                    >
                                        {t(`user:v.userState.${ele.userState}`)}
                                    </CustomTag>
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
