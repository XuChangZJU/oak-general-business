import React from 'react';
import {
    Table,
    Input,
    Select,
    DatePicker,
    Button,
    Avatar,
} from 'tdesign-react';

export default function render() {
  const { users = [], oakLoading } = this.state;
    

  // 当前示例包含：输入框、单选、多选、日期 等场景
  return (
      <div>
          <Table
              loading={oakLoading}
              resizable
              bordered={false}
              ref={this.tableRef}
              rowKey="index"
              columns={[
                  {
                      colKey: 'avatar',
                      title: '头像',
                      cell: ({ row, rowIndex, col, colIndex }) => {
                          return (
                              <Avatar
                                  hideOnLoadFailed={false}
                                  image="https://tdesign.gtimg.com/site/avatar.jpg"
                                  shape="circle"
                              />
                          );
                      },
                  },
                  {
                      colKey: 'name',
                      title: '姓名',
                  },
                  {
                      colKey: 'nickname',
                      title: '昵称',
                  },
                  {
                      colKey: 'mobile',
                      title: '手机号',
                  },
              ]}
              data={users}
          />
      </div>
  );
}
