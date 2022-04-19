// index.ts
// 获取应用实例
import { OakComponent } from '../../../../../typings/polyfill';

OakComponent({
    entity: 'area',
    formData: ([area]) => ({
        name: area?.name!,
    }),
}, {});