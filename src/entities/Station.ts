import { String } from "oak-domain/lib/types/DataType";
import { EntityShape } from "oak-domain/lib/types/Entity";
import { LocaleDef } from "oak-domain/lib/types/Locale";
import { Schema as Area } from "./Area";

export interface Schema extends EntityShape {
  name: String<32>;
  area: Area;
}

const locale: LocaleDef<Schema, "", "", {}> = {
  zh_CN: {
    name: "站点",
    attr: {
      name: "站点名",
      area: "城市",
    },
  },
};
