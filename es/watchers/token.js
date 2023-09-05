const watchers = [
    {
        name: '使定期禁用的token被禁用',
        entity: 'token',
        filter() {
            const now = Date.now();
            return {
                disablesAt: {
                    $lt: now,
                },
                ableState: 'enabled',
            };
        },
        action: 'disable',
        actionData: {},
    },
];
export default watchers;
