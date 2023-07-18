/// <reference types="react" />
import { WebComponentProps } from "oak-frontend-base";
import { EntityDict } from "../../../general-app-domain";
export default function Render(props: WebComponentProps<EntityDict, 'articleMenu', true, {
    rows: EntityDict['article']['OpSchema'][];
}, {
    createOne: () => Promise<void>;
}>): JSX.Element | null;
