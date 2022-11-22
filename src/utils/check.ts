import { RuntimeCxt } from "../checkers/RuntimeCxt";
import { EntityDict } from "../general-app-domain";

async function checkIsRoot<ED extends EntityDict, Cxt extends RuntimeCxt>(context: Cxt) {
    return context.isRoot();
}
