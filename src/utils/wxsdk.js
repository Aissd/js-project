// #ifdef H5
import wx from 'weixin-js-sdk';
// #endif
  import $api from '@/http/api';
  import { getQueryParams } from '@/utils/tools';

// 附录5-常见错误及解决方法
// https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/JS-SDK.html#66

const wxAPI = {
  /**
   * 微信Api初始化
   * @param {Function} callback [ready回调函数]
   */
  wxRegister(callback) {
    const url = window.location.href.split('#')[0];
    const obj = getQueryParams(window.location.href);
    const params = {
      resId: obj?.resId,
      busId: obj?.busId,
      requestUrl: url,
    };
    $api.wxjssdkInfo(params).then((res) => {
      if (res.code === 7) {
        // eslint-disable-next-line no-unused-expressions
        callback && callback(res);
        return;
      }
      if (res.code !== 0) {
        uni.hideToast(); // 去掉提示
        return;
      }
      //  开启调试模式, 调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
      wx.config({
        debug: false,
        appId: res.data.wxJsapiSignatureDTO.appId, // 必填，企业号的唯一标识，此处填写企业号 corpid
        timestamp: res.data.wxJsapiSignatureDTO.timestamp, // 必填，生成签名的时间戳
        nonceStr: res.data.wxJsapiSignatureDTO.nonceStr, // 必填，生成签名的随机串
        signature: res.data.wxJsapiSignatureDTO.signature, // 必填，签名，见附录1
        jsApiList: [
          'updateAppMessageShareData',
          'updateTimelineShareData',
          'onMenuShareAppMessage', // （即将废弃）
          'onMenuShareTimeline', // （即将废弃）
          'openLocation',
          'getLocation',
          'scanQRCode',
        ], // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
      });

      // config 信息验证失败
      wx.error((err) => {
        console.log('wx.error', err);
        callback({ code: 1, data: err }, wx);
        uni.showToast({
          title: err,
          icon: 'none',
        });
      });

      // wx.config 注册成功
      wx.ready(() => {
        // ready 回调方法
        if (callback) {
          console.log('wx.ready', res, wx);
          callback(res, wx);
        }
      });
    }).catch((error) => {
      console.log('catch', error);
      callback({ code: 1, data: error }, wx);
      uni.showToast({
        title: error,
        icon: 'none',
      });
    });
  },

  /**
   * 设置微信分享给朋友的分享内容
   * @param {Object} option [分享信息]
   * @param {String} option.title 分享标题
   * @param {String} option.desc  分享描述
   * @param {String} option.link  分享链接, 该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
   * @param {String} option.imgUrl 分享图标
   * @param {Function} option.success 设置成功
   */
  wxShareAppMessage(option) {
    wx.updateAppMessageShareData({
      title: option.title,
      desc: option.desc,
      link: option.link,
      imgUrl: option.imgUrl,
      success() {
        if (option.success) {
          option.success();
        }
      },
      fail(err) {
        console.log('wxShareAppMessage - fail', err);
      },
    });
  },

  /**
   * 设置微信分享到朋友圈的分享内容
   * @param {Object} option [分享信息]
   * @param {String} option.title 分享标题
   * @param {String} option.link  分享链接, 该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
   * @param {String} option.imgUrl 分享图标
   * @param {Function} option.success 设置成功
   */
  wxShareTimeline(option) {
    wx.updateTimelineShareData({
      title: option.title,
      link: option.link,
      imgUrl: option.imgUrl,
      success() {
        if (option.success) {
          option.success();
        }
      },
      fail(err) {
        console.log('wxShareAppMessage - fail', err);
      },
    });
  },

  // 微信查看当前地图位置
  wxOpenLocation(option) {
    wx.openLocation({
      latitude: option.latitude, // 纬度，浮点数，范围为90 ~ -90
      longitude: option.longitude, // 经度，浮点数，范围为180 ~ -180。
      name: '', // 位置名
      address: '', // 地址详情说明
      scale: 18, // 地图缩放级别,整形值,范围从1~28。默认为最大
      infoUrl: '',
      success() {
        if (option.success) {
          option.success();
        }
      },
      cancel() {
        if (option.error) {
          option.error();
        }
      },
    });
  },
  wxGetLocation(option) {
    return new Promise((resolve) => {
      wx.getLocation({
        type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
        success: (res) => {
          option.success(res);
          resolve(true);
        },
        fail: (err) => {
          console.log('wxsdk - wxGetLocation - fail - 获取地理位置失败', err);
          option.fail(err);
          resolve(false);
        },
        cancel: (reason) => {
          // 用户拒绝授权获取地理位置
          console.log('wxsdk - wxGetLocation - cancel - 用户拒绝授权获取地理位置', reason);
          option.cancel(reason);
          resolve(false);
        },
      });
    });
  },

  /**
   * 微信扫码
   * @param {Object} option 参数
   * @param {Number} option.needResult 0 扫描结果由微信处理; 1 则直接返回扫描结果，默认1
   * @param {Array} option.scanType  可以指定扫二维码还是一维码，默认二者都有
   * @param {Function} option.success 调用成功
   */
  wxScanQRCode(option) {
    const params = {
      needResult: 1, // 默认直接返回扫描结果
      ...option, // 合并参数
    };
    wx.scanQRCode({
      needResult: params.needResult,
      scanType: params.scanType,
      success(res) {
        console.log('wx.scanQRCode - success', res);
        if (params.success) {
          params.success(res);
        }
      },
      fail: (err) => {
        console.log('wx.scanQRCode - fail', err);
        // #ifdef H5
        window.location.reload();
        // #endif
      },
    });
  },
};

export default wxAPI;
