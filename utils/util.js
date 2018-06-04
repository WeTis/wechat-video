
/**
 * 页面滚动超过当前播放视频时 视频暂停
 * This is a cool function
 * @Author   weitong
 * @DateTime 2018-06-04
 * @param    {[type]}   res         事件res
 * @param    {[type]}   id          当前正在播放视频的播放id
 * @param    {[type]}   videoheight 视频的高度
 * @param    {[type]}   Video       获取视频id名
 */
function PageScrollPause(res, id, videoheight,Video) {
  if (id === 0 || id > 0) {
    let height = videoheight * (id + 1);
    let m = 0;
    
    if (res.scrollTop > height && m == 0) {
      console.log(height,res.scrollTop,Video);
      Video.pause();
      m = 1;
    }
  }
}
// 判断网络状态当是WiFi时 播放视频 
// 参数 1 需要播放视频的播放id
//      2 that  替代this
//      3 
function isGetNetworkType(id, that) {
  wx.getNetworkType({
    success: (res) => {
      let net = res.networkType;
      if (net === '2g' || net === '3g' || net === '4g') {
        that.setData({
          videoShowId: null,
          netstatId: id
        })
      } else if (net === 'wifi') {
        that.setData({
          videoShowId: id,
          netstatId: null,
        });
      } else {
        that.setData({
          netstatId: null
        })
      }
      if (that.data.videoShowId === 0 || that.data.videoShowId > 0) {
        console.log("执行播放");
        let Video = wx.createVideoContext('video' + id);
        Video.play();
      } else {
        console.log('不执行播放');
      }
    }
  });
}
/**
 * 点击播放那个
 * 获取点击按钮的id 获取video的id
 * 参数 1 点击播放按钮的自定义data id 
 *      2 that 代替 当前调用的this
 *      3 fn  调用网络判断函数
 */
function ShowVideo(id, that, fn) {
  // var id = res.currentTarget.dataset.id;
  that.setData({
    isClickPlay: id
  });
  if (that.data.videoShowId) {
    var oldVideo = wx.createVideoContext('video' + that.data.videoShowId);
    oldVideo.pause();
  }
  // 调用网络判断函数
  fn(id);

}

/**
  * 点击流量播放
  * 参数 1 点击播放的id
  *      2 that 替代 this
  *      3 
  */
function netstat(id, that) {
  //var id = res.currentTarget.dataset.id;
  that.setData({
    isClickPlay: id
  });
  that.setData({
    videoShowId: id
  });
  var Video = wx.createVideoContext('video' + id);
  Video.play();
}
/**
 * 点击展示详情页
 * This is a cool function
 * @Author   weitong
 * @DateTime 2018-06-04
 * @param    {[type]}   res [description]
 * @return   {[type]}       [description]
 */
function TabDetail(id, that) {
  // var id = res.currentTarget.dataset.id;
  that.setData({
    isShow: "myVideo" + id,
    pageOverflow: false
  })
  if (that.data.videoShowId === id) {
    /**
     * 点击的是当前正在播放的 只需要改变布局状态
     */
  } else if (that.data.videoShowId) {
    /**
     * 点击的当前没有播放并且有其他的在播放 停止当前播放的 然后播放点击的
     */
    var oldVideo = wx.createVideoContext('video' + that.data.videoShowId);
    oldVideo.pause();
    let video = wx.createVideoContext('video' + id);
    video.play();
    that.setData({
      videoShowId: id
    });
  } else {
    /**
     * 点击当前的没有播放 并且当前没有其他播放
     */
    let video = wx.createVideoContext('video' + id);
    video.play();
    that.setData({
      videoShowId: id
    });
  }

}
/**
 * 从详情页返回列表页
 * This is a cool function
 * @Author   weitong
 * @DateTime 2018-06-04
 * @param    {[type]}   even [description]
 * @return   {[type]}        [description]
 */
function returnPage(id, that) {
  // let id = even.currentTarget.dataset.videoid;
  that.setData({
    isShow: '',
    pageOverflow: true
  }, function () {
    wx.pageScrollTo({
      scrollTop: (300 * id),
      duration: 200
    })
  })
}
module.exports = {
  util: {
    PageScrollPause,
    isGetNetworkType,
    ShowVideo,
    netstat,
    TabDetail,
    returnPage
  }
}
