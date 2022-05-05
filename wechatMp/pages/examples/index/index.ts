Page({
    navigateToCpnPage(e:any) {
        const pagename = e.currentTarget.dataset.value;
        wx.navigateTo({ url: `../g-${pagename}/index` });
    }
});