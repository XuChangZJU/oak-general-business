export default class QiniuLiveInstance {
    accessKey: string;
    secretKey: string;
    host: string;
    method: 'GET' | 'POST' | 'PUT' | 'DELETE';
    path: string;
    rawQuery?: string;
    contentType?: string;
    contentLength?: string;
    bodyStr?: string;
    constructor(config: {
        accessKey: string;
        secretKey: string;
        host: string;
        method: 'GET' | 'POST' | 'PUT' | 'DELETE';
        path: string;
        rawQuery?: string;
        contentType?: string;
        bodyStr?: string;
        contentLength?: string;
    });
    getToken(): string;
}
