let   pics = [
  "/static/0.jpg",
  "/static/1.jpg",
  "/static/2.jpg",
  "/static/3.jpg"
]
let timer = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
      pics,
      second:pics.length
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.seconds()
  },

  // 处理首页时间倒计时显示的效果
  seconds(){
      if(timer) clearInterval(timer);

      timer = setInterval(()=>{
        this.data.second--;

        // 判断
        if(this.data.second < 1){
          clearInterval(timer)
          //页面跳转
          wx.switchTab({
            url: '/pages/type/type',
          })
          return false;
        }

        this.setData({
          second: this.data.second
        })


      },1000)
      
  },
  jump(){
    //跳过广告
    if (timer) clearInterval(timer);
    wx.switchTab({
      url: '/pages/type/type',
    })

  }
})