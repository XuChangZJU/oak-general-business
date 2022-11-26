import React from 'react';
import { Button, Modal } from 'antd';

import { EntityDict } from '../../../general-app-domain';
import { WebComponentProps } from 'oak-frontend-base';

export default function Render(
    props: WebComponentProps<
        EntityDict,
        'userEntityGrant',
        true,
        {
            oakLegalActions: string[];
        },
        {
            tapAction: (action: string) => Promise<void>;
        }
    >
) {
    const { data, methods } = props;
    const { oakLegalActions } = data;
    const { tapAction, t } = methods;

    return oakLegalActions?.length > 0
        ? oakLegalActions.map((ele: string) => {
              let btnName = t(`userEntityGrant:action.${ele}`);
              if (ele === 'remove') {
                  btnName = t(`common:action.${ele}`);
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
                                  await tapAction(ele);
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
