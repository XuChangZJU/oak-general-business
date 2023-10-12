export type MediaType = 'image' | 'voice' | 'video' | 'thumb';
export type MediaVideoDescription = {
    title: string;
    introduction: string;
};
export type MenuType = 'image' | 'video' | 'voice' | 'news';
export type ReplyType = 'text' | 'image' | 'video' | 'voice';
export type Tag = {
    id: number;
    name: string;
    count: number;
};
export type User = {
    total: number;
    count: number;
    data: {
        openid: string[];
    };
    next_openid: string;
};
