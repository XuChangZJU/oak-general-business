import '@wangeditor/editor/dist/css/style.css';
import { EntityDict } from '../../../oak-app-domain';
import { WebComponentProps } from 'oak-frontend-base';
export default function Render(props: WebComponentProps<EntityDict, 'article', false, {
    editor: any;
    title?: string;
    author?: string;
    abstract?: string;
    content?: string;
    html?: string;
    origin?: string;
    contentTip: boolean;
}, {
    setHtml: (content: string) => void;
    setEditor: (editor: any) => void;
    confirm: () => void;
    preview: () => void;
    addExtraFile: (file: EntityDict['extraFile']['CreateSingle']['data']) => Promise<void>;
    uploadFile: (file: EntityDict['extraFile']['CreateSingle']['data']) => Promise<{
        bucket: string;
        url: string;
    }>;
    clearContentTip: () => void;
}>): import("react/jsx-runtime").JSX.Element;
