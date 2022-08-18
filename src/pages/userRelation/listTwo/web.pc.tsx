import React from 'react';

import {
    Table,
    Input,
    Select,
    Button,
    Avatar,
    Space,
    Tag
} from 'tdesign-react';

export default function render(this: any) {
    const { t } = this;
    const { users = [], oakLoading, editableRowKeys = [] } = this.state;
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
                                  image={avatar}
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
                      cell: ({ row, rowIndex, col, colIndex }) => {
                          return (
                              <Space>
                                  {row.relations?.map((ele: string, index: number) => (
                                      <Tag key={index}>
                                          {t(entity + ':r.' + ele)}
                                      </Tag>
                                  ))}
                              </Space>
                          );
                      },

                      edit: {
                          component: Select,
                          // props, 透传全部属性到 Select 组件
                          // props 为函数时，参数有：col, row, rowIndex, colIndex, editedRow。一般用于实现编辑组件之间的联动
                          props: () => {
                              return {
                                  multiple: true,
                                  minCollapsedNum: 1,
                                  autoWidth: true,
                                  options:
                                      relationArr &&
                                      relationArr.map((ele: any, index: number) => ({
                                          value: ele,
                                          label: t(entity + ':r.' + ele),
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
                              <Space>
                                  <Button
                                      theme="primary"
                                      variant="text"
                                      onClick={(e) => this.goDetail(row.id)}
                                  >
                                      详情
                                  </Button>
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
                              </Space>
                          );
                      },
                  },
              ]}
              data={users}
          />
      </div>
  );
}
