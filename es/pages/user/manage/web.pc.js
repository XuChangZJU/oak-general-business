import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Table, Tag, Button, Modal, Space, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
export default function render() {
    const { t } = this;
    const { event } = this.props;
    const { userArr = [], oakLoading, stateColor, pagination } = this.state;
    const { pageSize, total, currentPage } = pagination || {};
    return (_jsxs("div", { style: { padding: 16 }, children: [_jsx(Space, { children: _jsx(Button, { type: "primary", onClick: () => {
                        this.goNewUser();
                    }, children: "\u6DFB\u52A0\u7528\u6237" }) }), _jsx(Table, { loading: oakLoading, dataSource: userArr, rowKey: "id", columns: [
                    {
                        dataIndex: 'id',
                        title: '序号',
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
                            return (_jsxs(_Fragment, { children: [_jsx(Button, { type: "link", onClick: () => {
                                            this.onCellClicked(record.id, event);
                                        }, children: "\u8BE6\u60C5" }), _jsx(Button, { type: "link", onClick: () => {
                                            const modal = Modal.confirm({
                                                title: '确认删除该用户吗？',
                                                content: '删除后，用户不可恢复',
                                                okText: '确定',
                                                cancelText: '取消',
                                                onOk: async (e) => {
                                                    await this.addOperation({
                                                        action: 'remove',
                                                        data: {},
                                                        filter: {
                                                            id: record.id,
                                                        },
                                                    });
                                                    await this.execute();
                                                    modal.destroy();
                                                },
                                                onCancel: (e) => {
                                                    modal.destroy();
                                                },
                                            });
                                        }, children: "\u5220\u9664" })] }));
                        },
                        fixed: 'right',
                    },
                ], pagination: {
                    total: total,
                    pageSize: pageSize,
                    current: currentPage,
                    onShowSizeChange: (pageSize) => {
                        this.setPageSize(pageSize);
                    },
                    onChange: (page) => {
                        this.setCurrentPage(page);
                    }
                } })] }));
}
