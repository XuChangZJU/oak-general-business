import { unset } from 'oak-domain/lib/utils/lodash';
import { buildSchema, analyzeEntities } from 'oak-domain/lib/compiler/schemalBuilder';

process.env.NODE_ENV = 'development';
process.env.COMPLING_AS_LIB = 'yes';
analyzeEntities('node_modules/oak-domain/src/entities', 'oak-domain/lib/entities');
analyzeEntities('src/entities');
buildSchema('src/general-app-domain/');
unset(process.env, 'COMPLING_AS_LIB');
