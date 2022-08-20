import React from 'react';
import { Button } from 'tdesign-react';
import { isWeiXin } from 'oak-frontend-base/lib/utils/utils';
import styles from './web.module.less';

export default function render(this: any) {
    const { error } = this.state;

    return (
        <div className={styles.container}>
            <div
                style={{
                    padding: 16,
                }}
            >
                <div
                    style={{
                        fontSize: 18,
                        marginBottom: 16,
                    }}
                >
                    {error}
                </div>
                {isWeiXin && (
                    <Button
                        onClick={() => {
                            WeixinJSBridge.call('closeWindow');
                        }}
                    >
                        关闭
                    </Button>
                )}
            </div>
        </div>
    );
}
