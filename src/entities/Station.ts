import { String } from "oak-domain/lib/types/DataType";
import { EntityShape } from "oak-domain/lib/types/Entity";
import { Schema as Area } from "./Area";
import { EntityDesc } from 'oak-domain/lib/types/EntityDesc';

export interface Schema extends EntityShape {
	name: String<32>;
	area: Area;
}

const entityDesc: EntityDesc<Schema> = {
	locales: {
		zh_CN: {
			name: "站点",
			attr: {
				name: "站点名",
				area: "城市",
			},
		},
	}
};
