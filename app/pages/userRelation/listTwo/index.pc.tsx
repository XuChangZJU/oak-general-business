import React from 'react';
import { firstLetterUpperCase } from 'oak-domain/lib/utils/string';

import {
    Table,
    Input,
    Select,
    Button,
    Avatar,
    Space,
} from 'tdesign-react';

export default function render() {
  const { users = [], oakLoading, editableRowKeys = [],  } = this.state;
    const { relations, entity, entityId } = this.props;
    const relationArr =
        typeof relations === 'object'
            ? relations
            : relations && JSON.parse(relations);
  return (
      <div>
          <Space>
              <Button
                  shape="rectangle"
                  size="medium"
                  type="button"
                  variant="base"
                  onClick={() => this.goUpsert()}
              >
                  添加
              </Button>
              <Button
                  shape="rectangle"
                  size="medium"
                  type="button"
                  variant="base"
                  onClick={() => this.goUserEntityGrantWithGrant()}
              >
                  二维码分享
              </Button>
          </Space>

          <Table
              loading={oakLoading}
              resizable
              bordered={false}
              ref={this.tableRef}
              rowKey="id"
              editableRowKeys={editableRowKeys}
              onRowEdit={(params) => this.onRowEdit(params)}
              onRowValidate={(params) => this.onRowValidate(params)}
              columns={[
                  {
                      colKey: 'avatar',
                      title: '头像',
                      cell: ({ row, rowIndex, col, colIndex }) => {
                          const { avatar } = row;
                          return avatar ? (
                              <Avatar
                                  hideOnLoadFailed={false}
                                  image="https://tdesign.gtimg.com/site/avatar.jpg"
                                  shape="circle"
                              />
                          ) : (
                              <span>未设置</span>
                          );
                      },
                  },
                  {
                      colKey: 'name',
                      title: '姓名',
                      edit: {
                          component: Input,
                          props: {
                              clearable: true,
                              autofocus: true,
                              autoWidth: true,
                          },
                          rules: [{ required: true, message: '不能为空' }],
                          showEditIcon: false,
                      },
                  },
                  {
                      colKey: 'nickname',
                      title: '昵称',
                      edit: {
                          component: Input,
                          props: {
                              clearable: true,
                              autofocus: true,
                              autoWidth: true,
                          },
                          rules: [{ required: true, message: '不能为空' }],
                          showEditIcon: false,
                      },
                  },
                  {
                      colKey: 'mobile',
                      title: '手机号',
                  },
                  {
                      colKey: 'relations',
                      title: '权限',

                      cell: ({ row, rowIndex, col, colIndex }) =>
                          row?.relations?.join('、'),
                      edit: {
                          component: Select,
                          // props, 透传全部属性到 Select 组件
                          // props 为函数时，参数有：col, row, rowIndex, colIndex, editedRow。一般用于实现编辑组件之间的联动
                          props: ({ editedRow }) => {
                              return {
                                  multiple: true,
                                  minCollapsedNum: 1,
                                  autoWidth: true,
                                  options:
                                      relationArr &&
                                      relationArr.map((ele, index) => ({
                                          value: ele,
                                          label:
                                              (this.t &&
                                                  this.t(
                                                      entity + ':r.' + ele
                                                  )) ||
                                              ele,
                                      })),
                              };
                          },
                          showEditIcon: false,
                          rules: [
                              { required: true, message: '请至少选择一个权限' },
                          ],
                      },
                  },
                  {
                      title: '操作',
                      colKey: 'operate',
                      cell: ({ row }) => {
                          const editable = editableRowKeys.includes(row.id);
                          return (
                              <div className="table-operations">
                                  {!editable && (
                                      <Button
                                          theme="primary"
                                          variant="text"
                                          data-id={row.id}
                                          onClick={(e) => this.onEdit(e)}
                                      >
                                          编辑
                                      </Button>
                                  )}
                                  {editable && (
                                      <Button
                                          theme="primary"
                                          variant="text"
                                          data-id={row.id}
                                          onClick={(e) => this.onSave(e)}
                                      >
                                          保存
                                      </Button>
                                  )}
                                  {editable && (
                                      <Button
                                          theme="primary"
                                          variant="text"
                                          data-id={row.id}
                                          onClick={(e) => this.onCancel(e)}
                                      >
                                          取消
                                      </Button>
                                  )}
                              </div>
                          );
                      },
                  },
              ]}
              data={users}
          />
      </div>
  );
}
