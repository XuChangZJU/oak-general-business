import { WebComponentProps } from 'oak-frontend-base';
import { EntityDict } from '../../../../oak-app-domain';

export default function Render(
    props: WebComponentProps<
        EntityDict,
        'userEntityGrant',
        false,
        {
            userEntityGrant: EntityDict['userEntityGrant']['Schema'];
        }
    >
) {
    const { userEntityGrant } = props.data;

    return <div>宽屏未实现</div>
}