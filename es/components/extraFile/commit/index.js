"use strict";
// import assert from 'assert';
// import { ButtonProps } from 'antd';
// import { ButtonProps as MobileButtonProps } from 'antd-mobile';
// import { EntityDict } from '../../../oak-app-domain';
// import { FileState } from '../../../features/extraFile2';
// export default OakComponent({
//     formData({ features }) {
//         const ids: string[] = this.getEfIds();
//         const states = ids.map(
//             id => features.extraFile2.getFileState(id)
//         );
//         let state: FileState = 'uploaded';
//         states.forEach(
//             (ele) => {
//                 if (ele) {
//                     if (['failed', 'local'].includes(ele.state)) {
//                         state = ele.state;
//                     }
//                     else if (ele.state === 'uploading' && state === 'uploaded') {
//                         state = 'uploading';
//                     }
//                 }
//             }
//         );
//         return {
//             state,
//         };
//     },
//     properties: {
//         efPaths: [] as string[],
//         size: 'middle' as ButtonProps['size'] | MobileButtonProps['size'],
//         block: false as ButtonProps['block'] | MobileButtonProps['block'],
//         type: 'primary' as ButtonProps['type'] | MobileButtonProps['type'],
//         executeText: '',
//     },
//     methods: {
//         getEfIds() {
//             const { efPaths } = this.props;
//             const { oakFullpath } = this.state;
//             assert(efPaths);
//             if (oakFullpath) {
//                 const ids = efPaths.map(
//                     (path) => {
//                         const path2 = path ? `${oakFullpath}.path` : oakFullpath;
//                         const data = this.features.runningTree.getFreshValue(path2);
//                         if (data) {
//                             return (data as EntityDict['extraFile']['OpSchema'][]).map(
//                                 ele => ele.id
//                             );
//                         }
//                     }
//                 ).flat().filter(
//                     ele => !!ele
//                 ) as string[];
//                 return ids;
//             }
//             return [];
//         },
//         upload() {
//         }
//     }
// });
