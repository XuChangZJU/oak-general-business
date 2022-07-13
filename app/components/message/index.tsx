
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
    const {
        type,
        content,
        image,
        zIndex = 777,
        top = 100,
        icon,
        iconColor = '#fff',
        iconSize = 16,
        show,
    } = this.props;
    const { status } = this.state;
    return (
        <div
            className={classNames('l-message', 'l-class', {
                [`l-message-${type}`]: type,
                'l-message-show': status,
            })}
            style={{
                zIndex: zIndex,
                top: `${top}px`,
            }}
        >
            {status && (
                <React.Fragment>
                    <div
                        style={{
                            marginRight: '15rpx',
                        }}
                    >
                        <Icon
                            name={type}
                            size={iconSize}
                            color={type === 'warning' ? '#333' : iconColor}
                        />
                    </div>
                    {image && (
                        <img
                            src={image}
                            className={classNames(
                                'l-message-image',
                                'l-class-image',
                                'l-image-class'
                            )}
                        />
                    )}
                    {content}
                </React.Fragment>
            )}
        </div>
    );
}

function Icon({ name, size, color }) {
    const I = typeToIcon[name]
    
    return <I style={{ fontSize: `${size}px`, color }} />;
}