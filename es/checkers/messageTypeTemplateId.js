import assert from "assert";
import { checkAttributesNotNull } from "oak-domain/lib/utils/validator";
const checkers = [
    {
        type: 'data',
        action: 'create',
        entity: 'messageTypeTemplateId',
        checker: (data, context) => {
            assert(!(data instanceof Array));
            checkAttributesNotNull('messageTypeTemplateId', data, ['type', 'templateId', 'applicationId']);
        }
    }
];
export default checkers;
