export function composeDomainUrl(domain, url, props) {
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
export function composeServerUrl(domain, url, props) {
    const { port, protocol, apiPath, url: domainUrl } = domain;
    let Url = `${protocol}://${domainUrl}`;
    if (port) {
        Url += `:${port}`;
    }
    if (apiPath) {
        Url += apiPath.startsWith('/') ? apiPath : `/${apiPath}`;
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
