import React from 'react';


import {
    Table,
    Input,
    Select,
    Button,
    Avatar,
    Space,
    Tag,
} from 'antd';
import PageHeader from '../../../components/common/pageHeader';
import Style from './web.module.less';

export default function render(this: any) {
    const { t } = this;
    const { pagination, users = [], oakLoading, editableRowKeys = [] } = this.state;
    const { relations, entity, entityId } = this.props;
    const { pageSize, total, currentPage } = pagination || {};
    const relationArr =
        typeof relations === 'object'
            ? relations
            : relations && JSON.parse(relations);
  return (
      <PageHeader title="人员列表">
          <div className={Style.container}>
              <Space>
                  <Button type="primary" onClick={() => this.goUpsert()}>
                      添加
                  </Button>
                  <Button
                      type="primary"
                      onClick={() => this.goUserEntityGrantWithGrant()}
                  >
                      二维码分享
                  </Button>
              </Space>

              <Table
                  loading={oakLoading}
                  ref={this.tableRef}
                  rowKey="id"
                  editableRowKeys={editableRowKeys}
                  onRowEdit={(params) => this.onRowEdit(params)}
                  onRowValidate={(params) => this.onRowValidate(params)}
                  columns={[
                      {
                          width: 100,
                          dataIndex: 'index',
                          title: '序号',
                          render: (value, record, index) => index + 1,
                      },
                      {
                          dataIndex: 'avatar',
                          title: '头像',
                          render: (value, record, index) => {
                              return value ? (
                                  <Avatar src={value} shape="circle" />
                              ) : (
                                  <span>未设置</span>
                              );
                          },
                      },
                      {
                          dataIndex: 'name',
                          title: '姓名',
                          //   edit: {
                          //       component: Input,
                          //       props: {
                          //           clearable: true,
                          //           autofocus: true,
                          //           autoWidth: true,
                          //       },
                          //       rules: [
                          //           { required: true, message: '不能为空' },
                          //       ],
                          //       showEditIcon: false,
                          //   },
                      },
                      {
                          dataIndex: 'nickname',
                          title: '昵称',
                          //   edit: {
                          //       component: Input,
                          //       props: {
                          //           clearable: true,
                          //           autofocus: true,
                          //           autoWidth: true,
                          //       },
                          //       rules: [
                          //           { required: true, message: '不能为空' },
                          //       ],
                          //       showEditIcon: false,
                          //   },
                      },
                      {
                          dataIndex: 'mobile',
                          title: '手机号',
                      },
                      {
                          dataIndex: 'relations',
                          title: '权限',
                          render: (value, record, index) => {
                              return (
                                  <Space>
                                      {record.relations?.map(
                                          (ele: string, index: number) => (
                                              <Tag key={index}>
                                                  {t(entity + ':r.' + ele)}
                                              </Tag>
                                          )
                                      )}
                                  </Space>
                              );
                          },

                          //   edit: {
                          //       component: Select,
                          //       // props, 透传全部属性到 Select 组件
                          //       // props 为函数时，参数有：col, row, rowIndex, colIndex, editedRow。一般用于实现编辑组件之间的联动
                          //       props: () => {
                          //           return {
                          //               multiple: true,
                          //               minCollapsedNum: 1,
                          //               autoWidth: true,
                          //               options:
                          //                   relationArr &&
                          //                   relationArr.map(
                          //                       (
                          //                           ele: any,
                          //                           index: number
                          //                       ) => ({
                          //                           value: ele,
                          //                           label: t(
                          //                               entity + ':r.' + ele
                          //                           ),
                          //                       })
                          //                   ),
                          //           };
                          //       },
                          //       showEditIcon: false,
                          //       rules: [
                          //           {
                          //               required: true,
                          //               message: '请至少选择一个权限',
                          //           },
                          //       ],
                          //   },
                      },
                      {
                          title: '操作',
                          dataIndex: 'operate',
                          render: (value, record, index) => {
                              const editable = editableRowKeys.includes(
                                  record.id
                              );
                              return (
                                  <Space>
                                      <Button
                                          type="link"
                                          onClick={(e) =>
                                              this.goDetail(record.id)
                                          }
                                      >
                                          详情
                                      </Button>
                                      {!editable && (
                                          <Button
                                              type="link"
                                              onClick={(e) => this.onEdit(e)}
                                          >
                                              编辑
                                          </Button>
                                      )}
                                      {editable && (
                                          <Button
                                              type="link"
                                              variant="text"
                                              onClick={(e) => this.onSave(e)}
                                          >
                                              保存
                                          </Button>
                                      )}
                                      {editable && (
                                          <Button
                                              type="primary"
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
                  pagination={{
                      total,
                      pageSize,
                      current: currentPage,
                      onShowSizeChange: (current: number, size: number) => {
                          this.setPageSize(current);
                      },
                      onChange: (page: number, pageSize: number) => {
                          this.setCurrentPage(page);
                      },
                  }}
              />
          </div>
      </PageHeader>
  );
}
