import { Button } from 'antd-mobile';
import { WebComponentProps } from "oak-frontend-base";
import { EntityDict } from "../../../general-app-domain";
import Styles from './web.module.less';

export default function Render(props: WebComponentProps<EntityDict, 'user', false, {
    actionss: Array<{
        icon: { name: string; };
        label: string;
        action: string;
    }>;
}, {
    onClick: (action: string) => void,
}>) {
    const { actionss } = props.data;
    const { onClick } = props.methods;
    // icon方案还未最终确定
    if (actionss) {
        return (
            <div className={Styles.container}>
                {
                    actionss.map(
                        ele => (
                            <div className="action">
                                <Button color='primary' fill='outline' onClick={() => onClick(ele.action)}>
                                    {ele.label}
                                </Button>
                            </div>
                        )
                    )
                }
            </div>
        );
    }
    return null;
}