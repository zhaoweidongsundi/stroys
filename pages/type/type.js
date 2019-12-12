// pages/type/type.js

let  rand = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
      types:[],
      bgColor:"rgba(255,255,0,1)"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      // console.log('1')
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // console.log('2')
    this.getTypes()
    this.actionBgcolor()
  },
  //获取所有的分类
  getTypes(){
    let  that = this;

    wx.request({
      url: 'https://route.showapi.com/1700-1',
      data:{
        showapi_appid:102589,
        showapi_sign:"c5439a3ce51541c6b4663abcee8fe772"
      },
      success(res){
          // console.log(res)
          let  types = res.data.showapi_res_body.storylist;

          that.setData({
            types
          })
      }
    })


  },

  //  处理背景色
  actionBgcolor(){
      setInterval(()=>{
        this.setData({
          bgColor: `rgba(${rand(0, 255)}${rand(0, 255)},${rand(0, 255)},${Math.random()})`
        })
      },400)
     
  },

  // 跳转到故事列表页面
  toLists(e){
      // 获取id
    let { classifyid, classify } = e.currentTarget.dataset;

    //将类别id传递到故事列表页面
    wx.navigateTo({
      url: '/pages/list/list?classifyid=' + classifyid + "&classify=" + classify,
    })
  }

})