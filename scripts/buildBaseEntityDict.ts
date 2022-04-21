import { unset } from 'lodash';
import { buildSchema, analyzeEntities } from 'oak-domain/src/compiler/schemalBuilder';

process.env.NODE_ENV = 'development';
process.env.COMPLING_BASE_ENTITY_DICT = 'yes';
analyzeEntities('src/entities');
buildSchema('src/base-app-domain/');
unset(process.env, 'COMPLING_BASE_ENTITY_DICT');
