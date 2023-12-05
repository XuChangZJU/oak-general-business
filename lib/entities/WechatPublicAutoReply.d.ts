import { EntityShape } from 'oak-domain/lib/types/Entity';
import { Schema as Application } from './Application';
type content = {
    text?: string;
    mediaId?: string;
    title?: string;
    description?: string;
};
export interface Schema extends EntityShape {
    content: content;
    application: Application;
    type: 'text' | 'image' | 'video' | 'voice';
    event: 'subscribe' | 'unsubscribe' | 'keyword' | 'auto';
}
export {};
