//index.js
//获取应用实例
const app = getApp()
var staticData = require('../../data/data.js')
Page({
  data: {
    tip_hidden_flag : true,
    title: "大连嘉鸿武道馆",
    subTitle: "剑道,合气道,居合道专业培训机构",
    src: "../../resources/icon.jpg",
    phoneNum: staticData.phoneNumber,
    itemList: [{ id: 0, icon: "../../resources/postion_icon.png", content: staticData.address, arrow: "../../resources/arrow_icon.png", readOnly: false},
      { id: 1, icon: "../../resources/telephone_icon.png", content: staticData.phoneNumber, arrow: "../../resources/arrow_icon.png", readOnly: false},
      { id: 2, icon: "../../resources/time_icon.png", content: staticData.openTime, arrow: "../../resources/arrow_icon.png", readOnly: false},
      { id: 3, icon: "../../resources/navinhome_icon.png", content: staticData.navInRoom, arrow: "../../resources/arrow_icon.png", readOnly: false }],
    imgUrls: [
'http://kendo-picture-bucket-1256125960.cos.ap-beijing.myqcloud.com/wx-mini-program-picture-src/navInRoom.jpg'
    ]
  },

  onHide: function() {
    this.setData({
      tip_hidden_flag: true
    });
  },
  //弹窗图片导航按钮点击
  pic_nav: function(e) {
    //图片预览
    wx.previewImage({// 当前显示图片的http链接
      urls: this.data.imgUrls // 需要预览的图片http链接列表
    });
  },
  //弹窗视频导航按钮点击
  video_nav: function (e) {
    //图片预览
    wx.navigateTo({
      url: '../play_video/play_video',
    });
  },
  //弹窗取消按钮点击
  tip_close: function (e) {
    this.setData({
      tip_hidden_flag : true
    });
  },
  itemTap: function(event) {
    var div = event.currentTarget.id
    switch (div) {
      //获取位置信息
      case "item-0": {
        wx.openLocation({
          longitude: 121.672350,
          latitude: 38.929340,
          name: staticData.addressName,
          address: staticData.addressDetail
        })
        break;
      }
      //拨打电话
      case "item-1": {
        wx.makePhoneCall({
          phoneNumber: staticData.phoneNumber, 
          success: function () {
            console.log("拨打电话成功！")
          },
          fail: function () {
            console.log("拨打电话失败！")
          }
        })
        break;
      }
      //获取位置信息
      case "item-2": {
        wx.navigateTo({
          url: '../schedule/schedule',
        })
        break;
      }
      //室内导航图
      case "item-3": {
        this.setData({
          tip_hidden_flag: false
        });
        break;
      }
    }
  }
})
