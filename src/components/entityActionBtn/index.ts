import React from 'react'
import { generateNewId } from 'oak-domain/lib/utils/uuid';
import {
    OakException,
    OakUnloggedInException,
} from 'oak-domain/lib/types';
export default OakComponent({
    entity() {
        const { entity } = this.props;
        return entity;
    },
    isList: false,
    actions() {
        const { actions } = this.props;
        return actions
    },
    methods: {
    },
});
