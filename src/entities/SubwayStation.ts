import { String } from "oak-domain/lib/types/DataType";
import { EntityShape } from "oak-domain/lib/types/Entity";
import { LocaleDef } from "oak-domain/lib/types/Locale";
import { Schema as Subway } from "./Subway";
import { Schema as Station } from "./Station";

export interface Schema extends EntityShape {
  station: Station;
  subway: Subway;
}

const locale: LocaleDef<Schema, "", "", {}> = {
  zh_CN: {
    name: "地铁站点连接表",
    attr: {
      station: "站点",
      subway: "地铁线",
    },
  },
};
