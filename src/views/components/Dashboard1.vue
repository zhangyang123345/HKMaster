<template>
    <div class="d-chart-item dashboard1">
        <div class="chart-item">
            <div class="arrow-top-left">
            </div>
            <div class="arrow-top-right">
            </div>
            <div style="padding-top:8px;">
            <span class="titlex1"  v-text="title0"></span><span class="titlex2"  v-text="title1"></span><span class="title3" v-text="title2"></span>
            </div>
            <vue-seamless-scroll v-if="listData.length > 0" :data="listData" class="seamless-warp" :class-option="classOption">
                    <p v-for="(item,index) in listData" :key="index">

                        <span @click="drawLine(index)" :title="item.discrip">

                        <span class="warp-test1" v-text="typeFormat(item.extype)"></span>
                        <span class="warp-test2" v-text="item.discrip"></span>
                        <span class="warp-test3" v-text="dateFormat(item.extime)"></span>
                        </span>
                    </p>

            </vue-seamless-scroll>
            <div v-else class="safeMsg">当月无异常</div>
        </div>
    </div>
</template>

<script>
    import vueSeamlessScroll from 'vue-seamless-scroll'
    export default {
        name: "Dashboard1",
        components: { //组件
            vueSeamlessScroll
        },
        // animationTime: {//移动间隔
        //   type: [Number, String],
        //   default: "0.825s"
        // },
        // direction:{//移动方向
        //     type:String,
        //     default:top,
        // },
        data() {
            return {
                title0: '异常类型',
                title1: '异常名称',
                title2: '异常时间',
                title3: '异常种类',
                listData: []
            };
        },
        computed: {
            classOption () {
                return {
                    isSingleRemUnit: true,
                    autoPlay: true,
                    step: 0.1,
                    limitMoveNum: 5,//这个是修改moveSwitch()之前的使用方法，这里的数值指的是数据条数
                    openTouch: true,
                    direction: 1 //方向 0 往下 1 往上 2向左 3向右
                }
            }
        },
        mounted () {
            this.getData()
        },
        methods: {
            dateFormat (value) {
              return value.split(" ")[0]
            },
            typeFormat (value) {
               if (value == 1) return 'Trace异常'
               if (value == 2) return '工伤事件'
               if (value == 3) return '考勤异常'
               if (value == 4) return '外部稽核'
               if (value == 5) return '内部稽核'
               if (value == 6) return '违纪事件'
               if (value == 7) return '不可记录事件'
            },
            getData () {
              this.$http({
                url: this.$http.adornUrl('/attendan/getExce'),
                method: 'post'
                // params: this.$http.adornParams({
                //   'start': this.startDate,
                //   'end': this.endDate
                // })
              }).then(({data}) => {
                if (data && data.code === 0) {
                    this.listData = data.excepts
              } else {
                this.$message.error(data.msg)
              }
            })
            },
            drawLine () {
                // alert(1)
                // alert(msg)
            }
        }
    }
</script>

<style  scoped>
    li { list-style:none; }
    .dashboard1{
        top: 475px;
        left: 32.5%;
        width: 35%;
        height: 583px;
        box-shadow: 2px -2px 8px 0px rgba(10, 47, 128, 1);
        border-radius: 4px;
        border: 2px solid rgba(5, 44, 127, 1);
    }
    .titlex1{
        color: #a9aaa5;
        font-size: 20px;
        top: 40px;
        margin-left: 2%;
        height: 44px;
    }
    .titlex2{
        color: #a9aaa5;
        font-size: 20px;
        top: 40px;
        margin-left: 30%;
        height: 44px;
    }
    .title3{
        color: #a9aaa5;
        font-size: 20px;
        top: 40px;
        margin-left: 28%;
        height: 44px;
    }
    .seamless-warp {
        height: 498px;
        overflow: hidden;
        margin-top: 10px;
    }
    .warp-test1 {
        margin-left: 2%;
        font-size: 1rem;
        font-weight: bolder;
        background: linear-gradient(to bottom, #fff, #4db6e5);
        color: transparent;
        -webkit-background-clip: text;
    }
    .warp-test2 {
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        width: 60%;
        position:absolute;left:50%;-webkit-transform:translateX(-50%);transform:translateX(-50%);
        font-size: 1rem;
        font-weight: bolder;
        background: linear-gradient(to bottom, #fff, #4db6e5);
        color: transparent;
        -webkit-background-clip: text;
    }
    .warp-test3 {
        float:right;
        margin-right: 3%;
        font-size: 1rem;
        font-weight: bolder;
        background: linear-gradient(to bottom, #fff, #4db6e5);
        color: transparent;
        -webkit-background-clip: text;
    }
    .warp-test {
        margin: 6px;
        font-size: 1rem;
        font-weight: bolder;
        background: linear-gradient(to bottom, #fff, #4db6e5);
        color: transparent;
        -webkit-background-clip: text;
    }
  .safeMsg{
    font-size: 40px;
    color: green;
    text-align: center;
    margin-top: 30%;
  }
</style>
