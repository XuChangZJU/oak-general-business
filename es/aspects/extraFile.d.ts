export declare function getInfoByUrl(params: {
    url: string;
}): Promise<{
    title: string;
    publishDate: number | undefined;
    imageList: string[];
}>;
