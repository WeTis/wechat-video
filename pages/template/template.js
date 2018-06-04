var GlobalApp = getApp();
Component({
  properties: {
    musicMv: {
      type: Array
    }
  },
  data: {
    videoShowId: null,   // 保存当前正在播放视频的自定义id 用于判断是否显示video组件
    netstatId: null,     // 在点击播放视频时 如果是流量 则用来保存点击视频的自定义id用来判断是否现实流量播放按钮层
    isClickPlay: null,
    isShow: '',  // 用来记录是否点击展示详情页 隐藏于展示相应内容
    pageOverflow: true,  // 展示详情页时 让整个页面外部不能滚动
    
  },

  methods: {
    /**
     * 判断网络状态
     * 当点击时 判断网络状态 并将相应的id传入 
     * 流量状态下 改变 netstatId=id 显示出是否流量播放层 改变videoShowId = null 不显示video组件
     * WiFi状态下 改变 netstatId = null 不显示是否流量播放层 改变 videoShowId = id  显示video组件
     * 并切 对应的id 以及获取的video对象 赋值给对应全局变量 以便于页面滚动时触发相应操作
     * 判断videoShowId 是否符合要求 播放对应视频
     */
    isGetNetworkType: function (id) {
      wx.getNetworkType({
        success: (res) => {
          var net = res.networkType;
          if (net === '2g' || net === '3g' || net === '4g') {
            this.setData({
              videoShowId: null,
              netstatId: id
            })
          } else if (net === 'wifi') {
            this.setData({
              videoShowId: id,
              netstatId: null,
            });
            GlobalApp.globalData.playvideoid = id;
          } else {
            this.setData({
              netstatId: null
            })
          }
          if (this.data.videoShowId === 0 || this.data.videoShowId > 0) {
            var Video = wx.createVideoContext('video' + id,this);
            GlobalApp.globalData.video = Video;
            Video.play();
          } else {
          }
        }
      });
    },
    /**
     * 点击流量播放
     * 点击流量播放按钮 获取对应自定义id 改变videoshowid = id 显示video组件并播放 隐藏流量播放层
     * 并切 对应的id 以及获取的video对象 赋值给对应全局变量 以便于页面滚动时触发相应操作
     */
    netstatPaly: function (res) {
      var id = res.currentTarget.dataset.id;
      this.setData({
        isClickPlay: id
      });
      this.setData({
        videoShowId: id
      });
      GlobalApp.globalData.playvideoid = id;
      var Video = wx.createVideoContext('video' + id,this);
      GlobalApp.globalData.video = Video;
      Video.play();
    },
    /**
     * 点击播放那个
     * 点击页面三角播放按钮 获取对应自定义id 
     * 判断videoshowid是否有值 来确定是否有其他视频正在播放 有则暂停播放
     * 调用网络状态判断函数
     */
    clickShowVideo: function (res) {
      var id = res.currentTarget.dataset.id;
      this.setData({
        isClickPlay: id
      });
      if (this.data.videoShowId) {
        var oldVideo = wx.createVideoContext('video' + this.data.videoShowId,this);
        oldVideo.pause();
      }
      this.isGetNetworkType(id);

    },
    /**
     * 点击显示详情页
     * 点击获取对应自定义id 判断id是否等于当前的videoshowid 
     * 如果等于  则不改变播放状态 只改变布局样式
     * 如果不等于并且存在  则暂停videoshowid对应的视频 播放当前点击的视频 并且展示详情页
     * 如果即不等于也不存在 说明此时没有视频播放 则播放对应视频 并修改样式 展示详情页
     */
    onTabDetail: function (res) {
      var id = res.currentTarget.dataset.id;
      this.setData({
        isShow: "myVideo" + id,
        pageOverflow: false
      })
      if (this.data.videoShowId === id) {
        /**
         * 点击的是当前正在播放的 只需要改变布局状态
         */
      } else if (this.data.videoShowId) {
        /**
         * 点击的当前没有播放并且有其他的在播放 停止当前播放的 然后播放点击的
         */
        var oldVideo = wx.createVideoContext('video' + this.data.videoShowId,this);
        oldVideo.pause();
        let video = wx.createVideoContext('video' + id,this);
        video.play();
        this.setData({
          videoShowId: id
        });
        GlobalApp.globalData.playvideoid = id;
         GlobalApp.globalData.video = video;
      } else {
        /**
         * 点击当前的没有播放 并且当前没有其他播放
         */
        let video = wx.createVideoContext('video' + id,this);
        video.play();
        this.setData({
          videoShowId: id
        });
        GlobalApp.globalData.playvideoid = id;
        GlobalApp.globalData.video = video;
      }

    },
    /**
     * 详情页顶部返回按钮
     * 点击获取对应自定义id 改变 isshow pageoverflow 布局回复视频列表布局
     * 并根据id将页面滚动到当前播放视频的位置
     */
    returnPage: function (even) {
      let id = even.currentTarget.dataset.videoid;
      this.setData({
        isShow: '',
        pageOverflow: true
      },function(){
        wx.pageScrollTo({
          scrollTop: (300 * id),
          duration: 100
        })
      })

    }
  }
})
