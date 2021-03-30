<template>
  <div class="d-chart-item DashboardR1">
    <div class="chart-item">
      <div class="arrow-top-left">
      </div>
      <div class="arrow-top-right">
      </div>
      <el-col>
      <el-row :span="1" type="flex"  class="el-row"  justify="center">
        <h1 style="color: #00b7ee">产能&品质</h1>
      </el-row>
      <el-row :span="40" type="flex"  class="el-row"  justify="center">
        <el-col>
          <div id="echarts_out" style="top:-100px;height: 520px;width: 80%;position: relative;" ></div>
        </el-col>
        <el-col>
          <div id="echarts_dds" style="top:-100px;height: 520px;width: 80%;position: relative;" ></div>
        </el-col>
      </el-row>
      </el-col>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'DashboardR1',
    data () {
      return {
        myChart: '',
        myChartdds: ''
      }
    },
    mounted () {
      this.drawLine()
    },
    methods: {
      drawLine () {
        var trafficWay = [{
          name: 'PVD',
          value: 20
        },{
          name: '阳极',
          value: 10
        },{
          name: 'DE-PVD',
          value: 30
        },{
          name: 'VI',
          value: 40
        }];
        var trafficWaydds = [{
          name: '碰伤',
          value: 20
        },{
          name: '掉膜',
          value: 10
        },{
          name: '毛刺',
          value: 30
        },{
          name: '压伤',
          value: 40
        }];
        var data = [];
        var color = ['#00ffff','#00cfff','#006ced','#ffe000','#ffa800','#ff5b00','#ff3000']
        var datadds = [];
        var colordds = ['#ffa800','#ff5b00','#ff3000','#00ffff','#00cfff','#006ced','#ffe000']
        for (var i = 0; i < trafficWay.length; i++) {
          data.push({
            value: trafficWay[i].value,
            name: trafficWay[i].name,
            itemStyle: {
              normal: {
                borderWidth: 5,
                shadowBlur: 20,
                borderColor: color[i],
                shadowColor: color[i]
              }
            }
          }, {
            value: 2,
            name: '',
            itemStyle: {
              normal: {
                label: {
                  show: false
                },
                labelLine: {
                  show: false
                },
                color: 'rgba(0, 0, 0, 0)',
                borderColor: 'rgba(0, 0, 0, 0)',
                borderWidth: 0
              }
            }
          })
        }
        for (var i = 0; i < trafficWay.length; i++) {
          datadds.push({
            value: trafficWaydds[i].value,
            name: trafficWaydds[i].name,
            itemStyle: {
              normal: {
                borderWidth: 5,
                shadowBlur: 20,
                borderColor: colordds[i],
                shadowColor: colordds[i]
              }
            }
          }, {
            value: 2,
            name: '',
            itemStyle: {
              normal: {
                label: {
                  show: false
                },
                labelLine: {
                  show: false
                },
                color: 'rgba(0, 0, 0, 0)',
                borderColor: 'rgba(0, 0, 0, 0)',
                borderWidth: 0
              }
            }
          })
        }
        // 基于准备好的dom，初始化echarts实例
        this.myChart = this.$echarts.init(document.getElementById('echarts_out'))
        this.myChartdds = this.$echarts.init(document.getElementById('echarts_dds'))
        var seriesOption = [{
          name: '',
          type: 'pie',
          clockWise: false,
          radius: [60, 64],
          hoverAnimation: false,
          itemStyle: {
            normal: {
              label: {
                show: false,
                position: 'outside',
                color: '#ddd'
              },
              labelLine: {
                length: 30,
                length2: 100,
                show: false,
                color: '#00ffff'
              }
            }
          },
          data: data
        }]
        this.myChart.setOption({
          color: color,
          title: {
            text: '产能',
            top: '48%',
            textAlign: "center",
            left: "49%",
            textStyle: {
              color: '#fff',
              fontSize: 22,
              fontWeight: '100'
            }
          },
          graphic: {
            elements: [{
              type: "image",
              z: 3,
              style: {
                width: 78,
                height: 78
              },
              left: 'center',
              top:  'center',
              position: [100, 100]
            }]
          },
          tooltip: {
            show: false
          },
          legend: {
            icon: "circle",
            orient: 'horizontal',
            data: ['PVD','阳极','DE-PVD','VI'],
            right: '37%',
            bottom: 0,
            align: 'right',
            textStyle: {
              color: "#fff"
            },
            itemGap: 30
          },
          toolbox: {
            show: false
          },
          series: seriesOption
      })
        var seriesOptiondds = [{
          name: '',
          type: 'pie',
          clockWise: false,
          radius: [60, 64],
          hoverAnimation: false,
          itemStyle: {
            normal: {
              label: {
                show: false,
                position: 'outside',
                color: '#ddd'
              },
              labelLine: {
                length: 30,
                length2: 100,
                show: false,
                color: '#00ffff'
              }
            }
          },
          data: datadds
        }]
        this.myChartdds.setOption({
          color: colordds,
          title: {
            text: '品质',
            top: '48%',
            textAlign: "center",
            left: "49%",
            textStyle: {
              color: '#fff',
              fontSize: 22,
              fontWeight: '100'
            }
          },
          graphic: {
            elements: [{
              type: "image",
              z: 3,
              style: {
                width: 78,
                height: 78
              },
              left: 'center',
              top:  'center',
              position: [100, 100]
            }]
          },
          tooltip: {
            show: false
          },
          legend: {
            icon: "circle",
            orient: 'horizontal',
            data:['碰伤','掉膜','毛刺','压伤'],
            right: '37%',
            bottom: 0,
            textStyle: {
              color: "#fff"
            },
            itemGap: 30
          },
          toolbox: {
            show: false
          },
          series: seriesOptiondds
        })
    }
  }
  }
</script>

<style lang="scss" scoped>

  .DashboardR1 {
    left: 20px;
    top: 330px;
    width: 450px;
    height: 520px;
    border: 2px solid rgba(5, 44, 127, 1);
    border-top: none;
  }
</style>
