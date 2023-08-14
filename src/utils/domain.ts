import { Schema as Domain } from '../oak-app-domain/Domain/Schema';

export function composeDomainUrl(domain: Domain, url?: string, props?: Record<string, string>) {
    const { port, protocol, apiPath, url: domainUrl } = domain;
    let Url = `${protocol}://${domainUrl}`;
    if (port) {
        Url += `:${port}`;
    }
    if (url) {
        Url += url.startsWith('/') ? url : `/${url}`;
        if (props) {
            const k = Object.keys(props);
            if (k.length > 0) {
                for (const k2 of k) {
                    Url += Url.includes('?') ? '&' : '?';
                    Url += `${k2}=${encodeURI(props[k2])}`;
                }
            }
        }
    }

    return Url;
}