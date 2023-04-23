import { String } from "oak-domain/lib/types/DataType";
import { EntityShape } from "oak-domain/lib/types/Entity";
import { Schema as Area } from "./Area";
export interface Schema extends EntityShape {
    name: String<32>;
    area: Area;
}
