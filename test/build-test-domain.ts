import { unset } from 'lodash';
import { buildSchema, analyzeEntities } from 'oak-domain/src/compiler/schemalBuilder';

analyzeEntities(`${__dirname}/../node_modules/oak-domain/src/entities`);
analyzeEntities(`${__dirname}/entities`);
buildSchema(`${__dirname}/app-domain`);