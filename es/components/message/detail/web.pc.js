import React from 'react';
import { Button, } from 'antd';
import Style from './web.module.less';
export default function Render(props) {
    const { data, methods } = props;
    const { title, content, router } = data;
    const { t, goPage } = methods;
    const pathname = router?.pathname;
    return (<>
            <div className={Style.warp}>
                <div className={Style.inner}>
                    <h1 className={Style.title}>{title}</h1>
                    <div className={Style.content}>{content}</div>

                    {pathname && (<Button className={Style.btn} block type="primary" onClick={() => {
                goPage();
            }}>
                            前往
                        </Button>)}
                </div>
            </div>
        </>);
}
