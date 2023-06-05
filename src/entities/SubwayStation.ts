import { String } from "oak-domain/lib/types/DataType";
import { EntityShape } from "oak-domain/lib/types/Entity";
import { Schema as Subway } from "./Subway";
import { Schema as Station } from "./Station";
import { EntityDesc } from 'oak-domain/lib/types/EntityDesc';

export interface Schema extends EntityShape {
	station: Station;
	subway: Subway;
}

const entityDesc: EntityDesc<Schema> = {
	locales: {
		zh_CN: {
			name: "地铁站点连接表",
			attr: {
				station: "站点",
				subway: "地铁线",
			},
		},
	}
};
