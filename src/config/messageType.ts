import { uniq } from 'oak-domain/lib/utils/lodash';

let messageTypes = [] as string[];

export default messageTypes;

export function registMessageType(messageType: string[]) {
    let messageTypes2 = messageTypes.concat(messageType);
    messageTypes = uniq(messageTypes2);
}