import { generateNewId } from 'oak-domain/lib/utils/uuid';
import { assert } from 'oak-domain/lib/utils/assert';
import { isEqual } from 'oak-domain/lib/utils/lodash';
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
            src: features.extraFile.getUrl(file),
            isBridge: file?.isBridge,
        };
    },
    data: {
        isModalOpen: false,
        isModalOpen1: false,
        renderImgs: [],
        methodsType: '',
        bridgeUrl: '',
        selectedId: -1,
    },
    properties: {
        type: '',
        tag1: '',
        tag2: '',
        entity: '',
        entityId: '',
        imgUrls: [],
    },
    lifetimes: {},
    listeners: {
        async imgUrls(prev, next) {
            // 所以此处增加前后项imgUrls里都有值且不等的条件再去clean
            if (prev?.imgUrls.length && next?.imgUrls.length && !isEqual(prev.imgUrls, next.imgUrls)) {
                this.clean();
            }
        }
    },
    methods: {
        async chooseMethod(method) {
            switch (method) {
                case 'uploadLocalImg':
                    const fileInput = document.createElement('input');
                    const imgElement = document.getElementById('previewImg');
                    fileInput.type = 'file';
                    fileInput.accept = 'image/png, image/jpeg';
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
                    });
                    this.setSelectedId(-1);
                    break;
                case 'url':
                    this.setState({
                        isModalOpen: true,
                        methodsType: method
                    });
                    break;
                case 'original':
                    this.setState({
                        isModalOpen1: true,
                        methodsType: method
                    });
                    const { imgUrls } = this.props;
                    const { renderImgs } = this.state;
                    let renderImgs2 = new Array(...renderImgs);
                    if (imgUrls && imgUrls.length) {
                        for (let i = 0; i < imgUrls.length; i++) {
                            if (renderImgs2[i] && renderImgs2[i].originUrl === imgUrls[i]) {
                                return;
                            }
                            else if (renderImgs2[i] && renderImgs2[i].originUrl !== imgUrls[i]) {
                                renderImgs2 = [];
                            }
                            let renderUrl;
                            const isWechatUrl = this.isWechatUrlFn(imgUrls[i]);
                            if (isWechatUrl) {
                                renderUrl = this.features.extraFile.getUrl({ isBridge: true, extra1: imgUrls[i] });
                            }
                            else {
                                renderUrl = imgUrls[i];
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
                        });
                    }
                    break;
            }
        },
        closeModal() {
            this.setState({
                isModalOpen: false,
            });
        },
        closeModal1() {
            this.setState({
                isModalOpen1: false,
            });
        },
        createExtraFileData(file) {
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
            };
            assert(entity, '必须传入entity');
            switch (methodsType) {
                case 'uploadLocalImg':
                    const { name, size, type } = file;
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
        async myAddItem(createData) {
            // 目前只支持七牛上传
            if (createData.origin === 'qiniu') {
                const file = createData.extra1;
                const id = this.addItem(Object.assign(createData, {
                    extra1: null,
                    uploadState: 'uploading',
                }));
                this.features.extraFile.addLocalFile(id, file);
            }
            else {
                this.addItem(createData);
            }
        },
        async myUpdateItem(params) {
            const { file } = this.state;
            if (file) {
                this.removeItem(file.id);
            }
            if (!!params) {
                const createData = this.createExtraFileData(params);
                this.myAddItem(createData);
            }
        },
        onModalConfirm(value) {
            const reg = new RegExp(/(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/);
            if (!reg.test(value)) {
                return;
            }
            this.myUpdateItem(value);
            this.setSelectedId(-1);
        },
        onModal1Confirm(value) {
            const { renderImgs } = this.state;
            const img = renderImgs.find((ele) => ele.id === value);
            this.myUpdateItem(img?.originUrl);
            this.closeModal1();
        },
        isWechatUrlFn(url) {
            return (url.startsWith('https://mmbiz.qpic.cn') || url.startsWith('http://mmbiz.qpic.cn'));
        },
        setSelectedId(id) {
            this.setState({
                selectedId: id
            });
        }
    }
});
