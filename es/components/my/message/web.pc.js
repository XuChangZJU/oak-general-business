import React, { useState } from 'react';
import { Button, Badge, Drawer, Space } from 'antd';
import classNames from 'classnames';
import { BellOutlined } from '@ant-design/icons';
import MessageList from '../../../components/message/simpleList';
import Style from './web.module.less';
export default function Render(props) {
    const { data, methods } = props;
    const { count, className, onClick, style, buttonStyle, buttonClassName } = data;
    const { goMessageList } = methods;
    const [open, setOpen] = useState(false);
    return (<>
            <Badge count={count}>
                <Button className={classNames(Style.btn, buttonClassName)} style={buttonStyle} type="text" shape="circle" icon={<BellOutlined className={classNames(Style.icon, className)} style={style}/>} onClick={(e) => {
            if (typeof onClick === 'function') {
                onClick(e);
                return;
            }
            setOpen(true);
        }}/>
            </Badge>
            <Drawer title="消息" placement="right" open={open} onClose={() => {
            setOpen(false);
        }} extra={<Space>
                        <Button size="small" type="text" onClick={() => {
                setOpen(false);
                goMessageList();
            }}>
                            查看更多
                        </Button>
                    </Space>} bodyStyle={{
            padding: 0,
        }} destroyOnClose={true}>
                <MessageList onClose={() => {
            setOpen(false);
        }} oakAutoUnmount={true} oakPath="$my/message-/message/simpleList"/>
            </Drawer>
        </>);
}
