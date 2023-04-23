import { EntityShape } from "oak-domain/lib/types/Entity";
import { Schema as Subway } from "./Subway";
import { Schema as Station } from "./Station";
export interface Schema extends EntityShape {
    station: Station;
    subway: Subway;
}
