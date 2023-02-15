import React from 'react';
import {
    Card,
    Button,
} from 'antd';
import PageHeader from '../../../components/common/pageHeader';
import { EntityDict } from '../../../general-app-domain';
import { WebComponentProps } from 'oak-frontend-base';
import Style from './web.module.less';

export default function Render(
    props: WebComponentProps<
        EntityDict,
        'message',
        false,
        {
            title: string;
            content: string;
            id: string;
            $$createAt$$: number;
            type: string;
            visitState: EntityDict['message']['Schema']['visitState'];
            router: EntityDict['message']['Schema']['router'];
        },
        {
            goPage: () => void;
        }
    >
) {
    const { data, methods } = props;
    const { title, content, router } = data;
    const { t, goPage } = methods;
    const pathname = router?.pathname;


    return (
        <PageHeader title="消息详情" showBack={true}>
            <div className={Style.container}>
                <div className={Style.warp}>
                    <div className={Style.inner}>
                        <h1 className={Style.title}>{title}</h1>
                        <div className={Style.content}>{content}</div>

                        {pathname && (
                            <Button
                                className={Style.btn}
                                block
                                type="primary"
                                onClick={() => {
                                    goPage();
                                }}
                            >
                                前往
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </PageHeader>
    );
}
