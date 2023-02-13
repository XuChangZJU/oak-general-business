import React from 'react';
import {
    Space,
    Button,
    Modal,
    ButtonProps,
    SpaceProps,
    Typography,
} from 'antd';
import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../../general-app-domain';
import Style from './web.module.less';
const { confirm } = Modal;

type Item = {
    icon?: string | React.ReactNode;
    label?: string;
    action?: string;
    auth: boolean;
    type?: 'a' | 'button';
    index?: number;
    alerted?: boolean;
    alertTitle?: string;
    alertContent?: string;
    confirmText?: string;
    cancelText?: string;
    render?: React.ReactNode;
    beforeAction?: (item: Item) => void;
    afterAction?: (item: Item) => void;
    onClick?: (item: Item) => void | Promise<void>;
    buttonProps?: Omit<ButtonProps, 'onClick'>;
    filter?: () => boolean;
};

const commonAction = [
    'create',
    'update',
    'remove',
    'confirm',
    'cancel',
    'grant',
    'revoke',
];

function ItemComponent(
    props: Item & {
        entity: string;
        t: (value: string) => string;
        onClick: () => void | Promise<void>;
        text: string;
    }
) {
    const {
        type,
        entity,
        label,
        action,
        buttonProps,
        render,
        t,
        onClick,
        text,
    } = props;

    if (type === 'button') {
        return (
            <Button {...buttonProps} onClick={onClick}>
                {text}
            </Button>
        );
    }
    if (render) {
        return <div onClick={onClick}>{render}</div>;
    }
    return <a onClick={onClick}>{text}</a>;
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
            spaceProps: SpaceProps;
            mode: 'cell';
            column: 3;
        },
        {
            getActionName: (action?: string) => string;
        }
    >
) {
    const { methods, data } = props;
    const { t, getActionName } = methods;
    const {
        items,
        oakLegalActions,
        spaceProps,
        entity,
        mode = 'cell',
        column,
    } = data;

    const getItems = () => {
         const items2 = items.filter((ele) => {
                 const { action, filter } = ele;
                 const authResult =
                     !action ||
                     (action &&
                         oakLegalActions?.includes(
                             action as EntityDict[keyof EntityDict]['Action']
                         ));
                 const filterResult =
                     ele.hasOwnProperty('filter') && filter ? filter() : true;
                 return authResult && filterResult;
             })
             .map((ele, index: number) => {
                 const { label, action } = ele;
                 let text: string = '';
                 if (label) {
                     text = label;
                 } else {
                     text = getActionName(action);
                 }
                 return Object.assign(ele, {
                     text: text,
                 });
             });

         let newItems = items2;
         let moreItems: Item[] = [];
         if (items2.length > column) {
             newItems = [...items2].splice(0, column);
             moreItems = [...items2].splice(column, items2.length);
         }

        return {
            newItems,
            moreItems,
        };
    }

    const { newItems } = getItems();

    if (!newItems || newItems.length === 0) {
        return null;
    }

    return (
        <Space {...spaceProps}>
            {newItems &&
                newItems.map((ele, index: number) => {
                        const { action } = ele;
                        let onClick = () => {
                            if (ele.onClick) {
                                ele.onClick(ele);
                                return;
                            }
                            methods.execute(
                                action as EntityDict[keyof EntityDict]['Action']
                            );
                        };
                        if (ele.alerted) {
                            onClick = async () => {
                                let content = '';
                                if (action) {
                                    const text = getActionName(action);
                                    content = `确认${text}该数据`;
                                }
                                confirm({
                                    title: ele.alertTitle,
                                    content: ele.alertContent || content,
                                    okText: ele.confirmText || '确定',
                                    cancelText: ele.cancelText || '取消',
                                    onOk: () => {
                                        if (ele.onClick) {
                                            ele.onClick(ele);
                                            return;
                                        }
                                        methods.execute(
                                            ele.action as EntityDict[keyof EntityDict]['Action']
                                        );
                                        if (ele.afterAction) {
                                            ele.afterAction(ele);
                                        }
                                    },
                                });
                            };
                        }
                        return (
                            <ItemComponent
                                {...ele}
                                entity={entity}
                                t={t}
                                onClick={onClick}
                            />
                        );
                    })}
        </Space>
    );
}
