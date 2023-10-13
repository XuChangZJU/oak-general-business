export type MediaType = 'image' | 'voice' | 'video' | 'thumb';

export type MediaVideoDescription = {
    title: string;
    introduction: string;
}

export type MaterialType = 'image' | 'video' | 'voice' | 'news'; //素材的类型，图片（image）、视频（video）、语音 （voice）、图文（news）

export type ReplyType = 'text' | 'image' | 'video' | 'voice';

export type Tag = {
    id: number,
    name: string,
    count: number
}

export type User = {
    total: number,
    count: number,
    data: {
        openid: string[]
    },
    next_openid: string,
}

