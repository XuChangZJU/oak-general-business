import FingerprintJS from '@fingerprintjs/fingerprintjs';
import { WebEnv } from 'general-app-domain/Token/Schema';
import { assign, pick } from 'lodash';

/**
 * fingerprintJs当中的一些敏感项
 * @returns 
 */
export async function getEnv() {
    const fp = await FingerprintJS.load();
    const result = await fp.get();

    const { visitorId, components } = result;
    return assign(
        pick(components, [
            'platform',
            'timezone',
            'vendor',
            'vendorFlavors'
        ]), {
        type: 'web',
        visitorId,
    }) as any;
}
