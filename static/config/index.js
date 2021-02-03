/**
 * 开发环境
 */
;(function () {
  window.SITE_CONFIG = {};

  // api接口请求地址
   //window.SITE_CONFIG['baseUrl'] = 'http://DESKTOP-YONGLI:8082/HKService';
  // window.SITE_CONFIG['baseUrl'] = 'http://DESKTO-95RUTUB:8082/renren-fast';
   window.SITE_CONFIG['baseUrl'] = 'http://10.128.19.168:8091/HKService';
  // window.SITE_CONFIG['baseUrl'] = 'http://localhost:8083/renren-fast'
  // window.SITE_CONFIG['baseUrl'] = 'http://3q2189y798.qicp.vip:32411/renren-fast';
   // window.SITE_CONFIG['baseUrl'] = 'http://op2pvdsvs:8082/HKService';
  //  window.SITE_CONFIG['baseUrl'] = 'OP2PVDSVS';
  // 192.168.11.101
  //  window.SITE_CONFIG['baseUrl'] = 'http://localhost:8080/renren-fast';
  // cdn地址 = 域名 + 版本号
  window.SITE_CONFIG['domain']  = './'; // 域名
  window.SITE_CONFIG['version'] = '';   // 版本号(年月日时分)
  window.SITE_CONFIG['cdnUrl']  = window.SITE_CONFIG.domain + window.SITE_CONFIG.version;
})()
