"use strict";
//@ts-ignore
var getBrowserWidth = require('oak-frontend-base/lib/platforms/web/utils/width').getBrowserWidth;
if (getBrowserWidth() === 'xs') {
    var Dialog = require('tdesign-mobile-react').Dialog;
    module.exports = Dialog;
    module.exports.default = Dialog;
}
else {
    var DialogPlugin = require('tdesign-react').DialogPlugin;
    module.exports = DialogPlugin;
    module.exports.default = DialogPlugin;
}
