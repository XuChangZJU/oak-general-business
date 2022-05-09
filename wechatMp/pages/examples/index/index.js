"use strict";
Page({
    navigateToCpnPage(e) {
        const pagename = e.currentTarget.dataset.value;
        wx.navigateTo({ url: `../g-${pagename}/index` });
    }
});
