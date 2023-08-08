import { WebComponentProps } from "oak-frontend-base";
import { EntityDict } from "../../../general-app-domain";
declare type MethodsType = 'original' | 'url' | 'uploadLocalImg';
export default function render(props: WebComponentProps<EntityDict, "extraFile", true, {
    src: string;
    bridgeUrl: string;
    isModalOpen: boolean;
    isModalOpen1: boolean;
    renderImgs: {
        renderUrl: string;
        originUrl: string;
        id: number;
    }[];
    selectedId: number;
}, {
    onModalConfirm: (value: string) => void;
    chooseMethod: (method: MethodsType) => void;
    closeModal1: () => void;
    closeModal: () => void;
    onModal1Confirm: (value: number) => void;
    setSelectedId: (id: number) => void;
}>): JSX.Element;
export {};
