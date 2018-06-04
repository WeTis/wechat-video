# 微信小程序--短视频
---

## 介绍
  基于微信小程序video组件开发短视频（模仿网易云音乐视频部分）
  主要板块
    - 视频列表
    - 视频详情页 评论列表
## 目录结构
		  .
		|-- README.md
		|-- app.js
		|-- app.json
		|-- app.wxss
		|-- images
		|   |-- MV.png
		|   |-- MV_h.png
		|   |-- ava.jpe
		|   |-- collect.png
		|   |-- collect_h.png
		|   |-- coments.png
		|   |-- games.png
		|   |-- games_h.png
		|   |-- gaoxiao.png
		|   |-- gaoxiao_h.png
		|   |-- like.png
		|   |-- like_h.png
		|   |-- movie.png
		|   |-- movie_h.png
		|   |-- play.png
		|   |-- return.png
		|   |-- share.png
		|   `-- share_h.png
		|-- pages
		|   |-- details
		|   |   |-- details.js
		|   |   |-- details.json
		|   |   |-- details.wxml
		|   |   `-- details.wxss
		|   |-- details-template
		|   |   |-- details-template.wxml
		|   |   `-- details-template.wxss
		|   |-- games
		|   |   |-- games.js
		|   |   |-- games.json
		|   |   |-- games.wxml
		|   |   `-- games.wxss
		|   |-- gaoxiao
		|   |   |-- gaoxiao.js
		|   |   |-- gaoxiao.json
		|   |   |-- gaoxiao.wxml
		|   |   `-- gaoxiao.wxss
		|   |-- movies
		|   |   |-- movies.js
		|   |   |-- movies.json
		|   |   |-- movies.wxml
		|   |   `-- movies.wxss
		|   |-- mv
		|   |   |-- mv.js
		|   |   |-- mv.json
		|   |   |-- mv.wxml
		|   |   `-- mv.wxss
		|   |-- template
		|   |   |-- template.js
		|   |   |-- template.json
		|   |   |-- template.wxml
		|   |   `-- template.wxss
		|   `-- video-template
		|       |-- video-template.wxml
		|       |-- video-template.wxss
		|       `-- video.wxml
		|-- project.config.json
		`-- utils
		    `-- util.js
## 项目截图
  
## 项目bug 
  - video视频组件滑动时会有抖动 
  - 在开发工具中视频播放有问题 因为使用wx:if显示隐藏video导致 
  - ios上视频播放不了 一直加载 查询好像是组件自身问题 尚未解决 安卓端没有出现此问题