//@ts-ignore
const { getBrowserWidth } = require('oak-frontend-base/lib/platforms/web/utils/width');

if (getBrowserWidth() === 'xs') {
    const Message = require('tdesign-mobile-react').Message;
    module.exports = Message;
    module.exports.default = Message;
} else {
    const MessagePlugin = require('tdesign-react').MessagePlugin;
    module.exports = MessagePlugin;
    module.exports.default = MessagePlugin;
}
