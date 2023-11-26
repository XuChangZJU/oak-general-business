import React from 'react';
import { Avatar } from 'antd';
import Style from './web.module.less';
export default function render(props) {
    const { methods, data } = props;
    const { nickname, avatarUrl, name } = data;
    const defaultUrl = 'data:image/png;base64,UklGRoICAABXRUJQVlA4IHYCAADwKACdASosASwBPrVarU8nJiUiJJjIEOAWiWlu4XShG/NX+q91/WYL37Uns/lNhNG6y8oBCkjJGSMkZIyRkjJGSMkZIyRkjJGSMkZIyRkjJGR8IMX6z+YtjIoxEY3KVOOQSyXEuJcR/ZAAHyQcUpZRWfL4lxLiXBnkSU0B4NcCHWSK4CBdk6WS4PC/jULN2pAeRlwRqF2xCZ400cTnW2ogZi8OtcthRiMouvr2dYEgJARhbEb+09k94h/a5mFkC7J2To60i1IWmYHR5OLiXEuJcSAK9Xk4C8ve/Uq7iBoiHvSAkBH4KrcZKm3UErOOpxquA3X2PWjC2wI/Dz57QAZ5J2Tsl6p+Eiy4BhYvDwpoChtMjLgEdPjq37JfS+Rm/7niuhE0jzkyk7jDjACsogklFiMtpkZfbolR4QRN7J2TsnZOydk7J2TsnZOydk7J0YAA/v67qQMAOmxdZAbD1n8UzeBoApiFopfRVxPpEh3G4wAp0EwQD6kJbi6xm8OOhiuS4WeYZ8hxC45E4PZfT56WVnzaLLWW1i9XLyz05YJhxQ6iT5aOk5J1rNnENlAzf+i/0WpEd/edFMYu+q2U4pBjLEoLPE0DGVeHtS7zt4vTVCiXBfibW0mgqhbRQhDrr5ctACqSBsx+8f/HDobGN621bjYch19yGQegV6eUMGNu9bVQi+vQdZvTK4d7MtISka7dqmVYfuI3Z6nUBA/Nzg0ApEhQ+CAmDvSRrKCjxbJBYdc+MsQpTv0DdUkoDVa18rZrKyIeUT4pYRFJcnsT+OoAJGGIdRGn6A4NtB3woJnI/x3d+Rgibkn5GcX4oAfaVqkvAAAAAAA=';
    return (<div className={Style.header}>
            <Avatar shape="square" className={Style.avatar} src={avatarUrl || defaultUrl}/>

            <div className={Style.nickname}>{nickname || name}</div>
        </div>);
}
