
import * as React from 'react';
import classNames from 'classnames';
import CheckCircleFilled from '@ant-design/icons/CheckCircleFilled';
import CloseCircleFilled from '@ant-design/icons/CloseCircleFilled';
import ExclamationCircleFilled from '@ant-design/icons/ExclamationCircleFilled';
import InfoCircleFilled from '@ant-design/icons/InfoCircleFilled';
import LoadingOutlined from '@ant-design/icons/LoadingOutlined';

const typeToIcon = {
    info: InfoCircleFilled,
    success: CheckCircleFilled,
    error: CloseCircleFilled,
    warning: ExclamationCircleFilled,
    loading: LoadingOutlined,
};

export default function render() {
    console.log('message render');
    const {
        messages,
    } = this.state;
    if (messages.length > 0) {
        return (
            <div>
                {
                    messages.map(
                        (ele, index) => {
                            const {
                                type,
                                content,
                                icon,
                                iconColor = '#fff',
                                iconSize = 16
                            } = ele;
                            return (
                                <div
                                    key={index}
                                    className={classNames(
                                        'l-message',
                                        'l-message-show',
                                        {
                                            [`l-message-${type}`]: type,
                                        }
                                    )}
                                    style={{
                                        zIndex: 777,
                                        top: 31 * index,
                                    }}
                                >
                                    <React.Fragment>
                                        <div
                                            style={{
                                                marginRight: '15rpx',
                                            }}
                                        >
                                            <Icon
                                                name={type}
                                                size={iconSize}
                                                color={
                                                    type === 'warning'
                                                        ? '#333'
                                                        : iconColor
                                                }
                                            />
                                        </div>
                                        {content}
                                    </React.Fragment>
                                </div>
                            );
                        }
                    )
                }
            </div>
        );
    }
    return null;
}

function Icon({ name, size, color }) {
    const I = typeToIcon[name]

    return <I style={{ fontSize: `${size}px`, color }} />;
}