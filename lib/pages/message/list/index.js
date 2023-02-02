"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = OakComponent({
    entity: 'message',
    isList: true,
    projection: {
        id: 1,
        $$createAt$$: 1,
        type: 1,
        title: 1,
        content: 1,
        visitState: 1,
        userId: 1,
        user: {
            id: 1,
            name: 1,
        },
        params: 1,
        props: 1,
    },
    filters: [
        {
            filter: function () {
                var userId = this.features.token.getUserId(true);
                /* const application = features.application.getApplication();
                const { systemId } = application; */
                if (userId) {
                    return {
                        userId: userId,
                        // systemId,
                        // visitState: 'unvisited',
                    };
                }
                else {
                    return {
                        $$createAt$$: 123,
                    };
                }
            },
        },
    ],
    sorters: [
        {
            sorter: function () {
                return {
                    $attr: {
                        $$createAt$$: 1,
                    },
                    $direction: 'desc',
                };
            },
        },
    ],
    formData: function (_a) {
        var messages = _a.data, features = _a.features, props = _a.props;
        var pagination = this.getPagination();
        return {
            messages: messages,
            pagination: pagination,
        };
    },
    lifetimes: {
        attached: function () {
            var _this = this;
            this.subscribed.push(this.features.token.subscribe(function () { return _this.reRender(); }));
        }
    },
    methods: {
        goDetailById: function (id) {
            this.navigateTo({
                url: "/message/detail",
                oakId: id,
            });
        },
    },
});
