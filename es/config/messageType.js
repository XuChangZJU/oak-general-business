import { uniq } from 'oak-domain/lib/utils/lodash';
let messageTypes = [];
export default messageTypes;
export function registMessageType(messageType) {
    let messageTypes2 = messageTypes.concat(messageType);
    messageTypes = uniq(messageTypes2);
}
