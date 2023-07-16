import React from 'react';
import TreeList from '../treeList';

import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from "../../../general-app-domain";
import Styles from './web.pc.module.less';

export default function Render(
    props: WebComponentProps<
        EntityDict,
        'articleMenu',
        true,
        {
            entity: string,
            entityId: string,
        }
    >
) {
    const { entity, entityId, oakFullpath } = props.data;

    if (oakFullpath) {
        return (
            <div className={Styles.container}>
                <div className={Styles.menu}>
                    <TreeList
                        oakPath={`${oakFullpath}.articleMenus`}
                        entity={entity}
                        entityId={entityId}
                    />
                </div>
                <div className={Styles.editor}>
                </div>
            </div>
        );
    }
    return null;
}
