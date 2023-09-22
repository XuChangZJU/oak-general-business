import React, { useState, useEffect } from 'react';
import { EntityDict } from "../../../oak-app-domain";
import { WebComponentProps } from 'oak-frontend-base';
import { Modal, Button, Table, Space, Upload, Form, Input } from 'antd';
import Style from './web.module.less';

export default function Render(
    props: WebComponentProps<
        EntityDict,
        keyof EntityDict,
        false,
        {
            news: any[]
        },
        {
        }
    >
) {
    const { news } = props.data;
    return (
        <div className={Style.container}>
            {
                news && news.length > 1 ?
                    <div className={Style.multiNews}>
                        {
                            news.map((ele: any, index: number) => {
                                if (index === 0) {
                                    return (
                                        <div className={Style.cover}>
                                            <img className={Style.img} src={ele.coverUrl} />
                                            <div className={Style.articleTitle}>
                                                {ele.title}
                                            </div>
                                        </div>
                                    )
                                } else {
                                    return (
                                        <div className={Style.newsItem}>
                                            <div className={Style.articleTitle}>
                                                {ele.title}
                                            </div>
                                            <div className={Style.imgCover}>
                                                <img className={Style.img} src={ele.coverUrl} />
                                            </div>
                                        </div>
                                    )
                                }
                            })
                        }
                    </div>
                    :
                    <div className={Style.singleNews}>
                        <div className={Style.cover}>
                            <img className={Style.img} src={news?.[0]?.coverUrl} />
                        </div>
                        <div className={Style.articleTitle}>{news?.[0]?.title}</div>
                    </div>
            }
        </div>
    );
}

