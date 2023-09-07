import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Table, Tag, Button, Space, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import FilterPanel from 'oak-frontend-base/es/components/filterPanel';
import Style from './web.module.less';
export default function Render(props) {
    const { methods, data } = props;
    const { t, setPageSize, setCurrentPage, goNewUser, onCellClicked } = methods;
    const { oakFullpath, oakLoading, oakPagination, userArr = [], stateColor, isRoot, } = data;
    const { pageSize, total, currentPage } = oakPagination || {};
    return (_jsxs("div", { className: Style.container, children: [isRoot && (_jsx(Space, { style: { marginBottom: 16 }, children: _jsx(Button, { type: "primary", onClick: () => {
                        goNewUser();
                    }, children: "\u6DFB\u52A0\u7528\u6237" }) })), _jsx(FilterPanel, { entity: "user", oakPath: oakFullpath, columns: [
                    {
                        attr: 'nickname',
                        op: '$includes',
                    },
                    {
                        attr: 'name',
                        op: '$includes',
                    },
                    {
                        attr: 'userState',
                    },
                ] }), _jsx(Table, { loading: oakLoading, dataSource: userArr, rowKey: "id", columns: [
                    {
                        dataIndex: 'id',
                        title: '#',
                        render: (value, record, index) => {
                            return index + 1;
                        },
                    },
                    {
                        width: 100,
                        dataIndex: 'avatar',
                        title: '头像',
                        render: (value, record, index) => {
                            if (!value) {
                                return (_jsx(Avatar, { icon: _jsx(UserOutlined, {}) }));
                            }
                            return _jsx(Avatar, { src: value, shape: "circle" });
                        },
                    },
                    {
                        dataIndex: 'nickname',
                        title: '昵称',
                    },
                    {
                        dataIndex: 'name',
                        title: '姓名',
                    },
                    {
                        dataIndex: 'mobile',
                        title: '手机号',
                    },
                    {
                        dataIndex: 'userState',
                        title: '状态',
                        render: (value, record, index) => {
                            return (_jsx(Tag, { color: stateColor[value], children: t(`user:v.userState.${value}`) }));
                        },
                    },
                    {
                        dataIndex: 'op',
                        width: 200,
                        title: '操作',
                        align: 'center',
                        render: (value, record, index) => {
                            return (_jsx(_Fragment, { children: _jsx(Button, { type: "link", onClick: () => {
                                        onCellClicked(record.id);
                                    }, children: "\u8BE6\u60C5" }) }));
                        },
                        fixed: 'right',
                    },
                ], pagination: {
                    total: total,
                    pageSize: pageSize,
                    current: currentPage,
                    onShowSizeChange: (pageSize) => {
                        setPageSize(pageSize);
                    },
                    onChange: (page) => {
                        setCurrentPage(page);
                    },
                } })] }));
}
