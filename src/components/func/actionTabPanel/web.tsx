import React, { useEffect, useState } from 'react';
import {
    Button,
    Modal,
    ButtonProps,
    Typography,
} from 'antd';
import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../../general-app-domain';
import OakIcon from '../../icon';
import classNames from 'classnames';
import Style from './web.module.less';
const { confirm } = Modal;

type Item = {
    icon?: string;
    iconRender?: React.ReactNode;
    iconProps?: {
        style?: React.CSSProperties;
        rootStyle?: React.CSSProperties;
        bgColor?: string;
    };
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
    beforeAction?: (item: Item) => boolean | Promise<boolean>;
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

type IMode = 'card' | 'text';


function ItemComponent(
    props: Item & {
        mode?: IMode;
        entity: string;
        t: (value: string) => string;
        onClick: () => void | Promise<void>;
        text: string;
    }
) {
    const {
        icon,
        entity,
        label,
        action,
        buttonProps,
        render,
        t,
        onClick,
        iconRender,
        iconProps,
        mode,
        text,
    } = props;

    if (render) {
        return <div onClick={onClick}>{render}</div>;
    }
    const { style = {}, rootStyle = {}, bgColor } = iconProps || {};

    let icon2;
    if (iconRender) {
        icon2 = iconRender;
    } else if (typeof icon === 'string') {
        icon2 = (
            <OakIcon
                name={icon}
                className={classNames(Style.icon, {
                    [Style.iconWhite]: !!bgColor,
                })}
                style={style}
            />
        );
    } else {
        icon2 = icon;
    }

    return (
        <Button
            className={Style.btn}
            type="text"
            {...buttonProps}
            onClick={onClick}
        >
            <div className={Style.space}>
                {mode === 'card' && !!icon2 ? (
                    <div
                        className={Style.iconBox}
                        style={Object.assign(
                            {},
                            bgColor && {
                                backgroundColor: bgColor,
                            },
                            rootStyle
                        )}
                    >
                        {icon2}
                    </div>
                ) : (
                    icon2
                )}
                <Typography>{text}</Typography>
            </div>
        </Button>
    );
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
            rows?: number;
            column?: number;
            mode?: IMode; // type为 card，图标就会包裹一层
            id?: string; //scrollview 元素id
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
        entity,
        rows = 2, //默认两行
        column = 5,
        id = 'action_tab_panel_scroll',
        mode = 'text',
    } = data;
    const [newItems, setNewItems] = useState(items);
    const [slideLeft, setSlideLeft] = useState(0);
    const [slideWidth, setSlideWidth] = useState(0);
    const [slideShow, setSlideShow] = useState(false);
    const [slideRatio, setSideRatio] = useState(0);
    const [tabNums, setTabNums] = useState<number[]>([]);
    const [count, setCount] = useState(rows * column);

    useEffect(() => {
        getItems();
    }, []);

    useEffect(() => {
        getItems();
    }, [oakLegalActions]);

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
        });
        const num =
            items2.length % count !== 0
                ? parseInt((items2.length / count).toString()) + 1
                : items2.length / count;

        const tabNums: number[] = [];
        for (let i = 1; i <= num; i++) {
            tabNums.push(i);
        }
        if (items2 && items2.length > 0) {
            const doc = window.document.getElementById(id);
            const clientWidth = (doc && doc.clientWidth) || 0;
            const totalLength = tabNums.length * clientWidth; //分类列表总长度
            const slideRatio =
                (50 / totalLength) * (clientWidth / window.innerWidth); //滚动列表长度与滑条长度比例
            const slideWidth = (clientWidth / totalLength) * 50; //当前显示红色滑条的长度(保留两位小数)

            setSlideWidth(slideWidth);
            setSideRatio(slideRatio);
        }
        setTabNums(tabNums);
        setNewItems([...items2]);
        setSlideShow(num > 1);
    };

    if (!newItems || newItems.length === 0) {
        return null;
    }

    return (
        <div className={Style.tabContainer}>
            <div className={Style.scrollBox}>
                <div
                    id={id}
                    className={Style.scrollView}
                    onScroll={(e) => {
                        const scrollLeft = (e.target as any).scrollLeft;
                        setSlideLeft(scrollLeft * slideRatio);
                    }}
                >
                    <div className={Style.tabView}>
                        {tabNums.map((tabNum, index) => {
                            return (
                                <div className={Style.btnContainer}>
                                    {newItems
                                        .filter(
                                            (btn, index2) =>
                                                (tabNum - 1) * count <
                                                    index2 + 1 &&
                                                index2 + 1 <= tabNum * count
                                        )
                                        .map((ele, index2: number) => {
                                            const { label, action } = ele;
                                            let text: string | undefined;
                                            if (label) {
                                                text = label;
                                            } else {
                                                text = getActionName(action);
                                            }
                                            let onClick = async () => {
                                                if (ele.onClick) {
                                                    ele.onClick(ele);
                                                    return;
                                                }
                                                if (ele.beforeAction) {
                                                    const r =
                                                        await ele.beforeAction(
                                                            ele
                                                        );
                                                    if (!r) {
                                                        return;
                                                    }
                                                }
                                                await methods.execute(
                                                    ele.action as EntityDict[keyof EntityDict]['Action']
                                                );
                                                if (ele.afterAction) {
                                                    ele.afterAction(ele);
                                                }
                                            };
                                            if (ele.alerted) {
                                                onClick = async () => {
                                                    let alertContent = '';
                                                    if (ele.action) {
                                                        alertContent = `确认${text}该数据`;
                                                    }
                                                    confirm({
                                                        title:
                                                            ele.alertTitle ||
                                                            '温馨提示',
                                                        content:
                                                            ele.alertContent ||
                                                            alertContent,
                                                        okText:
                                                            ele.confirmText ||
                                                            '确定',
                                                        cancelText:
                                                            ele.cancelText ||
                                                            '取消',
                                                        onOk: async () => {
                                                            if (ele.onClick) {
                                                                ele.onClick(
                                                                    ele
                                                                );
                                                                return;
                                                            }
                                                            if (
                                                                ele.beforeAction
                                                            ) {
                                                                const r =
                                                                    await ele.beforeAction(
                                                                        ele
                                                                    );
                                                                if (!r) {
                                                                    return;
                                                                }
                                                            }
                                                            await methods.execute(
                                                                ele.action as EntityDict[keyof EntityDict]['Action']
                                                            );
                                                            if (
                                                                ele.afterAction
                                                            ) {
                                                                ele.afterAction(ele);
                                                            }
                                                        },
                                                    });
                                                };
                                            }
                                            return (
                                                <div
                                                    key={index2}
                                                    className={classNames(
                                                        Style.btnBox,
                                                        {
                                                            [Style.btnBox_top]:
                                                                newItems.length >
                                                                    column &&
                                                                index2 >
                                                                    column - 1,
                                                        }
                                                    )}
                                                    style={{
                                                        height: `calc(100% / ${
                                                            newItems.length >
                                                            column
                                                                ? rows
                                                                : 1
                                                        })`,
                                                        width: `calc(100% / ${column})`,
                                                    }}
                                                >
                                                    <ItemComponent
                                                        {...ele}
                                                        onClick={onClick}
                                                        mode={mode}
                                                        entity={entity}
                                                        t={t}
                                                        text={text}
                                                    />
                                                </div>
                                            );
                                        })}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
            {slideShow && (
                <div className={Style.slideBar}>
                    <div
                        className={Style.slideShow}
                        style={{
                            width: slideWidth,
                            marginLeft: slideLeft <= 1 ? 0 : slideLeft,
                        }}
                    />
                </div>
            )}
        </div>
    );
}
