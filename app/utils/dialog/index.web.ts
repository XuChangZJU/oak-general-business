//@ts-ignore
const { getBrowserWidth } = require('oak-frontend-base/lib/platforms/web/utils/width');

if (getBrowserWidth() === 'xs') {
    const Dialog = require('tdesign-mobile-react').Dialog;
    module.exports = Dialog;
    module.exports.default = Dialog;
} else {
    const DialogPlugin = require('tdesign-react').DialogPlugin;
    module.exports = DialogPlugin;
    module.exports.default = DialogPlugin;
}