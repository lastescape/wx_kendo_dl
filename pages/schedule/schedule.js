//index.js
//获取应用实例
var app = getApp()
var staticData = require('../../data/data.js')
Page({
  data: {
    /**
        * 页面配置
        */
    winWidth: 0,
    winHeight: 0,
    // tab切换
    currentTab: 0,
    listDataKendo: staticData.listDataKendo,
    listDataAkido: staticData.listDataAkido,
    listDataIaido: staticData.listDataIaido
  },
  onLoad: function () {
    var that = this;

    /**
     * 获取系统信息
     */
    wx.getSystemInfo({

      success: function (res) {
        console.log("width" + res.windowWidth);
        console.log("height" + res.windowHeight);
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }

    });
  },
  /**
     * 滑动切换tab
     */
  bindChange: function (e) {

    var that = this;
    that.setData({ currentTab: e.detail.current });

  },
  /**
   * 点击tab切换
   */
  swichNav: function (e) {

    var that = this;

    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      console.log(e.target.dataset.current);
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  }
})