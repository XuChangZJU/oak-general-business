"use strict";
//@ts-ignore
var getBrowserWidth = require('oak-frontend-base/lib/platforms/web/utils/width').getBrowserWidth;
if (getBrowserWidth() === 'xs') {
    var Message = require('tdesign-mobile-react').Message;
    module.exports = Message;
    module.exports.default = Message;
}
else {
    var MessagePlugin = require('tdesign-react').MessagePlugin;
    module.exports = MessagePlugin;
    module.exports.default = MessagePlugin;
}
