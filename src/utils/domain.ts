import { Schema as Domain } from '../general-app-domain/Domain/Schema';

export function composeDomainUrl(domain: Domain, url?: string, props?: Record<string, string>) {
    const { port, protocol, apiPath, url: domainUrl } = domain;
    let Url = `${protocol}://${domainUrl}`;
    if (port) {
        Url += `:${port}`;
    }
    if (url) {
        Url += `/${url}`;
        if (props) {
            const k = Object.keys(props);
            if (k.length > 0) {
                Url += '?';
                for (const k2 of k) {
                    Url += `${k2}=${encodeURI(props[k2])}`;
                }
            }
        }
    }

    return Url;
}