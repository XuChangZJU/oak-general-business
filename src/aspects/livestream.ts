import { RuntimeContext } from '../context/RuntimeContext';
import { EntityDict } from '../general-app-domain';
import { SystemConfig } from '../general-app-domain/System/Schema';
import { Schema as Livestream } from '../general-app-domain/Livestream/Schema';
import QiniuLive from '../utils/externalUpload/qiniu_live';
import { hmacSha1, base64ToUrlSafe } from '../utils/sign';
import { Md5 } from 'ts-md5';

async function getQiniuUploadInfo<ED extends EntityDict, Cxt extends RuntimeContext<ED>>(
    context: Cxt
) {
    // 请求鉴权
    const { rowStore } = context;
    const application = await context.getApplication();
    const { type, config, systemId } = application!;
    const origin = "qiniu";
    const { result: [system] } = await rowStore.select('system', {
        data: {
            id: 1,
            config: 1
        },
        filter: {
            id: systemId
        }
    }, context, {
        dontCollect: true,
    });
    try {
        const { config: systemConfig } = system as { config: SystemConfig };
        const originConfig = systemConfig.Cos![
            origin as keyof SystemConfig['Cos']
        ];
        return originConfig;
    } catch (err) {
        throw err;
    }
}

async function getQiniuToken(
    config: { liveHost:string, accessKey: string, secretKey:string, hub:string },
    params: { method: 'GET' | 'POST' | 'PUT' | 'DELETE', path: string, rawQuery?: string, contentType?: string, bodyStr?: string, },
): Promise<{ token: string }> {
    // 获取请求信息
    const { method, path, rawQuery, contentType, bodyStr } = params;
    const { liveHost, accessKey, secretKey } = config;

    // 请求鉴权
    try{
        const instance = new QiniuLive({
            accessKey,
            secretKey,
            host: liveHost,
            method,
            path,
            rawQuery,
            contentType,
            bodyStr,
        })
        const token = instance.getToken();
        // 拿到鉴权Token
        return {
            token,
        };
    } catch (err) {
        throw err;
    }
}

/**
 * 创建直播流并生成推拉流地址
 * @param streamTitle 直播流名称
 * @param expireAt 推流过期时间
 * @param context context
 * @returns Livestream 对象
 */
export async function getLivestream<ED extends EntityDict, Cxt extends RuntimeContext<ED>>(
    params: {
        streamTitle: string,
        expireAt: number,
    },
    context: Cxt
): Promise<Pick<Livestream,
    | 'streamTitle'
    | 'hub'
    | 'rtmpPushUrl'
    | 'rtmpPlayUrl'
    | 'pcPushUrl'
    | 'streamKey'
    | 'expireAt'>
> {
    const { streamTitle, expireAt } = params;
    // 获取七牛直播云信息
    const config = await getQiniuUploadInfo<ED, Cxt>(context);
    const { hub } = config;
    // 七牛创建直播流接口路径
    const path = `/v2/hubs/${hub}/streams`;
    // 如果用户没给streamTitle，那么随机生成一个
    let key:string = streamTitle;
    if (!key) {
        key = `class${new Date().getTime()}`;
    }
    const bodyStr = JSON.stringify({
        key,
    })
    const contentType = 'application/json';
    const { token } = await getQiniuToken(config, {
        method: 'POST',
        path,
        contentType,
        bodyStr,
    });

    const url = `https://pili.qiniuapi.com/v2/hubs/${hub}/streams`;
   fetch(url, {
        method: 'POST',
        headers: {
            Authorization: token,
           'Content-Type': contentType,
       },
        body: bodyStr,
        mode: 'no-cors',
   })
       .then((res) => {
           console.log(res.json());
       }).then((res) => {
        console.log(res);
       }).catch((e) => {
        console.log(e);
    })
    const obj = await getStreamObj(config, streamTitle, expireAt);
    return obj;
}





// 获取推拉流地址
/**
 * 直播流已存在的情况下，获取推拉流地址
 * @param streamTitle 直播流名称
 * @param expireAt 推流过期时间
 * @param context context
 * @returns livestream对象
 */
export async function getLivestream2<ED extends EntityDict, Cxt extends RuntimeContext<ED>>(
    params: {
        streamTitle: string,
        expireAt: number,
    },
    context: Cxt
): Promise<Pick<Livestream,
    | 'streamTitle'
    | 'hub'
    | 'rtmpPushUrl'
    | 'rtmpPlayUrl'
    | 'pcPushUrl'
    | 'streamKey'
    | 'expireAt'>
    > {
    const {streamTitle, expireAt } = params;
    const config = await getQiniuUploadInfo<ED, Cxt>(context);
    const livestream = await getStreamObj(config, streamTitle, expireAt);
    return livestream;
}

async function getStreamObj(
    config: {
        publishDomain: string,
        playDomain: string,
        hub: string,
        publishKey: string,
        playKey: string,
    },
    streamTitle: string,
    expireAt: number
)
    : Promise<Pick<Livestream,
        |'streamTitle'
        |'hub'
        |'rtmpPushUrl'
        |'rtmpPlayUrl'
        |'pcPushUrl'
        |'streamKey'
        | 'expireAt'>
        >
    {
    // 生成推流地址
    const { hub, publishDomain, playDomain, publishKey, playKey } = config;
    const signStr = `/${hub}/${streamTitle}?expire=${expireAt}`;
    const sourcePath = `/${hub}/${streamTitle}`;
    const token = base64ToUrlSafe(hmacSha1(signStr, publishKey));
    const rtmpPushUrl = `rtmp://${publishDomain}${signStr}&token=${token}`
    // 生成播放地址
    const t = expireAt.toString(16).toLowerCase();
    const playSign = Md5.hashStr(playKey + sourcePath + t).toString().toLowerCase();
    const rtmpPlayUrl = `https://${playDomain}${sourcePath}.m3u8?sign=${playSign}&t=${t}`;
    // obs推流需要的地址和串流密钥
    const pcPushUrl = `rtmp://${publishDomain}/${hub}/`;
    const streamKey = `${streamTitle}?expire=${expireAt}&token=${token}`
    return {
        streamTitle,
        hub,
        rtmpPushUrl,
        rtmpPlayUrl,
        pcPushUrl,
        streamKey,
        expireAt,
    };
}

// 生成直播回放
export async function getPlayBackUrl<ED extends EntityDict, Cxt extends RuntimeContext<ED>>(
    params: {
        streamTitle: string,
        start: number,
        end: number,
    },
    context: Cxt
) {
    const { streamTitle, start, end } = params;
    // 获取七牛直播云信息
    const config = await getQiniuUploadInfo<ED, Cxt>(context);
    const { hub, playBackDomain } = config;
    // 七牛创建直播流接口路径
    const encodeStreamTitle = base64ToUrlSafe(streamTitle);
    const path = `/v2/hubs/${hub}/streams/${encodeStreamTitle}/saveas`;
    const bodyStr = JSON.stringify({
        fname: streamTitle,
        start,
        end,
    })
    const contentType = 'application/json';
    const { token } = await getQiniuToken(config, {
        method: 'POST',
        path,
        contentType,
        bodyStr,
    });

    const url = `https://pili.qiniuapi.com${path}`;
    fetch(url, {
        method: 'POST',
        headers: {
            Authorization: token,
            'Content-Type': contentType,
        },
        body: bodyStr,
        mode: 'no-cors',
    })
        .then((res) => {
            console.log(res.json());
        }).then((res) => {
            console.log(res);
        }).catch((e) => {
            console.log(e);
        })
    return `https://${playBackDomain}/${streamTitle}.m3u8`;
}