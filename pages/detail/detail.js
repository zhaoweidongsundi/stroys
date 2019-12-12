// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      id:"",//当前故事的id
      detail:"" //存储故事内容的
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     let {id,title} = options;

     wx.setNavigationBarTitle({
       title:title
     })
    //将传过来的故事id，保存起来
    this.setData({
      id,
    })

    // 获取当前故事的详情
    this.getDetail()
  },

  getDetail(){
    //获取故事详情
    let that =this;
    let  id = that.data.id;

    //发起网路请求

    wx.showLoading({
      title: "数据加载中"
    })
    wx.request({
      url: 'https://route.showapi.com/1700-3',
      data: {
        showapi_appid: 102589,
        showapi_sign: "c5439a3ce51541c6b4663abcee8fe772",
        id
      },
      success(res) {
       
        let info = res.data.showapi_res_body; //新获取到的数据      
        that.setData({
          detail:info.content
        })
        wx.hideLoading()

        //判读是否登录  （缓存 足迹处理）
        let userInfo = wx.getStorageSync("userInfo") || {}
        // 如果没有登录，直接return 回去，不做缓存处理
        if (!userInfo.nickName)return false;

        // 以下代码都是登录之后的处理  【所有的访问缓存 都需要存在 storys】
        /*  
            let  stroys = [
              {野天鹅，azwd}
              {野天鹅，李四}
              {买火车小女孩}

            ]

            findIndex 索引
        */
        // 获取所有的缓存信息，

        // 判断当前所有的缓存信息中，有没有当前 我正在访问的故事  （通过故事id）
        let  storys = wx.getStorageSync("storys")  || [];
        
        let index = storys.findIndex((item,index)=>{
          return item.id == id && item.nickName == userInfo.nickName;
        })
        // console.log(index)
        // index  -1 代表没有访问过，  
        if(index == -1){
            // 添加，做存储
            info.nickName = userInfo.nickName;
            console.log(info)
            storys.push(info)
            wx.setStorageSync('storys',storys)
        }
        
      }
    })

  }
  
})