<template>
  <div class="mod-config">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
      <el-form-item>
        <el-input v-model="dataForm.key" placeholder="ID" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-select  v-model="dataForm.type" placeholder="请选择警报类型" clearable>
          <el-option v-for="(item,index) in typeAryy" :key="index" :label="item.value" :value="item.id" >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select  v-model="dataForm.stata" placeholder="请选择警报状态" clearable>
          <el-option v-for="(item,index) in stataAryy" :key="index" :label="item.value" :value="item.id" >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-date-picker
          v-model="dataForm.keytwo"
          unlink-panels
          type="daterange"
          value-format="yyyy-MM-dd HH:mm:ss"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button @click="getDataList()">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="dataList"
      border
      v-loading="dataListLoading"
      @selection-change="selectionChangeHandle"
      style="width: 100%;">
      <el-table-column
        type="selection"
        header-align="center"
        align="center"
        width="50">
      </el-table-column>
      <el-table-column
        prop="warningId"
        header-align="center"
        align="center"
        label="警告信息ID">
      </el-table-column>
      <el-table-column
        prop="goodsName"
        header-align="center"
        align="center"
        label="物品">
      </el-table-column>
      <el-table-column
        prop="storename"
        header-align="center"
        align="center"
        label="仓库/制程">
      </el-table-column>
      <el-table-column
        prop="slotNum"
        header-align="center"
        align="center"
        label="槽号">
      </el-table-column>
      <el-table-column
        prop="type"
        header-align="center"
        align="center"
        label="类型">
        <template scope="scope">
          <div v-if="scope.row.type==1">安全库存警报</div>
          <div v-if="scope.row.type==2">安全库存警报</div>
          <div v-if="scope.row.type==3">建浴信息警报</div>
        </template>
      </el-table-column>
      <el-table-column
        prop="msg"
        header-align="center"
        align="center"
        label="警报内容">
      </el-table-column>
      <el-table-column
        prop="stata"
        header-align="center"
        align="center"
        label="状态">
        <template scope="scope">
          <div v-if="scope.row.stata==0">未处理</div>
          <div v-if="scope.row.stata==1">处理中</div>
          <div v-if="scope.row.stata==2">处理完成</div>
        </template>
      </el-table-column>
      <el-table-column
        prop="sTime"
        header-align="center"
        align="center"
        label="开始时间">
      </el-table-column>
      <el-table-column
        prop="eTime"
        header-align="center"
        align="center"
        label="结束时间">
      </el-table-column>
      <el-table-column
        fixed="right"
        header-align="center"
        align="center"
        width="150"
        label="操作">
        <template slot-scope="scope">
          <div v-if="scope.row.stata==1&&scope.row.type==1">处理中</div>
          <div v-if="scope.row.stata==1&&scope.row.type==2">处理中</div>
          <div v-if="scope.row.stata==2">完成</div>
          <el-button type="text"  v-if="scope.row.stata==0" size="small" @click="ChangeHandle(scope.row.warningId,1)">处理</el-button>
          <el-button type="text"  v-if="scope.row.stata==1&&scope.row.type==3" size="small" @click="ChangeHandle(scope.row.warningId,2)">处理完成</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="sizeChangeHandle"
      @current-change="currentChangeHandle"
      :current-page="pageIndex"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="pageSize"
      :total="totalPage"
      layout="total, sizes, prev, pager, next, jumper">
    </el-pagination>
    <!-- 弹窗, 新增 / 修改 -->
    <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList"></add-or-update>
  </div>
</template>

<script>
  // import AddOrUpdate from './goods-add-or-update'
  export default {
    data () {
      return {
        dataForm: {
          key: '',
          keytwo: '',
          stata: '',
          type: ''
        },
        stataAryy: [{id: '0', value: '未处理'}, {id: '1', value: '处理中'}, {id: '2', value: '处理完成'}],
        typeAryy: [{id: '1', value: '低于安全库存警报'}, {id: '2', value: '高于安全库存警报'}, {id: '3', value: '建浴信息警报'}],
        dataList: [],
        pageIndex: 1,
        pageSize: 10,
        totalPage: 0,
        dataListLoading: false,
        dataListSelections: [],
        addOrUpdateVisible: false
      }
    },
    components: {
    },
    activated () {
      this.init()
    },
    methods: {
      init () {
        this.dataForm.key = this.$router.apps[0]._route.params.warningId
        this.dataForm.keytwo = ''
        this.dataForm.stata = ''
        this.dataForm.type = ''
        this.getDataList()
      },
      // 获取数据列表
      getDataList () {
        this.dataListLoading = true
        this.$http({
          url: this.$http.adornUrl('/warning/msg/list'),
          method: 'get',
          params: this.$http.adornParams({
            'page': this.pageIndex,
            'limit': this.pageSize,
            'key_time': this.dataForm.keytwo + '',
            'warningId': this.dataForm.key,
            'stata': this.dataForm.stata,
            'type': this.dataForm.type
          })
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.dataList = data.list
            this.totalPage = data.length
          } else {
            this.dataList = []
            this.totalPage = 0
          }
          this.dataListLoading = false
        })
      },
      // 每页数
      sizeChangeHandle (val) {
        this.pageSize = val
        this.pageIndex = 1
        this.getDataList()
      },
      // 当前页
      currentChangeHandle (val) {
        this.pageIndex = val
        this.getDataList()
      },
      // 多选
      selectionChangeHandle (val) {
        this.dataListSelections = val
      },
      // 设置处理中
      ChangeHandle (warningId,stata) {
        this.dataListLoading = true
        this.$http({
          url: this.$http.adornUrl('/warning/msg/updateStata'),
          method: 'get',
          params: this.$http.adornParams({
            'warningId': warningId,
            'stata': stata
          })
        }).then(({data}) => {
          if (data && data.code === 0) {
          this.$message.success('成功')
          this.getDataList()
        } else {
          this.$message.error(data.msg)
        }
        this.dataListLoading = false
      })
      }
    }
  }
</script>
