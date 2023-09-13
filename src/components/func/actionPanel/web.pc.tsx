import { Button, Space } from 'antd';
import { WebComponentProps } from "oak-frontend-base";
import { EntityDict } from "../../../oak-app-domain";
import Style from './web.module.less';

export default function Render(
    props: WebComponentProps<
        EntityDict,
        'user',
        false,
        {
            actionss: Array<{
                icon: { name: string };
                label: string;
                action: string;
            }>;
            onActionClick: (action: string) => void;
        }
    >
) {
    const { actionss, onActionClick } = props.data;
    // icon方案还未最终确定
    if (actionss) {
        return (
            <Space>
                {actionss.map((ele) => (
                    <Button
                        color="primary"
                        type="default"
                        onClick={() => onActionClick(ele.action)}
                    >
                        {ele.label}
                    </Button>
                ))}
            </Space>
        );
    }
    return null;
}