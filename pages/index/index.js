Page({
  data: {
    // 左侧点击类样式
    curNav: 'left_0',
    scrollTop: 0,
    // 定义一个空数组，用来存放右侧滑栏中每一个商品分类的 Height
    listHeight: '',
    chooseSize: false,
    animationData: {},
    pay_product_image: '',
    pay_product_title: '',
    pay_product_price: ''
  },
  // 生命周期函数--监听页面初次渲染完成
  onReady: function () {
    var that = this;
    // 定义右侧标题的 rpx 高度 和 px 高度
    var right_titleRpxHeight = 60;
    var right_titleHeight;
    // 定义右侧单个商品的 rpx 高度 和 px 高度
    var right_contentRpxHeight = 180;
    var right_contentHeight;
    // 定义左侧单个tab的 rpx 高度 和 px 高度
    var left_titleRpxHeight = 140;
    var left_titleHeight;
    //  获取可视区屏幕高度
    wx.getSystemInfo({
      success: function (res) {
        // percent 为当前设备1rpx对应的px值
        var percent = res.windowWidth / 750;
        that.setData({
          winHeight: res.windowHeight - 100 * percent,
          right_titleHeight: Number(right_titleRpxHeight * percent),
          right_contentHeight: Number(right_contentRpxHeight * percent),
          left_titleHeight: Number(left_titleRpxHeight * percent)
        })
      }
    })

    var that = this;
    //请求商品列表数据
    wx.request({
      url: 'https://qidonghao.cn:8080/mvc/allProductByGroup', //仅为示例，并非真实的接口地址
      data: {},
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        that.setData({
          list: res.data
        })
        // 把请求到的 list 中的数据赋值给  listChild1
        var listChild1 = that.data.list;
        // 定义一个 names ，用于存放 scroll-into-view 使用的 id
        var names = '';
        // 循环 listChild1 中的每一项
        for (var item in listChild1) {
          // 把 listChild1 中每一项的键值用“：”（便于后期处理）分隔开，存入 names 中，数据格式见图‘names中的数据’
          names += ":" + 'left_' + item;
          // 计算右侧每一个分类的 Height 。
          // listChild1 下的每一个 item 中包含该分类的 title，所以 listChild1[item].length 需要减一 
          // 右侧每一个分类中每一行放两个商品，所以 this.data.right_contentHeight 除二
          // 最后加上 right_titleHeight，此时 height 为右侧一个完整分类的高度
          var height = listChild1[item].productList.length * that.data.right_contentHeight / 2 + that.data.right_titleHeight;
          // 同上面 names 的道理，把每一个 height 用“：”隔开放入 listHeight 中
          that.data.listHeight += ":" + height;
          that.setData({
            // 把 listChild1 赋值给 list ，供 wxml 中循环使用
            listHeight: that.data.listHeight
          })
        }
        // 把 names 的数据切成数组
        var names = names.substring(1).split(':');
        that.setData({
          names: names
        })
      }
    });
  },
  // 右侧滑栏的 bindscroll 事件函数（ES6写法）
  scroll(event) {
    // 把 listHeight 切割成数组
    var height = this.data.listHeight.substring(1).split(':');
    // 定义一个 index 供左侧边栏联动使用
    var index = 1;
    var num = 0;
    for (var i = 0; i < height.length; i++) {
      // 累计右侧滑栏滚动上去的每一个分类的 Height
      num += parseInt(height[i]);
      // 循环判断 num 是否大于右侧滑栏滚动上去的 Height ，然后 get 到 i 值赋给 index
      if (num > event.detail.scrollTop) {
        index = i + 1;
        // 如果右侧滑栏滚动高度小于单个类别高度的 1/2 时，index 为 0
        if (event.detail.scrollTop < height[0] / 2) {
          index = 0;
        }
        break;
      }
    }
    // 定义并设置左侧边栏的滚动高度
    var left_scrollTop = this.data.left_titleHeight * index
    this.setData({
      scrollTop: left_scrollTop,
      // 动态给左侧滑栏传递对应该项的 id，用于高亮效果显示
      curNav: this.data.names[index]
    })
  },
  //点击左侧 tab ，右侧列表相应位置联动 置顶
  switchRightTab: function (e) {
    var id = e.target.id;
    this.setData({
      scrollTopId: id,
      // 左侧点击类样式
      curNav: id,
    })
  },
  //弹出支付窗口
  chooseSezi: function (e) {
    // 用that取代this，防止不必要的情况发生
    var that = this;
    // 创建一个动画实例
    var animation = wx.createAnimation({
      // 动画持续时间
      duration: 500,
      // 定义动画效果，当前是匀速
      timingFunction: 'linear'
    })
    // 将该变量赋值给当前动画
    that.animation = animation
    // 先在y轴偏移，然后用step()完成一个动画
    animation.translateY(200).step()
    // 用setData改变当前动画
    that.setData({
      // 通过export()方法导出数据
      animationData: animation.export(),
      // 改变view里面的Wx：if
      chooseSize: true
    })
    // 设置setTimeout来改变y轴偏移量，实现有感觉的滑动
    setTimeout(function () {
      animation.translateY(0).step()
      that.setData({
        animationData: animation.export()
      })
    }, 200)

    var targetCode = e.currentTarget.dataset["pcode"];
    for (var item1 in this.data.list) {
      console.log(this.data.list);
      for (var item2 in this.data.list[item1].productList) {
        console.log(this.data.list[item1].productList);
        if (this.data.list[item1].productList[item2].product_code == targetCode) {
          this.setData({
            pay_product_image: this.data.list[item1].productList[item2].product_comment,
            pay_product_title: this.data.list[item1].productList[item2].product_name,
            pay_product_price: this.data.list[item1].productList[item2].product_price
          });
          targetCode = '';
          break;
        }
      }
      if (targetCode == '') {
        break;
      }
    }
  },
  //隐藏支付窗口
  hideModal: function (e) {
    var that = this;
    var animation = wx.createAnimation({
      duration: 1000,
      timingFunction: 'linear'
    })
    that.animation = animation
    animation.translateY(200).step()
    that.setData({
      animationData: animation.export()

    })
    setTimeout(function () {
      animation.translateY(0).step()
      that.setData({
        animationData: animation.export(),
        chooseSize: false
      })
    }, 200)
  },
  scanCode: function (e) {
    var that = this;
    // 只允许从相机扫码
    wx.scanCode({
      onlyFromCamera: true,
      success: (res) => {
        console.log(res);
        var temp = {
          currentTarget: {
            dataset: {
              pcode: res
            }
          }
        };
        that.chooseSezi(temp);
      }
    });
  }
})