import { getApplication as getApplicationDev } from './application.dev';
import { getApplication as getApplicationProd } from './application.prod';

const getApplication = process.env.NODE_ENV === 'development' ? getApplicationDev : getApplicationProd

export {
    getApplication,
};

