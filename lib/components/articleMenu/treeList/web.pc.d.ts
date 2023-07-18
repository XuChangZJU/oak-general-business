/// <reference types="react" />
import { WebComponentProps } from "oak-frontend-base";
import { EntityDict } from "../../../general-app-domain";
export default function Render(props: WebComponentProps<EntityDict, 'articleMenu', true, {
    rows: EntityDict['articleMenu']['OpSchema'][];
    parentId?: string;
}, {
    createOne: (name: string) => Promise<void>;
}>): JSX.Element | null;
