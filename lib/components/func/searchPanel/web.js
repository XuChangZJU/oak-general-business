"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var antd_1 = require("antd");
var icons_1 = require("@ant-design/icons");
function getQueryDict(column) {
    return "".concat(column.attr).concat(column.op ? ".".concat(column.op) : '');
}
function transformColumns(columns) {
    return columns.map(function (column, index) {
        var filterName = column.filterName;
        var _filterName = filterName || getQueryDict(column);
        return tslib_1.__assign(tslib_1.__assign({}, column), { filterName: _filterName });
    });
}
function Render(props) {
    var _a = props.data, searchValue = _a.searchValue, onSearch = _a.onSearch, columns = _a.columns;
    var _b = props.methods, addNamedFilter = _b.addNamedFilter, refresh = _b.refresh, getNamedFilters = _b.getNamedFilters;
    var filters = getNamedFilters() || [];
    return ((0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsxs)(antd_1.Form, { children: [columns.map(function (column) {
                    console.log(column.filterName || getQueryDict(column));
                    return ((0, jsx_runtime_1.jsx)(antd_1.Form.Item, { children: (0, jsx_runtime_1.jsx)(antd_1.Input, { value: searchValue, onChange: function (e) {
                                addNamedFilter({
                                    filter: {
                                        name: {
                                            $includes: e.target.value,
                                        },
                                    },
                                    '#name': column.filterName ||
                                        getQueryDict(column),
                                });
                            } }) }));
                }), (0, jsx_runtime_1.jsx)(ActionView, { columns: columns, filters: filters })] }) }));
}
exports.default = Render;
function ActionView(props) {
    var columns = props.columns, filters = props.filters;
    var tfColumns = transformColumns(columns);
    var filterNames = tfColumns.map(function (ele) { return ele.filterName; });
    var filters2 = filters === null || filters === void 0 ? void 0 : filters.filter(function (ele) {
        return filterNames.includes(ele['#name']);
    });
    var count = (filters2 === null || filters2 === void 0 ? void 0 : filters2.length) || 0;
    return ((0, jsx_runtime_1.jsx)(antd_1.Form.Item, { children: (0, jsx_runtime_1.jsxs)(antd_1.Space, tslib_1.__assign({ size: 16 }, { children: [(0, jsx_runtime_1.jsx)(antd_1.Badge, tslib_1.__assign({ count: count }, { children: (0, jsx_runtime_1.jsx)(antd_1.Button, tslib_1.__assign({ type: "default" }, { children: "\u91CD\u7F6E" })) })), (0, jsx_runtime_1.jsx)(antd_1.Button, tslib_1.__assign({ type: "primary", onClick: function () {
                        // if (typeof onSearch === 'function') {
                        //     onSearch();
                        //     return;
                        // }
                        // refresh();
                    } }, { children: "\u67E5\u8BE2" })), (0, jsx_runtime_1.jsx)(antd_1.Button, tslib_1.__assign({ type: "link" }, { children: (0, jsx_runtime_1.jsxs)(antd_1.Space, { children: ["\u5C55\u5F00", (0, jsx_runtime_1.jsx)(icons_1.DownOutlined, {})] }) }))] })) }));
}
