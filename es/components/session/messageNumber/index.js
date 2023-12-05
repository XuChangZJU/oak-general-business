import React from 'react';
import Style from './index.module.less';
import { ClearOutlined } from '@ant-design/icons';
function MessageNumber(props) {
    const { number = 0, clear } = props;
    return (<div className={Style.messageNumberBox}>
            <div className={Style.messageNumber}>
                <span className={Style.messageText}>消息</span>
                <span className={Style.numberText}>({number})</span>
            </div>

            {/* 清除发给自己的消息 */}
            {<div onClick={() => {
                clear();
            }}>
                    <ClearOutlined className={Style.clearIcon}/>
                </div>}
        </div>);
}
export default MessageNumber;
