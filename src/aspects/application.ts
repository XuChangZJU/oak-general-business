import { EntityDict } from "../general-app-domain";
import { AppType } from "../general-app-domain/Application/Schema";
import { BackendRuntimeContext } from "../context/BackendRuntimeContext";

export async function getApplication<
    ED extends EntityDict,
    Cxt extends BackendRuntimeContext<ED>
>(
    params: {
        type: AppType;
        domain: string;
    },
    context: Cxt
) {
    const { type, domain } = params;
    const url = context.getHeader('host');
    console.log('url is', url);

    const [application] = await context.select(
        'application',
        {
            data: {
                id: 1,
                name: 1,
                config: 1,
                type: 1,
                systemId: 1,
                style: 1,
                system: {
                    id: 1,
                    name: 1,
                    config: 1,
                    platformId: 1,
                    style: 1,
                    folder: 1,
                    platform: {
                        id: 1,
                        config: 1,
                        style: 1,
                    },
                }
            },
            filter: {
                type,
                system: {
                    id: {
                        $in: {
                            entity: 'domain',
                            data: {
                                systemId: 1,
                            },
                            filter: {
                                url: domain,
                            }
                        }
                    }
                },
            },
        },
        {}
    );

    return application.id as string;
}