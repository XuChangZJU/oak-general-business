import { generateNewId } from 'oak-domain/lib/utils/uuid';
import { assert } from 'oak-domain/lib/utils/assert';
import { EntityDict } from '../../../oak-app-domain';
import { OpSchema as ExtraFile } from '../../../oak-app-domain/ExtraFile/Schema';
import { isEqual } from 'oak-domain/lib/utils/lodash';
import { EntityDict as BaseEntityDict } from 'oak-domain/lib/types/Entity';
import { ReactComponentProps } from 'oak-frontend-base';

type MethodsType = 'original' | 'url' | 'uploadLocalImg';
type RenderImgItem = { renderUrl: any, originUrl: string, id: number, isBridge: boolean };
export default OakComponent({
    entity: 'extraFile',
    isList: true,
    projection: {
        id: 1,
        tag1: 1,
        tag2: 1,
        origin: 1,
        bucket: 1,
        objectId: 1,
        filename: 1,
        extra1: 1,
        extension: 1,
        type: 1,
        entity: 1,
        entityId: 1,
        fileType: 1,
        sort: 1,
        isBridge: 1,
    },
    filters: [
        {
            filter() {
                const { tag1, tag2 } = this.props;
                const filter1 = {};
                if (tag1) {
                    Object.assign(filter1, { tag1 });
                }
                if (tag2) {
                    Object.assign(filter1, { tag2 });
                }
                return filter1;
            },
        },
    ],
    formData({ data: originalFiles, features }) {
        let file;
        const notDeleteFiles = originalFiles?.filter((ele) => !ele.$$deleteAt$$);
        if (this.props.tag1) {
            file = notDeleteFiles?.filter((ele) => ele?.tag1 === this.props.tag1)?.[0];
        }
        if (this.props.tag2) {
            file = notDeleteFiles?.filter((ele) => ele?.tag2 === this.props.tag2)?.[0];
        }
        return {
            file,
            src: features.extraFile.getUrl(file as ExtraFile),
            isBridge: file?.isBridge,
        };
    },
    data: {
        isModalOpen: false,
        isModalOpen1: false,
        renderImgs: [] as RenderImgItem[], // 读取的原文图片，在modal使用
        methodsType: '' as MethodsType,
        bridgeUrl: '', // 通过桥接方式获得的url
        selectedId: -1,
    },
    properties: {
        type: '',
        tag1: '',
        tag2: '',
        entity: '' as keyof EntityDict,
        entityId: '',
        imgUrls: [] as string[],
    },
    lifetimes: {
    },
    listeners: {
        async imgUrls(prev, next) {
            // 所以此处增加前后项imgUrls里都有值且不等的条件再去clean
            if (prev?.imgUrls.length && next?.imgUrls.length && !isEqual(prev.imgUrls, next.imgUrls)) {
                this.clean();
            }
        }
    },
    methods: {
        async chooseMethod(method: MethodsType) {
            switch (method) {
                case 'uploadLocalImg':
                    const fileInput = document.createElement('input');
                    const imgElement = document.getElementById('previewImg') as HTMLImageElement;
                    fileInput.type = 'file';
                    fileInput.accept = 'image/png, image/jpeg'
                    fileInput.style.display = 'none';
                    fileInput.addEventListener('change', (e) => {
                        if (!fileInput.files || fileInput.files.length === 0) {
                            return;
                        }
                        this.myUpdateItem(fileInput.files[0]);
                    });
                    fileInput.click();
                    this.setState({
                        methodsType: method
                    })
                    this.setSelectedId(-1);
                    break;
                case 'url':
                    this.setState({
                        isModalOpen: true,
                        methodsType: method
                    })
                    break;
                case 'original':
                    this.setState({
                        isModalOpen1: true,
                        methodsType: method
                    })
                    const { imgUrls } = this.props;
                    const { renderImgs } = this.state;
                    let renderImgs2: RenderImgItem[] = new Array(...renderImgs);
                    if (imgUrls && imgUrls.length) {
                        for (let i = 0; i < imgUrls.length; i++) {
                            if (renderImgs2[i] && renderImgs2[i].originUrl === imgUrls[i]) {
                                return;
                            }
                            else if (renderImgs2[i] && renderImgs2[i].originUrl !== imgUrls[i]) {
                                renderImgs2 = [];
                            }
                            let renderUrl: string;
                            const isWechatUrl = this.isWechatUrlFn(imgUrls[i]);
                            if (isWechatUrl) {
                                renderUrl = this.features.extraFile.getUrl({ isBridge: true, extra1: imgUrls[i] } as ExtraFile);
                            }
                            else {
                                renderUrl = imgUrls[i]
                            }
                            renderImgs2.push({
                                renderUrl,
                                originUrl: imgUrls[i],
                                id: i,
                                isBridge: isWechatUrl
                            });
                        }
                        this.setState({
                            renderImgs: renderImgs2,
                        })
                    }
                    break;
            }
        },
        closeModal() {
            this.setState({
                isModalOpen: false,
            })
        },
        closeModal1() {
            this.setState({
                isModalOpen1: false,
            });
        },

        createExtraFileData(file: File | string) {
            const { methodsType } = this.state;
            const { tag1, tag2, entity, entityId } = this.props;
            let extension = '';
            let filename = '';
            const applicationId = this.features.application.getApplicationId();

            const createData = {
                applicationId,
                extra1: file,
                entity,
                entityId,
                type: 'image',
                tag1,
                tag2,
                bucket: '',
                id: generateNewId(),
                objectId: generateNewId(), // 这个域用来标识唯一性
            } as EntityDict['extraFile']['CreateSingle']['data'];
            assert(entity, '必须传入entity');
            switch (methodsType) {
                case 'uploadLocalImg':
                    const { name, size, type } = file as File;
                    extension = name.substring(name.lastIndexOf('.') + 1);
                    filename = name.substring(0, name.lastIndexOf('.'));
                    Object.assign(createData, {
                        origin: 'qiniu',
                        extension,
                        filename,
                        size,
                        fileType: type,
                    });
                    break;
                case 'url':
                    Object.assign(createData, {
                        origin: 'unknown',
                        extension,
                        filename,
                        isBridge: this.isWechatUrlFn(file),
                    });
                    break;
                case 'original':
                    Object.assign(createData, {
                        origin: 'unknown',
                        extension,
                        filename,
                        isBridge: this.isWechatUrlFn(file),
                    });
                    break;
            }
            return createData;
        },

        async myAddItem(createData: EntityDict['extraFile']['CreateSingle']['data']) {
            // 目前只支持七牛上传
            const file = createData.extra1;
            const id = this.addItem(
                Object.assign(createData, {
                    extra1: null,
                    uploadState: 'uploading',
                })
            );
            this.features.extraFile2.addLocalFile(id, file as any);
        },
        async myUpdateItem(params: File | string) {
            const { file } = this.state;
            if (file) {
                this.removeItem(file.id);
            }
            if (!!params) {
                const createData = this.createExtraFileData(params);
                this.myAddItem(createData);
            }
        },
        onModalConfirm(value: string) {
            const reg = new RegExp(/(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/);
            if (!reg.test(value)) {
                return
            }
            this.myUpdateItem(value);
            this.setSelectedId(-1);
        },
        onModal1Confirm(value: number) {
            const { renderImgs } = this.state;
            const img = renderImgs.find((ele) => ele.id === value);
            this.myUpdateItem(img?.originUrl);
            this.closeModal1();
        },
        isWechatUrlFn(url: string) {
            return (url.startsWith('https://mmbiz.qpic.cn') || url.startsWith('http://mmbiz.qpic.cn'));
        },
        setSelectedId(id: number) {
            this.setState({
                selectedId: id
            });
        }
    }
}) as <ED2 extends EntityDict & BaseEntityDict, T2 extends keyof ED2>(
    props: ReactComponentProps<
        ED2,
        T2,
        true,
        {
            type: string,
            origin: string,
            tag1: string,
            tag2: string,
            entity: keyof ED2,
            entityId: string,
            imgUrls: string[],
        }
    >
) => React.ReactElement;
