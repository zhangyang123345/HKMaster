
<template>
  <div class="view">
    <el-row :gutter="24" class="el-row head-div" type="flex">
      <el-col span="12" class=" homeCol">
        <el-row class=" homeCol">
          <el-col class=" homeCol">
            <div class="imageBox">
              <el-carousel style="width:100%;height:100%" interval="10000">
                <el-carousel-item style="width:100%;height:100%" v-for="item in imageList" :key="item">
                  <img  class="image" style="width:100%;" :src="item"/>
                </el-carousel-item>
              </el-carousel>
            </div>
          </el-col>
        </el-row>
      </el-col>
      <el-col span="12" class=" homeCol">
        <div class="videoBox">
          <video-player class="video-player vjs-custom-skin"
                        ref="videoPlayer"
                        :playsinline="true"
                        :options="playerOptions">
          </video-player>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="24" class="el-row buttom-div" type="flex">
      <el-col span="24" class=" homeCol">
        <div class="flowBox">
          <div class="boxItme" v-for="item in menuList"
               :key="item" @click="openMenu('menuId'+item.menuId,item.list[0])">
            <el-card class="boxCard"  style="background-color:rgba(245,248,253,0)">
              <el-row :gutter="24" class="el-row homeCol" type="flex" >
                <el-col :span="24" class="homeCol">
                  <svg aria-hidden="true" class="site-sidebar__menu-icon icon-svg" :class="item.sicon"><use xlink:href="" :href="item.icon"></use></svg>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24" class="homeCol">
                  <p style="position: inherit;" class="homeDiv">{{item.name}}</p>
                </el-col>
              </el-row>
            </el-card>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import router from '@/router'
  export default {
    inject: ['reload'],
    data() {
      return {
        imageList:['../../../static/img/homePage_12.png','../../../static/img/homePage_14.png','../../../static/img/homePage_15.png','../../../static/img/homePage_16.png'],
        menuList:[],
        playerOptions: {
          playbackRates: [0.5, 1.0, 1.5, 2.0], // 可选的播放速度
          autoplay: true, // 如果为true,浏览器准备好时开始回放。
          muted: true, // 默认情况下将会消除任何音频。
          loop: false, // 是否视频一结束就重新开始。
          preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
          language: 'zh-CN',
          aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
          fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
          sources: [{
            type: "video/mp4", // 类型
            src: 'http://op2pvdsvs:8002/Trace1.0.mp4' // url地址
          }],
          poster: '', // 封面地址
          notSupportedMessage: '此视频暂无法播放，请稍后再试', // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
          controlBar: {
            timeDivider: true, // 当前时间和持续时间的分隔符
            durationDisplay: true, // 显示持续时间
            remainingTimeDisplay: false, // 是否显示剩余时间功能
            fullscreenToggle: true // 是否显示全屏按钮
          }
        }
      }
    },
    activated () {
      this.menuCard()
    },
    mounted () {
    },
    components: {
    },
    methods: {
      menuCard () {
        this.$http({
          url: this.$http.adornUrl('/sys/menu/nav'),
          method: 'get',
          params: this.$http.adornParams()
        }).then(({data}) => {
          if (data && data.code === 0) {
          for(var item in data.menuList){
            data.menuList[item].sicon = 'icon-svg__'+data.menuList[item].icon
            data.menuList[item].icon = '#icon-'+data.menuList[item].icon
          }
          this.menuList = data.menuList
        }
      }).catch((e) => {
          console.log(`%c${e} 请求菜单列表和权限失败，跳转至登录页！！`, 'color:blue')
          router.push({ name: 'login' })
      })
      },
      openMenu (id , menu) {
        this.menuRout.set(id, true)
        this.reload()
        this.$store.commit('common/updateSidebarFold', false)
        // console.log(menu.url)
         this.$router.push({ name: menu.url.replace('/', '-') })
      },
      playClick () {
        this.isPlay = !this.isPlay;
        this.playStatus = 'paused';
      },
      closeSoundClick () {
        this.isMute = !this.isMute;
        if(this.isMute){
          this.muteStatus = '';
        }else{
          this.muteStatus = 'muted';
        }
      }
    }
  }
</script>
<style >
  .boxItme .icon-svg{
    font-size:38px;
  }
  .boxItme{
    width:100px!important;
    height:100px!important;
    text-align: center;
    display: inline-block;
    margin: 30px 2px;
  }
  .boxCard {
    width:100px!important;
    height:100px!important;
    font-size: 9px!important;
  }
  .boxItme .site-sidebar__menu-icon{
    margin-right: 0px;
  }
  .boxItme .el-card__body{
    background:#ffffff;
  }
  .view{
    height:100%;
    background: #ededed;
  }
  .head-div{
    height:70%;
  }
  .el-carousel__container{
    height:100%;
  }
  .buttom-div{
    margin-top:1%;
  }
  .homeCol{
    margin-bottom: 0px !important;
  }
  .imageBox{
    width:100%;
    height: 61vh;
    margin-top: 7%;
  }
  .videoBox{
    width:100%;
    height: 61vh;
    margin-top: 7%;
  }
  .flowBox{
    background: white;
    height: 160px;
    white-space: nowrap;
    overflow-y: hidden;
    border-style:double ;
  }
  .cardEl {
    transition: all .5s;
    padding: 0;
    background-color:rgba(245,248,253,1)
  }
  .cardEl:hover{
    margin-top: -10px;
    background: RGB(49,199,201);
  }
  .homeP{
    font-family: "宋体","仿宋",sans-serif;/*若电脑不支持宋体，则用仿宋，若不支持仿宋，则在sans-serif中找*/
    font-weight: bold;
    position: absolute;
    left: 0;
    font-size: 80%;
    /*font-style: italic;*/
    color: RGB(54, 163, 247);/*字体颜色*/
    opacity: 1;/*字体的透明度：1：默认样式，0：全透明*/
  }
  .homeDiv{
    font-family: "宋体","仿宋",sans-serif;/*若电脑不支持宋体，则用仿宋，若不支持仿宋，则在sans-serif中找*/
    font-weight: bold;
    position: absolute;
    left: 0;
    font-size: 150%;
    /*font-style: normal;*/
    color: RGB(54, 163, 247);/*字体颜色*/
    opacity: 1;/*字体的透明度：1：默认样式，0：全透明*/
  }
  .homespan{
    font-family: "宋体","仿宋",sans-serif;/*若电脑不支持宋体，则用仿宋，若不支持仿宋，则在sans-serif中找*/
    font-weight: bold;
    font-size: 100%;
    /*font-style: italic;*/
    color: RGB(140,140,140);/*字体颜色*/
    opacity: 1;/*字体的透明度：1：默认样式，0：全透明*/
  }
  .homevalue{
    font-family: "宋体","仿宋",sans-serif;/*若电脑不支持宋体，则用仿宋，若不支持仿宋，则在sans-serif中找*/
    font-weight: bold;
    font-size: 120%;
    color: RGB(102,102,102);/*字体颜色*/
    opacity: 1;/*字体的透明度：1：默认样式，0：全透明*/
  }
  .ptitle{
    font-size: 150%;
    font-family: '宋体';
    color: #aa1111;
    font-style: italic;
    opacity: 0.5;
    font-weight: bold;
    position:relative;
    text-align:center;
    margin:0;
  }
  .homeimg {
    width: 36px;
    height: auto;
    margin-right: 5px;
    border-radius: 100%;
    vertical-align: middle;
  }
  .paddingS{
    margin-top: 10px;
  }
</style>
