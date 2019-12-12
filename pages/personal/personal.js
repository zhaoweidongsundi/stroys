// pages/personal/personal.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    onOff: false, // 如果 为true，证明已经登录，false 未登录
    lists: [], //就是自己访问过的历史记录
    slideButtons: [{
      type: 'warn',
      text: '查看',
      extClass: 'test'
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    //判断当前是否登录，登录了，显示用户信息，没登录，直接显示未登录信息
    let that = this;
    wx.checkSession({
      success() {
        // 已经登录
        let userInfo = wx.getStorageSync("userInfo")
        that.setData({
          userInfo,
          onOff: true
        })

        that.getStorage()

      },
      fail() {
        //没有登录
        wx.showToast({
          title: '请先登录哦',
          icon: "none"
        })

        wx.clearStorageSync();
      }
    })
  },
  // 登录功能
  login(e) {
    console.log(e)
    let that = this;
    if (e.detail.errMsg == "getUserInfo:fail auth deny") {
      // 没有同意授权，
      wx.showToast({
        title: '登录才能查看',
        icon: "none"
      })

      return false;
    }

    //处理登陆问题

    let userInfo = e.detail.userInfo;
    //执行登陆
    wx.login({
      success() {
        // 登录之后提示信息
        wx.showToast({
          title: '登录成功',
          // 提示信息提示成功之后，将用户信息，存储到缓存中
          success() {
            wx.setStorageSync('userInfo', userInfo)
            that.setData({
              onOff: true,
              userInfo
            })

            that.getStorage()
          }
        })
      }
    })




  },

  // 获取当前自己的缓存信息，然后进行调用即可
  getStorage(){

      //  获取所有的缓存信息
       let  storys = wx.getStorageSync("storys") || [];

       let  nickName = wx.getStorageSync("userInfo").nickName;

      //  查询自己的缓存信息

       let lists = storys.filter((item,index)=>{
          return item.nickName == nickName;
       })

       this.setData({
         lists
       })

  },
  slideButtonTap(e) {

    // 获取参数
    let { id, title } = e.currentTarget.dataset;

    wx.navigateTo({
      url: `/pages/detail/detail?id=${id}&title=${title}`,
    })
  }


})