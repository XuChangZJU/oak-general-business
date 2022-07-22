


/**
 *  xs: 0,
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200,
    xxl: 1600,
 * @returns 
 */
const getBrowserWidth = function () {
    if (window.innerWidth < 576) {
        return 'xs';
    } else if (window.innerWidth < 768) {
        return 'sm';
    } else if (window.innerWidth < 992) {
        return 'md';
    } else if (window.innerWidth < 1200) {
        return 'lg';
    } else if (window.innerWidth < 1600) {
        return 'xl';
    } else {
        return 'xxl';
    }
};

if (getBrowserWidth() === 'xs') {
    const Message = require('tdesign-mobile-react').Message;
    module.exports = Message;
    module.exports.default = Message;
} else {
    const MessagePlugin = require('tdesign-react').MessagePlugin;
    module.exports = MessagePlugin;
    module.exports.default = MessagePlugin;
}
