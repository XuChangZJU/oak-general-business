import { RuntimeCxt } from "../types/RuntimeCxt";
import { EntityDict } from "../oak-app-domain";

async function checkIsRoot<ED extends EntityDict, Cxt extends RuntimeCxt>(context: Cxt) {
    return context.isRoot();
}
