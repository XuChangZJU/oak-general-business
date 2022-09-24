import { getApplication as getApplicationDev } from './application.dev';
import { getApplication as getApplicationProd } from './application.prod';
declare const getApplication: typeof getApplicationDev | typeof getApplicationProd;
export { getApplication, };
