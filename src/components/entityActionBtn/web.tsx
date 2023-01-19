import React, {useEffect} from 'react';
import {  Space, Button, Modal, ButtonProps, SpaceProps } from 'antd';
import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../general-app-domain';
import { DefaultOptionType } from 'antd/es/select';
const { confirm } = Modal;
type Item = {
    name: string;
    type?: 'a' | 'button';
    index?: number;
    alerted?: boolean;
    alertTitle?: string;
    alertContent?: string;
    confirmText?: string;
    cancelText?: string;
    custom?: any;
    callBack?: (index: number) => void;
    onClick?: () => void;
    buttonProps?: Omit<ButtonProps, "onClick">;
}

const commonAction = ['create', 'update', 'remove', 'confirm', 'cancel', 'grant', 'revoke'];
function ItemComponent(props: Item & { entity: string; t: (value: string) => string; onClick: () => void }) {
    const { type, entity, name, buttonProps, custom, t, onClick } = props;
    let label: string;
    if (commonAction.includes(name)) {
        label = t(`common:action.${name}`);
    }
    else {
        label = t(`${entity}:action.${name}`);
    }
    if (type === 'button') {
        return (
            <Button {...buttonProps} onClick={onClick}>
                {label}
            </Button>
        )
    }
    if (custom) {
        return (
            <div onClick={onClick}>
                {custom}
            </div>
        )
    }
    return (
        <a onClick={onClick}>
            {label}
        </a>
    )
}

export default function Render(
    props: WebComponentProps<
        EntityDict,
        keyof EntityDict,
        false,
        {
            entity: string;
            actions: string[];
            items: Item[];
            spaceProps: SpaceProps,
        },
        {
        }
    >
) {
    const { methods, data } = props;
    const { t } = methods;
    const { items, oakLegalActions, spaceProps, entity } = data;
    return (
        <Space {...spaceProps}>
            {items && items.map((ele, index: number) => {
                if (oakLegalActions?.includes(ele.name as EntityDict[keyof EntityDict]['Action'])) {
                    let onClick = () => {
                        if (ele.onClick) {
                            ele.onClick();
                            return;
                        }
                        methods.execute(ele.name as EntityDict[keyof EntityDict]['Action'])
                    };
                    if (ele.alerted) {
                        onClick = () => {
                            confirm({
                                title: ele.alertTitle,
                                content: ele.alertContent,
                                okText: ele.confirmText || '确定',
                                cancelText: ele.cancelText || '取消',
                                onOk: () => {
                                    if (ele.onClick) {
                                        ele.onClick();
                                        return;
                                    }
                                    methods.execute(ele.name as EntityDict[keyof EntityDict]['Action'])
                                    if (ele.callBack) {
                                        ele.callBack(index);
                                    }
                                }
                            })
                        }
                    }
                    return (
                        <ItemComponent {...ele} entity={entity} t={t} onClick={onClick} />
                    )
                }
            })}
        </Space>
    );
}
