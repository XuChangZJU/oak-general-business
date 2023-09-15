"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const antd_1 = require("antd");
const icons_1 = require("@ant-design/icons");
const filterPanel_1 = tslib_1.__importDefault(require("oak-frontend-base/es/components/filterPanel"));
const pageHeader_1 = tslib_1.__importDefault(require("../../../components/common/pageHeader"));
const web_module_less_1 = tslib_1.__importDefault(require("./web.module.less"));
function Render(props) {
    const { methods, data } = props;
    const { t, setPageSize, setCurrentPage, goNewUser, onCellClicked } = methods;
    const { oakFullpath, oakLoading, oakPagination, userArr = [], stateColor, isRoot, } = data;
    const { pageSize, total, currentPage } = oakPagination || {};
    return ((0, jsx_runtime_1.jsx)(pageHeader_1.default, { children: (0, jsx_runtime_1.jsxs)("div", { className: web_module_less_1.default.container, children: [isRoot && ((0, jsx_runtime_1.jsx)(antd_1.Space, { style: { marginBottom: 16 }, children: (0, jsx_runtime_1.jsx)(antd_1.Button, { type: "primary", onClick: () => {
                            goNewUser();
                        }, children: "\u6DFB\u52A0\u7528\u6237" }) })), (0, jsx_runtime_1.jsx)(filterPanel_1.default, { entity: "user", oakPath: oakFullpath, columns: [
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
                    ] }), (0, jsx_runtime_1.jsx)(antd_1.Table, { loading: oakLoading, dataSource: userArr, rowKey: "id", columns: [
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
                                    return ((0, jsx_runtime_1.jsx)(antd_1.Avatar, { icon: (0, jsx_runtime_1.jsx)(icons_1.UserOutlined, {}) }));
                                }
                                return (0, jsx_runtime_1.jsx)(antd_1.Avatar, { src: value, shape: "circle" });
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
                                return ((0, jsx_runtime_1.jsx)(antd_1.Tag, { color: stateColor[value], children: t(`user:v.userState.${value}`) }));
                            },
                        },
                        {
                            dataIndex: 'op',
                            width: 200,
                            title: '操作',
                            align: 'center',
                            render: (value, record, index) => {
                                return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(antd_1.Button, { type: "link", onClick: () => {
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
                    } })] }) }));
}
exports.default = Render;
