import area2 from './area.json';
import area_debug from './area-debug.json';

const area = process.env.NODE_ENV === 'production' ? area2 : area_debug;
export {
    area,
};