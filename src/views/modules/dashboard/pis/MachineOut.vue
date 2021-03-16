<template>
  <el-form>

    <el-form-item>
      <el-date-picker
        v-model="dataForm.keytow"
        unlink-panels
        type="daterange"
        value-format="yyyy-MM-dd"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期">
      </el-date-picker>
      <el-button @click="getData()">查询</el-button>
    </el-form-item>
  <div>
    <span style="cursor:pointer;"><p class="ptitle">PIS机台达成率</p></span>
    <el-table
      :data="dataList"
      style="width: 100%"
      row-key="id"
      border
      lazy
      :load="load"
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
      <el-table-column
        prop="name"
        header-align="center"
        align="center"
        label="名称">
      </el-table-column>
      <el-table-column
        prop="Yield"
        header-align="center"
        align="center"
        label="达成率">
        <template scope="scope">
          <div>{{(scope.row.Yield*100).toFixed(1)}}%</div>
          <!--<div v-if="scope.row.msgType==2">待出库</div>-->
        </template>
      </el-table-column>
    </el-table>
  </div>
  </el-form>
</template>

<script>
  import { treeDataTranslate } from '@/utils'
  import moment from "moment"
    export default {
      data () {
        return {
          dataForm: {
            keytow: ''
          },
          dataList: [],
          dataListNow: [{name: '', id: '', parentId: ''}],
          Msg: {},
          bigStation: '',
          Building: '',
          Cell: '',
          Station: '',
          MachineNo: '',
          OutDate: '',
          McClass: ''
        }
      },
      activated () {
        this.getData()
      },
      mounted () {
        this.getData()
      },
      created () {
// 当前设定的日期时间
        this.dataForm.keytow = [moment(moment().valueOf()).format('YYYY-MM-DD'), moment(moment().valueOf()).format('YYYY-MM-DD')]
        console.log(this.dataForm.keytow)
      },
      methods: {
        getValue (id, level) {
          console.log('-------------------------------')
          console.log(this.dataListNow)
          console.log('-------------------------------')
          console.log('-------------------------------')
          for (var i = 0; i < this.dataListNow.length; i++) {
            if (id == this.dataListNow[i].id) {
              if (level == 0) {
                this.bigStation = this.dataListNow[i].name
              } else if (level == 1) {
                this.Building = this.dataListNow[i].name
              } else if (level == 2) {
                this.Cell = this.dataListNow[i].name
              } else if (level == 3) {
                this.Station = this.dataListNow[i].name
              } else if (level == 4) {
                this.MachineNo = this.dataListNow[i].name
              } else if (level == 5) {
                this.OutDate = this.dataListNow[i].name
              } else if (level == 6) {
                this.McClass = this.dataListNow[i].name
              }
              id = this.dataListNow[i].parentId
              level = Number(level) - 1
              break
            }
            if (i == this.dataListNow.length - 1) {
              level = -1
            }
          }
          if (Number(level) >= 0) {
            this.getValue(id, level)
          }
        },
        load (tree, treeNode, resolve) {
          console.log('-------------------------------')
          console.log(tree)
          if (treeNode.level == 0) {
            this.bigStation = tree.name
          } else {
            this.getValue(tree.id, treeNode.level)
          }
          // alert('bigStation=--' + this.bigStation)
          // alert('Building=--' + this.Building)
          // alert('Cell=--' + this.Cell)
          this.$http({
            url: this.$http.adornUrl('/homeCentrol/getMachineMsg'),
            method: 'post',
            params: this.$http.adornParams({
              'id': tree.id,
              'keytow': this.dataForm.keytow + '',
              'bigStation': this.bigStation,
              'Building': this.Building,
              'Cell': this.Cell,
              'Station': this.Station,
              'MachineNo': this.MachineNo,
              'OutDate': this.OutDate,
              'McClass': this.McClass,
              'type': treeNode.level + 1
            })
          }).then(({data}) => {
            resolve(data.list)
            console.log(data.list)
            for (var i = 0; i < data.list.length; i++) {
              this.Msg = {}
              this.Msg.name = data.list[i].name
              this.Msg.id = data.list[i].id
              this.Msg.parentId = tree.id
              this.dataListNow.push(this.Msg)
            }
          })
        },
        getData () {
          // var dataList1 = [{
          //   id: 1,
          //   SN: 'FM70165005BQ44Y380',
          //   name: '2D-3',
          //   time: '2020-07-16 19:19',
          //   type: '三伤',
          //   parentId: 0
          // }, {
          //   id: 2,
          //   SN: 'FM70166005BQ4Y3FG08',
          //   name: '清洗-1',
          //   time: '2020-07-16 19:20',
          //   type: '麻点',
          //   parentId: 1
          // }, {
          //   id: 3,
          //   SN: 'FM70165005BQ44Y3808',
          //   name: '清洗-2',
          //   time: '2020-07-16 16:50',
          //   type: '三伤',
          //   parentId: 2
          // }, {id: 4, SN: 'FM70165005BQ44Y3808', name: '清洗-2', time: '2020-07-16 16:50', type: '三伤', parentId: 3}]
          // this.dataList = treeDataTranslate(dataList1, 'id')
          console.log('------------------')
          this.$http({
            url: this.$http.adornUrl('/homeCentrol/getMachineMsg'),
            method: 'post',
            params: this.$http.adornParams({
              'type': 0,
              'keytow': this.dataForm.keytow + ''
            })
          }).then(({data}) => {
            this.dataList = data.list
            console.log('------------------')
            console.log(this.dataList)
            for (var i = 0; i < this.dataList.length; i++) {
              this.Msg = {}
              this.Msg.name = this.dataList[i].name
              this.Msg.id = this.dataList[i].id
              this.Msg.parentId = 0
              this.dataListNow[i] = this.Msg
              // this.dataListNow[i] = this.dataList[i].name
              // this.dataListNow[i] = this.dataList[i].id
              // this.dataListNow[i] = 0
            }
            console.log(this.dataListNow)
          })
        }
      }
    }
</script>

<style scoped>
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
</style>
