import React from 'react';
import { Button, Modal } from 'antd';

export default function render(this: any) {
    const { oakLegalActions } = this.state;

    return oakLegalActions?.length > 0
        ? oakLegalActions.map((ele: string) => {
              let btnName = this.t(`userEntityGrant:action.${ele}`);
              if (ele === 'remove') {
                  btnName = this.t(`common:action.${ele}`);
              }
              return (
                  <Button
                      type="link"
                      onClick={(event) => {
                          const modal = Modal!.confirm!({
                              title: `确认${btnName}该授权记录吗？`,
                              okText: '确定',
                              cancelText: '取消',
                              onOk: async (e) => {
                                  await this.tapAction(ele);
                                  modal!.destroy!();
                              },
                              onCancel: (e) => {
                                  modal!.destroy!();
                              },
                          });
                      }}
                  >
                      {btnName}
                  </Button>
              );
          })
        : null;
}
