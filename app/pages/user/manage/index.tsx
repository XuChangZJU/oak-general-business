import * as React from 'react';
import { Fab } from 'tdesign-mobile-react';
import { Icon } from 'tdesign-icons-react';

import UserCell from '../../../components/user/cell';

export default function render() {
    return (
        <div style={{ height: '100vh' }}>
            {this.state.userData?.map((ele, index) => {
                return (
                    <UserCell
                        key={index}
                        oak:path={index.toString()}
                        oakId={ele.id}
                        click={() => this.onCellClicked()}
                    />
                );
            })}

            <Fab
                style={{
                    bottom: 50,
                    right: 16,
                }}
                buttonProps={{
                    theme: 'primary',
                }}
                onClick={(event) => {
                    this.goNewUser();
                }}
                icon={<Icon name="add" />}
            ></Fab>
        </div>
    );
}