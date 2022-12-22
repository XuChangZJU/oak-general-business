import React from 'react';
import { Button, Modal } from 'antd';
import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../../general-app-domain';

export default function Render(
    props: WebComponentProps<
        EntityDict,
        'message',
        false,
        {},
        {
            tapAction: (action: string) => void;
        }
    >
) {
    const { data, methods } = props;
    const { t, tapAction } = methods;
    const { oakLegalActions } = data;

    return oakLegalActions && oakLegalActions?.length > 0
        ? oakLegalActions.map((ele: string) => {
              return (
                  <Button
                      type="link"
                      onClick={(event) => {
                          const modal = Modal!.confirm!({
                              title: `确认该消息标为已读吗？`,
                              okText: '确定',
                              cancelText: '取消',
                              onOk: (e) => {
                                  tapAction(ele);
                                  modal!.destroy!();
                              },
                              onCancel: (e) => {
                                  modal!.destroy!();
                              },
                          });
                      }}
                  >
                      标为已读
                  </Button>
              );
          })
        : null;
}
