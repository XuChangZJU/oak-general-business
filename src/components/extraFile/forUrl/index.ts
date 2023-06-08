import { generateNewId } from 'oak-domain/lib/utils/uuid';
import assert from 'assert';
import { EntityDict } from '../../../general-app-domain';
import { OpSchema as ExtraFile } from '../../../general-app-domain/ExtraFile/Schema';
import { isEqual } from 'oak-domain/lib/utils/lodash';
import { EntityDict as BaseEntityDict } from 'oak-domain/lib/types/Entity';
import { ReactComponentProps } from 'oak-frontend-base/lib/types/Page';
type MethodsType = 'original' | 'url' | 'uploadLocalImg';
type ImgUrlsOrigin = 'wechat' | 'others'; // 原文链接来源
type RenderImgItem = { renderUrl: any, originUrl: string, id: number };
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
        if (this.props.tag1) {
            file = originalFiles?.filter((ele) => ele?.tag1 === this.props.tag1)?.[0];
        }
        if (this.props.tag2) {
            file = originalFiles?.filter((ele) => ele?.tag2 === this.props.tag2)?.[0];
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
        originImgLoading: false,
        renderImgUrl: '',
    },
    properties: {
        type: '',
        tag1: '',
        tag2: '',
        entity: '' as keyof EntityDict,
        entityId: '',
        imgUrls: [] as string[],
        imgUrlsOrigin: 'others' as ImgUrlsOrigin,
    },
    lifetimes: {
        // features.getBridgeUrl 中使用了URL.createObjectURL
        attached() {
            const { imgUrlsOrigin } = this.props;
            const { renderImgs } = this.state;
            if (imgUrlsOrigin === 'wechat' && renderImgs && renderImgs.length) {
                renderImgs.forEach((ele) => {
                    URL.revokeObjectURL(ele.renderUrl);
                })
            }
        }
    },
    listeners: {
        async src(prev, next) {
            if (prev !== next && !!this.state.src) {
                if(this.state.isBridge) {
                    try {
                        const url = await this.features.extraFile.getBridgeUrl(this.state.src);
                        this.setState({
                            renderImgUrl: url,
                        })
                    }
                    catch (err) {
                        this.setMessage({
                            content: '图片加载错误',
                            type: 'error'
                        })
                    }
                }
                else {
                    this.setState({
                        renderImgUrl: this.state.src,
                    })
                }
            }
        },
        async imgUrls(prev, next) {
            // 因为imgUrls是从请求来的， 它有可能比上边的src listener中的getBridgeUrl慢
            // 所以此处增加前后项imgUrls里都有值且不等的条件再去clean
            if(prev?.imgUrls.length && next?.imgUrls.length && !isEqual(prev.imgUrls, next.imgUrls)) {
                this.clean();
                this.setState({
                    renderImgUrl: '',
                })
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

                        // 创建一个 FileReader 对象
                        const reader = new FileReader();

                        // 当文件读取完成后，显示预览图像
                        reader.addEventListener("load", function () {
                            imgElement!.src = reader.result as string;
                            imgElement.style.display = 'block';
                        });
                        // 读取用户选择的文件
                        reader.readAsDataURL(fileInput.files[0]);
                        this.myUpdateItem(fileInput.files[0]);
                    });
                    fileInput.click();
                    this.setState({
                        methodsType: method
                    })
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
                    const { imgUrlsOrigin, imgUrls } = this.props;
                    const { renderImgs } = this.state;
                    let renderImgs2: RenderImgItem[] = new Array(...renderImgs);
                    if (imgUrls && imgUrls.length) {
                        this.setState({
                            originImgLoading: true,
                        })
                        for (let i = 0; i < imgUrls.length; i++) {
                            if (renderImgs2[i] && renderImgs2[i].originUrl === imgUrls[i]) {
                                this.setState({
                                    originImgLoading: false,
                                })
                                return;
                            }
                            else if (renderImgs2[i] && renderImgs2[i].originUrl !== imgUrls[i]) {
                                if (imgUrlsOrigin === 'wechat') {
                                    URL.revokeObjectURL(renderImgs2[i].renderUrl);
                                }
                                renderImgs2 = [];
                            }
                            let renderUrl: string;
                            if (imgUrlsOrigin === 'wechat') {
                                renderUrl = await this.features.extraFile.getBridgeUrl(imgUrls[i]);
                            }
                            else {
                                renderUrl = imgUrls[i]
                            }
                            renderImgs2.push({
                                renderUrl,
                                originUrl: imgUrls[i],
                                id: i,
                            });
                        }
                        this.setState({
                            renderImgs: renderImgs2,
                            originImgLoading: false,
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

        createExtraFileData(params: File | string) {
            const { methodsType } = this.state;
            const { imgUrlsOrigin } = this.props;
            const { tag1, tag2, entity, entityId } = this.props;
            let extension = '';
            let filename = '';
            const createData = {
                extra1: params,
                entity,
                entityId,
                type: 'image',
                tag1,
                tag2,
                objectId: generateNewId(),
                bucket: '',
                id: generateNewId(),
            } as EntityDict['extraFile']['CreateSingle']['data'];
            assert(entity, '必须传入entity');
            switch (methodsType) {
                case 'uploadLocalImg':
                    const { name, size, type } = params as File;
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
                        isBridge: imgUrlsOrigin === 'wechat'
                    });
                    break;
                case 'original':
                    Object.assign(createData, {
                        origin: 'unknown',
                        extension,
                        filename,
                        isBridge: imgUrlsOrigin === 'wechat',
                    })
                    break;
            }
            return createData;
        },

        async myAddItem(createData: EntityDict['extraFile']['CreateSingle']['data']) {
             // 目前只支持七牛上传
            const { methodsType } = this.state;
            this.addItem(createData, async () => {
                if (createData.bucket) {
                    // 说明本函数已经执行过了
                    return;
                }
                if (methodsType === 'uploadLocalImg') {
                    const { bucket } = await this.features.extraFile.upload(
                        createData
                    );
                    Object.assign(createData, {
                        bucket,
                        extra1: null,
                    });
                }
            });
        },
        async myUpdateItem(params: File | string) {
            const { file } = this.state;
            if (file) {
                this.removeItem(file.id);
            }
            if(!!params) {
                const createData = this.createExtraFileData(params);
                this.myAddItem(createData);
            }
            if(!params) {
                this.setState({
                    renderImgUrl: '',
                })
            }
        },
        onModalConfirm(value: string){
            const reg = new RegExp(/(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/);
            if (!reg.test(value)) {
                return
            }
            this.myUpdateItem(value);
            const imgElement = document.getElementById('previewImg') as HTMLImageElement;
            imgElement!.src = value;
            imgElement.style.display = 'block';
        },
        onModal1Confirm(value: number) {
            const { renderImgs } = this.state;
            const img = renderImgs.find((ele) => ele.id === value);
            this.myUpdateItem(img?.originUrl);
            // const imgElement = document.getElementById('previewImg') as HTMLImageElement;
            // imgElement!.src = img?.renderUrl || '';
            // imgElement.style.display = 'block';
            this.closeModal1();
        },
    },
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
            imgUrlsOrigin: ImgUrlsOrigin,
        }
    >
) => React.ReactElement;
