//index.js
var gql = require('../../graphql/wxgql.js');
var GraphQL = gql.GraphQL;


console.log(GraphQL)


//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    slideShow:[],
    magazineLlist:[],
    indicatorDots: true,
    autoplay: true,
    interval: 2000,
    duration: 500

  },
  getData() {

    // 初始化对象
    let gql = GraphQL({
      url: 'http://ebookqqsh.ioobot.com/release/graphql' // url必填 
    }, true); //第二个参数的true代表是否使用对象方法，如 gql.query 或 gql.mutate，默认是函数方法，如 gql({body: {query: '', variables: {}}})，建议写 true，为 true 时可以使用 promise

    gql.query({
      query: `query {
        slideshow:slideshow_by_props{
        picture
        }
        magazineList:magazine_by_props {
        id
        magazineName:name,
        picture,
        magazineIntro,
        unitPrice
        enableSub
        }
       }`,
      variables: {
        secret: '427e24d3b7e289ae9469ab6724dc7ff0',
        clientId: '5a9fa26cf8635a000185528c'
      }
    }).then((res)=> {
      //成功s
      console.log(res.data)
      this.setData({
        "slideShow":res.data.slideshow,
        "magazineLlist":res.data.magazineList
      })
      
    }).catch(function (error) {
      //失败
      console.log('error')
    });

  },
  //事件处理函数
  bindViewTap: function () {
  },
  onLoad: function () {
    console.log(this.data)
    this.getData();
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
