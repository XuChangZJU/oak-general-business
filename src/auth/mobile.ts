import { AuthDef } from 'oak-domain/lib/types/Auth';
import { EntityDict } from '../general-app-domain';

const userAuth = {
    cascadePath: '',
}

const authDef: AuthDef<EntityDict, 'mobile'> = {
    actionAuth: {
        create: [userAuth],
    }
};

export default authDef;