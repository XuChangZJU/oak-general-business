import React, { useEffect, useState } from 'react';
import { Input, Button, Space, Form, Badge, Row, Col } from 'antd';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../../general-app-domain';
import Query from '../query';
import { ColSpanType, ColumnProps } from '../query/column';
import { getFilterName } from '../query/utils';

import Style from './web.module.less';
import { t } from '@wangeditor/editor';



type Width = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

type ColumnMapType = {
    xxl: ColSpanType;
    xl: ColSpanType;
    lg: ColSpanType;
    md: ColSpanType;
    sm: ColSpanType;
    xs: ColSpanType;
};

const DEFAULT_COLUMN_MAP: ColumnMapType = {
    xxl: 4,
    xl: 4,
    lg: 4,
    md: 3,
    sm: 2,
    xs: 1,
};


function transformColumns(columns: ColumnProps[]) {
    return columns.map((column, index) => {
        const _filterName = getFilterName(column);

        return {
            ...column,
            filterName: _filterName,
        };
    });
}

function getColumn(column: ColSpanType | ColumnMapType, width: Width) {
    if (typeof column === 'number') {
        return column;
    }

    if (typeof column === 'object') {
        if (column[width] !== undefined) {
            return column[width] || DEFAULT_COLUMN_MAP[width];
        }
    }

    return 3;
}

function getSpan(colSpan: ColSpanType, column: ColSpanType) {
    return colSpan > column ? column : colSpan;
}

export default function Render(
    props: WebComponentProps<
        EntityDict,
        keyof EntityDict,
        false,
        {
            entity: string;
            columns: Array<ColumnProps>;
            onSearch: () => void;
            column?: ColSpanType | ColumnMapType;
            width: Width;
        },
        {
            getNamedFilters: () => Record<string, any>[];
        }
    >
) {
    const {
        onSearch,
        columns,
        column = DEFAULT_COLUMN_MAP,
        width,
        entity,
        oakFullpath,
    } = props.data;
    const { t, refresh, getNamedFilters, removeNamedFilterByName } = props.methods;
    const [open, setOpen] = useState(false);

    if (!columns || columns.length === 0) {
        return null;
    }

    const tfColumns = transformColumns(columns);
    const mergedColumn = getColumn(column, width); // 一行放几个
    const gridColumn = Math.ceil(24 / mergedColumn); // 24格 计算一个所需几格
    const totalColSpan = tfColumns.reduce(
        (prev, cur, index, arr) =>
            getSpan(cur.colSpan || 1, mergedColumn) + prev,
        0
    ); //总共多少份
    const rows = Math.ceil(totalColSpan / mergedColumn);
    const showExpandButton = totalColSpan > mergedColumn - 1; //需要显示展开按钮
    const filters = getNamedFilters() || [];
    const filterNames = tfColumns.map((ele) => ele.filterName);
    const filters2 = filters?.filter((ele) =>
        filterNames.includes(ele['#name'])
    );
    const count = filters2?.length || 0; //查询条件个数

    const items: any = [];
    let rowSum = 0;
    let rowSum2 = 0;
    let rows2 = 1;
    let firstItem;
    let _gridColumn = gridColumn;
    tfColumns.forEach((column, index) => {
        const { colSpan } = column;
        const colSpan2 = getSpan(colSpan || 1, mergedColumn);

        const item = (
            <Col span={gridColumn * colSpan2}>
                <Query column={column} entity={entity} oakPath={oakFullpath} />
            </Col>
        );

        if (index === 0) {
            firstItem = item;
        }
        if (!open) {
            if (width !== 'xs') {
                rowSum += colSpan2;

                if (mergedColumn === 1) {
                    //一行一个
                    items.push(item);
                } else if (rowSum <= mergedColumn - 1) {
                    items.push(item);
                    rowSum2 = rowSum;

                    if (totalColSpan === mergedColumn - 1) {
                        _gridColumn = gridColumn * 1;
                    } else if (totalColSpan < mergedColumn) {
                        _gridColumn = gridColumn * (mergedColumn - rowSum2);
                    }
                } else {
                    _gridColumn = gridColumn * (mergedColumn - rowSum2);
                }
            }
        } else {
            items.push(item);
            if (
                rowSum + colSpan2 > rows2 * mergedColumn &&
                rowSum < rows2 * mergedColumn
            ) {
                rowSum += rows2 * mergedColumn - rowSum;
                rowSum += colSpan2;
                rows2 += 1;
            } else if (rowSum + colSpan2 === rows2 * mergedColumn) {
                rowSum += colSpan2;
                rows2 += 1;
            } else {
                rowSum += colSpan2;
            }
        }
    });

    if (open) {
        _gridColumn = 24;
        if (rowSum >= mergedColumn) {
            const other = rows * mergedColumn - rowSum;
            if (other > 0) {
                _gridColumn = gridColumn * other;
            }
        } else {
            _gridColumn = gridColumn * (mergedColumn - rowSum);
        }
    } else {
        if (width === 'xs') {
            items.push(firstItem);
        }
    }

    items.push(
        <Col span={_gridColumn}>
            <Form.Item>
                <Space size={16} className={Style.actionBox}>
                    <Badge count={count}>
                        <Button
                            type="default"
                            onClick={() => {
                                filterNames.forEach((ele) =>
                                    removeNamedFilterByName(ele)
                                );

                                refresh();
                            }}
                        >
                            {t('common:reset')}
                        </Button>
                    </Badge>
                    <Button
                        type="primary"
                        onClick={() => {
                            if (typeof onSearch === 'function') {
                                onSearch();
                                return;
                            }
                            refresh();
                        }}
                    >
                        {t('common:select')}
                    </Button>
                    {showExpandButton && (
                        <Button
                            type="link"
                            onClick={() => {
                                setOpen(!open);
                            }}
                        >
                            <Space>
                                {open ? t('common:shrink') : t('common:expand')}

                                {open ? <UpOutlined /> : <DownOutlined />}
                            </Space>
                        </Button>
                    )}
                </Space>
            </Form.Item>
        </Col>
    );

    return (
        <Form>
            <Row gutter={[16, 16]}>{items}</Row>
        </Form>
    );
}
