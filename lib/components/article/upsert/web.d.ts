import "@wangeditor/editor/dist/css/style.css";
import { EntityDict } from "./../../../general-app-domain";
import { WebComponentProps } from "oak-frontend-base";
export default function Render(props: WebComponentProps<EntityDict, "article", false, {
    id: string;
    name: string;
    editor: any;
    abstract?: string;
    content?: string;
    html?: string;
    origin?: string;
    contentTip: boolean;
    origin1: string;
    articleMenuId: string;
    oakId: string;
    changeIsEdit: () => void;
}, {
    setHtml: (content: string) => void;
    setEditor: (editor: any) => void;
    check: () => void;
    preview: () => void;
    addExtraFile: (file: EntityDict["extraFile"]["CreateSingle"]["data"]) => Promise<void>;
    uploadFile: (file: EntityDict["extraFile"]["CreateSingle"]["data"]) => Promise<{
        bucket: string;
        url: string;
    }>;
    clearContentTip: () => void;
    gotoPreview: (content?: string, title?: string) => void;
}>): JSX.Element;
