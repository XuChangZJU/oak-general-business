Page({
    navigateToCpnPage(e:any) {
        console.log(e);
        const pagename = e.currentTarget.dataset.value;
        wx.navigateTo({ url: `../g-${pagename}/index` });
    }
});