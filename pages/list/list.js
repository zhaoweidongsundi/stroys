// pages/list/list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 1,
    lists: [],
    onOff: false, // false代表没有登录，true代表登录
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

    // 获取到了类别名称和类别id
    let {
      classifyid,
      classify
    } = options;

    // 动态处理类别名称
    wx.setNavigationBarTitle({
      title: classify,
    })
    this.setData({
      classifyid, //将类别id保存起来
    })

    //判断是游客登录还是 用户登录
    let userInfo = wx.getStorageSync("userInfo") || {}
    if (userInfo.nickName) {
      //已经登录了
      this.setData({
        userInfo,
        onOff: true
      })
    }

    this.getLists()
  },
  //获取列表
  getLists() {
    //使用id
    let classifyid = this.data.classifyid;
    let page = this.data.page;
    let that = this;
    wx.showLoading({
      title:"数据加载中"
    })
    wx.request({
      url: 'https://route.showapi.com/1700-2',
      data: {
        showapi_appid: 102589,
        showapi_sign: "c5439a3ce51541c6b4663abcee8fe772",
        classifyId: classifyid,
        page
      },
      success(res) {
        // console.log(res)

        let lists = res.data.showapi_res_body.contentlist; //新获取到的数据
        let oldLists = that.data.lists; //原来的数据
        lists  = oldLists.concat(lists)
        that.setData({
          lists
        })

        wx.hideLoading()
      }
    })

  },
  onPageScroll(e){
    // console.log(e)  // 2229  5029

    let  scrollTop = e.scrollTop;// 滚动的距离
    let page = this.data.page;
    
    if(scrollTop >= 2200 +(page-1)*2800){
        //加载更多数据
      page++;

      this.setData({
        page,
      })

      this.getLists()

    }
  },

  slideButtonTap(e){

      // 获取参数
      let {id ,title} = e.currentTarget.dataset;

      wx.navigateTo({
        url: `/pages/detail/detail?id=${id}&title=${title}`,
      })
  }


})