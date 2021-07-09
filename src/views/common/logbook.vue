<template>
  <!--<div ref="print">-->
    <div style="margin:0 auto;">
      <div style="text-align:center;margin-top:30px;"></div>
      <table class="table table-striped table-bordered" align="center" valign="center">
        <tr>
          <td colspan="3" class="value">
            日期：
            <el-date-picker
            v-model="dataForm.keytime"
            unlink-panels
            type="date"
            value-format="yyyy-MM-dd">
          </el-date-picker>
          </td>
          <td colspan="1" class="value" style="text-align: center">
            班别:
          </td>
          <td colspan="3" class="value">
            <el-checkbox-group v-model="dataForm.optValue">
              <el-checkbox  false-label='null' :true-label="item.id" :value="item.id" v-for="item in dataForm.opt">{{item.name}}</el-checkbox>
            </el-checkbox-group>
          </td>
          <td colspan="3" class="value">
            工站:
            <el-select  v-model="dataForm.lineType" placeholder="工站" clearable filterable>
              <el-option v-for="(item,index) in lineTypes" :key="index" :label="item.lineType" :value="item.lineType" >
              </el-option>
            </el-select>
          </td>
          <!--<td class="column" colspan="10" style="text-align: center">PVD Line Leader Standard Work 生产班长标准工作表</td>-->
        </tr>
        <tr>
          <td rowspan="2" class="value" style="text-align: center">
            出勤
          </td>
          <td class="value" style="text-align: center">
            总人力
          </td>
          <td class="value" style="text-align: center">
            应到
          </td>
          <td class="value" style="text-align: center">
            实到
          </td>
          <td class="value" style="text-align: center">
            休息
          </td>
          <td class="value" style="text-align: center">
            事假
          </td>
          <td class="value" style="text-align: center">
            病假
          </td>
          <td class="value" style="text-align: center">
            其它假
          </td>
          <td class="value" style="text-align: center">
            旷工
          </td>
          <td class="value" style="text-align: center">
            人均产出
          </td>
        </tr>
        <tr>
          <td class="value">
            <span class="input__inner" contenteditable="true"></span>
          </td>
          <td class="value">
            <span class="input__inner" contenteditable="true"></span>
          </td>
          <td class="value">
            <span class="input__inner" contenteditable="true"></span>
          </td>
          <td class="value">
            <span class="input__inner" contenteditable="true"></span>
          </td>
          <td class="value">
            <span class="input__inner" contenteditable="true"></span>
          </td>
          <td class="value">
            <span class="input__inner" contenteditable="true"></span>
          </td>
          <td class="value">
            <span class="input__inner" contenteditable="true"></span>
          </td>
          <td class="value">
            <span class="input__inner" contenteditable="true"></span>
          </td>
          <td class="value">
            <span class="input__inner" contenteditable="true"></span>
          </td>
        </tr>
        <!--<tr>-->
          <!--<td class="column" colspan="10" style="text-align: center">PVD Line Leader Standard Work 生产班长标准工作表</td>-->
        <!--</tr>-->
        <!--<tr>-->
          <!--<td colspan="2" class="value">-->
            <!--姓名： <span class="input__inner" contenteditable="true"></span>-->
          <!--</td>-->
          <!--<td colspan="2" class="value">-->
            <!--直属主管： <span class="input__inner" contenteditable="true"></span>-->
          <!--</td>-->
          <!--<td colspan="2" class="value">-->
            <!--线别：<span class="input__inner" contenteditable="true"></span>-->
          <!--</td>-->
          <!--<td colspan="2" class="value">-->
            <!--班别：<span class="input__inner" contenteditable="true"></span>-->
          <!--</td>-->
          <!--<td colspan="2" class="value">-->
            <!--直属主管工作确认：<span class="input__inner" contenteditable="true"></span>-->
          <!--</td>-->
        <!--</tr>-->
        <!--<tr>-->
          <!--<td colspan="2" class="value">-->
            <!--岗位： <span class="input__inner" contenteditable="true"></span>-->
          <!--</td>-->
          <!--<td colspan="2" class="value">-->
            <!--Line leader：<span class="input__inner" contenteditable="true"></span>-->
          <!--</td>-->
          <!--<td colspan="2" class="value">-->
            <!--日期：<span class="input__inner" contenteditable="true"></span>-->
          <!--</td>-->
          <!--<td colspan="4" class="value">-->
            <!--版本：<span class="input__inner" contenteditable="true"></span>-->
          <!--</td>-->
        <!--</tr>-->
        <!--<tr>-->
          <!--<td colspan="2" class="value">-->
          <!--</td>-->
          <!--<td colspan="2" class="value" style="text-align: center">-->
            <!--每天的工作任务-->
          <!--</td>-->
          <!--<td colspan="4" class="value" style="text-align: center">-->
            <!--工作结果-->
          <!--</td>-->
          <!--<td colspan="2" class="value" style="text-align: center">-->
            <!--异常记录/处理方法-->
          <!--</td>-->
        <!--</tr>-->
        <!--<tr>-->
          <!--<td colspan="4" class="column" style="text-align: center">-->
            <!--交接班-->
          <!--</td>-->
          <!--<td colspan="4" class="value">-->
          <!--</td>-->
          <!--<td colspan="2" class="value">-->
          <!--</td>-->
        <!--</tr>-->
<!-- -        <tr>-->
          <!--<td class="value" style="text-align: center">-->
            <!--1-->
          <!--</td>-->
          <!--<td colspan="2" class="value">-->
            <!--前一班产能完成状况交接-->
          <!--</td>-->
          <!--<td colspan="4" class="value">-->
            <!--专案：-->
            <!--<el-select style="width: 120px" v-model="cacheData.project" clearable>-->
              <!--<el-option v-for="(item,index) in dataForm.project" :key="index" :label="item.label" :value="item.value" >-->
              <!--</el-option>-->
            <!--</el-select>-->
            <!--目标：-->
            <!--<input class="input__inner">PCS,-->
            <!--实际：-->
            <!--<input class="input__inner">PCS,-->
            <!--达成率：-->
            <!--<input class="input__inner">%,-->
            <!--未达成原因说明：-->
            <!--<input class="input__inner">-->
          <!--</td>-->
          <!--<td colspan="2" class="value">-->
          <!--</td>-->
        <!--</tr>-->
        <!--<tr>-->
          <!--<td class="value" style="text-align: center">-->
            <!--2-->
          <!--</td>-->
          <!--<td colspan="2" class="value">-->
            <!--前一班品质状况交接-->
          <!--</td>-->
          <!--<td colspan="4" class="value">-->
            <!--专案：-->
            <!--<el-select style="width: 120px" v-model="cacheData.project" clearable>-->
              <!--<el-option v-for="(item,index) in dataForm.project" :key="index" :label="item.label" :value="item.value" >-->
              <!--</el-option>-->
            <!--</el-select>-->
            <!--目标：-->
            <!--<input class="input__inner">PCS,-->
            <!--实际：-->
            <!--<input class="input__inner">PCS,-->
            <!--达成率：-->
            <!--<input class="input__inner">%,-->
            <!--未达成原因说明：-->
            <!--<input class="input__inner">-->
          <!--</td>-->
          <!--<td colspan="2" class="value">-->
          <!--</td>-->
        <!--</tr>-->
        <!--<tr>-->
          <!--<td class="value" style="text-align: center">-->
            <!--3-->
          <!--</td>-->
          <!--<td colspan="2" class="value">-->
            <!--WIP状况交接-->
          <!--</td>-->
          <!--<td colspan="4" class="value">-->
            <!--专案：-->
            <!--<el-select style="width: 120px" v-model="cacheData.project" clearable>-->
              <!--<el-option v-for="(item,index) in dataForm.project" :key="index" :label="item.label" :value="item.value" >-->
              <!--</el-option>-->
            <!--</el-select>-->
            <!--目标：-->
            <!--<input class="input__inner">PCS,-->
            <!--实际：-->
            <!--<input class="input__inner">PCS,-->
            <!--达成率：-->
            <!--<input class="input__inner">%,-->
            <!--未达成原因说明：-->
            <!--<input class="input__inner">-->
          <!--</td>-->
          <!--<td colspan="2" class="value">-->
          <!--</td>-->
        <!--</tr>-->
        <!--<tr>-->
          <!--<td class="value" style="text-align: center">-->
            <!--4-->
          <!--</td>-->
          <!--<td colspan="2" class="value">-->
            <!--设备、线体是否有异常，手治工具交接-->
          <!--</td>-->
          <!--<td colspan="4" class="value">-->
            <!--<el-checkbox-group v-model="dataForm.optValue" style="width: 200px;float: left">-->
              <!--&lt;!&ndash;<el-checkbox  value="1">交接完成</el-checkbox>&ndash;&gt;-->
              <!--&lt;!&ndash;<el-checkbox  value="0">异常说明</el-checkbox>&ndash;&gt;-->
              <!--<el-checkbox  false-label='null' :true-label="item.id" :value="item.id" v-for="item in dataForm.opt">{{item.name}}</el-checkbox>-->
            <!--</el-checkbox-group>-->
            <!--<input class="input__inner" style="width:300px;">-->
          <!--</td>-->
          <!--<td colspan="2" class="value">-->
          <!--</td>-->
        <!--</tr>-->
        <!--<tr>-->
          <!--<td class="value" style="text-align: center">-->
            <!--5-->
          <!--</td>-->
          <!--<td colspan="2" class="value">-->
            <!--不良物品料交接处理-->
          <!--</td>-->
          <!--<td colspan="4" class="value">-->
            <!--不良品数量：-->
            <!--<input class="input__inner">PCS,-->
            <!--处理进度：-->
            <!--<input class="input__inner">-->
          <!--</td>-->
          <!--<td colspan="2" class="value">-->
          <!--</td>-->
        <!--</tr>-->
        <!--<tr>-->
          <!--<td class="value" style="text-align: center">-->
            <!--6-->
          <!--</td>-->
          <!--<td colspan="2" class="value">-->
            <!--现场5S交接-->
          <!--</td>-->
          <!--<td colspan="4" class="value">-->
            <!--<el-checkbox-group v-model="dataForm.optValue" style="width: 200px;float: left">-->
              <!--&lt;!&ndash;<el-checkbox  value="1">交接完成</el-checkbox>&ndash;&gt;-->
              <!--&lt;!&ndash;<el-checkbox  value="0">异常说明</el-checkbox>&ndash;&gt;-->
              <!--<el-checkbox  false-label='null' :true-label="item.id" :value="item.id" v-for="item in dataForm.opt">{{item.name}}</el-checkbox>-->
            <!--</el-checkbox-group>-->
            <!--<input class="input__inner" style="width:300px;">-->
          <!--</td>-->
          <!--<td colspan="2" class="value">-->
          <!--</td>-->
        <!--</tr>-->
        <!--<tr>-->
          <!--<td class="value" style="text-align: center">-->
            <!--7-->
          <!--</td>-->
          <!--<td colspan="2" class="value">-->
            <!--开线物料准备-->
          <!--</td>-->
          <!--<td colspan="4" class="value">-->
            <!--<el-checkbox-group v-model="dataForm.optValue" style="width: 200px;float: left">-->
              <!--<el-checkbox  false-label='null' :true-label="item.id" :value="item.id" v-for="item in dataForm.opt">{{item.name}}</el-checkbox>-->
            <!--</el-checkbox-group>-->
            <!--<input class="input__inner" style="width:300px;">-->
          <!--</td>-->
          <!--<td colspan="2" class="value">-->
          <!--</td>-->
        <!--</tr>-->
        <!--<tr>-->
          <!--<td class="value" style="text-align: center">-->
            <!--8-->
          <!--</td>-->
          <!--<td colspan="2" class="value">-->
            <!--代办事项-->
          <!--</td>-->
          <!--<td colspan="4" class="value">-->
            <!--<el-checkbox-group v-model="dataForm.optValue" style="width: 200px;float: left">-->
              <!--<el-checkbox  false-label='null' :true-label="item.id" :value="item.id" v-for="item in dataForm.opt">{{item.name}}</el-checkbox>-->
            <!--</el-checkbox-group>-->
            <!--<input class="input__inner" style="width:300px;">-->
          <!--</td>-->
          <!--<td colspan="2" class="value">-->
          <!--</td>-->
        <!--</tr>-->
        <!--<tr>-->
          <!--<td colspan="4" class="column" style="text-align: center">-->
            <!--确认计划安排-->
          <!--</td>-->
          <!--<td colspan="4" class="value">-->
          <!--</td>-->
          <!--<td colspan="2" class="value">-->
          <!--</td>-->
        <!--</tr>-->
        <!--<tr>-->
          <!--<td class="value" style="text-align: center">-->
            <!--1-->
          <!--</td>-->
          <!--<td colspan="2" class="value">-->
            <!--确认产能计划-->
          <!--</td>-->
          <!--<td colspan="4" class="value">-->
            <!--专案：-->
            <!--<el-select style="width: 120px" v-model="cacheData.project" clearable>-->
              <!--<el-option v-for="(item,index) in dataForm.project" :key="index" :label="item.label" :value="item.value" >-->
              <!--</el-option>-->
            <!--</el-select>-->
            <!--目标：-->
            <!--<input class="input__inner">PCS-->
          <!--</td>-->
          <!--<td colspan="2" class="value">-->
          <!--</td>-->

      </table>
    </div>
  <!--</div>-->
</template>
<script>
  export default {
    data () {
      return {
        dataForm: {
          lineType: '',
          optValue: '',
          opt: [{id: 1, name: '白班'}, {id: 0, name: '夜班'}],
          name: '',
          project: [{value: '1', label: 'Boston'}, {value: '2', label: 'Geneva'}, {value: '3', label: 'Zurich'}]
        },
        lineTypes: [{id: 1, lineType: 'io'}, {id: 2, lineType: 'RT/CG'}, {id: 3, lineType: 'Split'}, {id: 4, lineType: 'A基准'}, {id: 5, lineType: 'B基准'}],
        cacheData: {
          project: ''
        }
      }
    },
    props: [''],
    watch: {
    },
    computed: {
    },
    created () {

    },
    mounted () {
      // setTimeout( ()=>{
      //   // 延迟0.5秒弹出打印
      //   // 不延迟可能document还没有更新，因为数据会从后端读取出来没那么快渲染到页面
      //   this.$print(this.$refs.print)
      // }, 500)
    },
    methods: {
        clickRadio (val) {
          console.log(val)
          // if (this.dataForm.opt == val) {
          //   this.opt = 0
          // } else {
          //   this.opt = val
          // }
        }
      }
  }
</script>

<style lang="less">
  .table{
    border-collapse: collapse;
    border-spacing: 0;
    background-color: transparent;
    display: table;
    width: 98%;
    max-width: 100%;
    margin:0 auto;
  }
  .table td{
    vertical-align:middle;
    font-size: 14px;
    font-family: 'Arial Normal', 'Arial';
    color: #333333;
    padding: 8px 12px;
  }
  .table-bordered {
    border: 1px solid #ddd;
  }
  *{
    margin: 0px;
    padding: 0px;
  }
  .column{
    text-align: left;
    height:30px;
    border:1px solid #333;
    background: #f1f1f1;
  }
  .value{
    width: 10%;
    height:30px;
    border:1px solid #333;
  }
  .input__inner {
    outline:none;
    width: 120px;
    border-top-width: 0px;
    border-left-width: 0px;
    border-right-width: 0px;
    border-bottom-width: 2px;
    /*outline: medium;*/
  }

</style>
