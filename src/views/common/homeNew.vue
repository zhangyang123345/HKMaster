<template>
    <div class="dwrapper" id = 'fullArea'>
        <div class="dcontainer">
            <!--<div class="dashboard-bg-image"></div>-->
            <div style="height:100%;" :style="marginStyle">
                <div style="position: relative; height:100%">
                    <div class="dashboard-container" style="width: 100%;height:100%" :style="transformStyle">
                        <top-title :title.sync="title"></top-title>
                      <DashboardR1></DashboardR1>
                      <DashboardR2></DashboardR2>
                      <DashboardR3></DashboardR3>
                      <DashboardR4></DashboardR4>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  import TopTitle from '../components/TopTitle';
  import {getComputedStyle} from "../utils";
  import {debounce} from "lodash";
  import DashboardR1 from '../dashboard/DashboardR1';
  import DashboardR2 from '../dashboard/DashboardR2';
  import DashboardR3 from '../dashboard/DashboardR3';
  import DashboardR4 from '../dashboard/DashboardR4';
    export default {
        name: "HomeNew",
        data () {
            return {
              scaleX: 1,
              scaleY: 1,
              marginHorizontal: 0,
              fullscreen: false,
                title: ''
            }
        },
        components: {
            TopTitle,
            DashboardR1,
          DashboardR2,
          DashboardR3,
          DashboardR4
        },
      mounted () {
        this.init()
        this.KeyDown()
        //   window.addEventListener('resize', debounce(() => {
        //     this.initScale()
        // } , 300))
      },
      computed: {
        transformStyle: function () {
          // return {
          //     transform: `scale(${this.scaleX}, ${this.scaleY})`
          // };
          // return 'height: ' + window.innerHeight + ';'
        },
        marginStyle: function () {
          return {
            margin: `0px ${this.marginHorizontal}px;`
          }
        },
        dwrapperStyle: function () {
          return {
            height: this.height + 'px'
          }
        }
      },

        watch: {},

        methods: {
          init () {
            window.addEventListener('keydown', this.KeyDown, true)// 监听按键事件
            window.addEventListener('resize', this.initScale, true)
            this.listenResize()
          },
          scanHome () {
            var rate = 1 / ((window.innerWidth / 1920) * 0.95)
            return "transform: scale(" + rate + ")"
          },
          KeyDown () {
            if (event.keyCode === 122 && document.getElementById('fullArea') != null) {
              event.returnValue = false
              this.fullScreen()   //触发全屏的按钮
            }
          },
          fullScreen () {
            var fullArea = document.getElementById('fullArea')
            if (this.fullscreen) {
              if (document.exitFullscreen) {
                document.exitFullscreen();
              } else if (document.webkitCancelFullScreen) {
                document.webkitCancelFullScreen();
              } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
              } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
              }
            } else {
              if (fullArea.requestFullscreen) {
                fullArea.requestFullscreen();
              } else if (fullArea.webkitRequestFullScreen) {
                fullArea.webkitRequestFullScreen();
              } else if (fullArea.mozRequestFullScreen) {
                fullArea.mozRequestFullScreen();
              } else if (fullArea.msRequestFullscreen) {
                // IE11
                fullArea.msRequestFullscreen();
              }
            }
            this.fullscreen = !this.fullscreen;
          },
          initScale () {
            let $container = document.querySelector('.container')
            let containerWidth = getComputedStyle($container, 'width').replace("px", "")
            let containerHeight = getComputedStyle($container, 'height').replace("px", "")
            containerWidth = Number(containerWidth)
            containerHeight = Number(containerHeight)
            containerWidth = isNaN(containerWidth) ? 0 : containerWidth
            containerHeight = isNaN(containerHeight) ? 0 : containerHeight

            let defaultHeight = 900
            let defaultWidth = 1920
            // sacle 缩放比例。
            let scale = 1
            if (containerHeight < defaultHeight) {
              scale = containerHeight / defaultHeight
            }

            this.scaleX = scale
            this.scaleY = scale

            let marginWidth = defaultWidth * scale
            //
            this.marginHorizontal = 0
            if (containerWidth > marginWidth) {
              marginWidth = (containerWidth - marginWidth) / 2
              this.marginHorizontal = marginWidth
            }
          },
          listenResize () {
            this.initScale()
          }
        },

      destroyed () {

      }
    }
</script>

<style lang="scss">

    .dwrapper {
        height:900px;
        width: 101.08%;
        margin: -20px;
        position: relative;
    }

    .dcontainer {
        background-color: rgb(3, 12, 59);
        overflow: hidden;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
    }


    .dashboard-bg-image {
        width: 100%;
        height: 100%;
        position: absolute;
        background: url('../../assets/img/background.jpg');
    }

    .dashboard-container {
        position: relative;
        user-select: none;
        width: 100%;
        height: 100%;
        transform-origin: 0 0;
        box-shadow: 0 0 10px 0 rgba(0, 0, 0, .5);
        transition: all .3s linear;
        overflow: hidden;
    }

    .dashboard-error {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.7);
        z-index: 0;
        display: flex;
        align-items: center;
        justify-content: center;

        .dashboard-error-inner {
            color: #fff;
            font-size: 32px;
        }
    }
    .d-chart-item {
      position: absolute;

      .chart-item {
        position: relative;
        height: 100%;
        background: RGBa(4, 28, 72, 0);
        overflow: hidden;

        &::after {
          position: absolute;
          content: '';
          width: 17px;
          height: 15px;
          background: url("../../assets/img/border-arrow.png");
          left: 0;
          bottom: 0;
        }

        &::before {
          position: absolute;
          content: '';
          width: 17px;
          height: 15px;
          background: url("../../assets/img/border-arrow.png");
          right: 0;
          bottom: 0;
          transform: rotate(-90deg);
        }

        .arrow-top-left {
          position: absolute;
          content: '';
          width: 17px;
          height: 15px;
          background: url("../../assets/img/border-arrow.png");
          left: 0;
          top: 0;
          transform: rotate(90deg);
        }

        .arrow-top-right {
          position: absolute;
          content: '';
          width: 17px;
          height: 15px;
          background: url("../../assets/img/border-arrow.png");
          right: 0;
          top: 0;
          transform: rotate(180deg);
        }
      }
    }


    .dashboard-top, .dashboard-top-big {
      position: absolute;
      top: -31px;
      left: -2px;


      .dashboard-top-title {
        position: relative;
        font-size: 18px;
        color: #77C6FF;
        width: 155px;
        text-align: center;
        line-height: 31px;
        overflow: hidden;
        height: 100%;
      }
    }

    .dashboard-top {
      width: 453px;
      height: 31px;
      background: url("../../assets/img/db-top2.png") no-repeat;
      background-size: 100% 100%;
    }

    .dashboard-top-big {
      width: 462px;
      height: 31px;
      background: url("../../assets/img/db-top-big2.png") no-repeat;
      background-size: 100% 100%;
    }


    .item-loading{
      text-align: center;
      line-height: 200px;
      font-size: 16px;
      color: rgba(92, 197, 227, 1);
    }


</style>
