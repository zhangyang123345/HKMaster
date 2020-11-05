<template>
  <div class="mod-config">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
      <el-form-item>
        <el-input v-model="dataForm.store_name" placeholder="仓库" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="getDataList()">查询</el-button>
        <el-button v-if="isAuth('store:stores:save')" type="primary" @click="addOrUpdateHandle()">新增</el-button>
        <!--<el-button v-if="isAuth('store:stores:save')"  type="warning" @click="">excel导入</el-button>-->
       <!-- <el-button v-if="isAuth('store:stores:delete')" type="danger" @click="deleteHandle()" :disabled="dataListSelections.length <= 0">批量删除</el-button>-->
      </el-form-item>
    </el-form>
    <el-table
      :data="dataList"
      border
      v-loading="dataListLoading"
      style="width: 100%;">
    <!--@selection-change="selectionChangeHandle"-->
      <!--<el-table-column-->
        <!--type="selection"-->
        <!--header-align="center"-->
        <!--align="center"-->
        <!--width="50">-->
      <!--</el-table-column>-->
      <el-table-column
        prop="store_id"
        header-align="center"
        align="center"
        label="仓库id">
      </el-table-column>
      <el-table-column
        prop="store_name"
        header-align="center"
        align="center"
        label="仓库名称">
      </el-table-column>
      <el-table-column
        prop="store_type"
        header-align="center"
        align="center"
        label="仓库类型">
        <template scope="scope">
          <div v-if="scope.row.store_type==0">其他仓</div>
          <div v-if="scope.row.store_type==1">耗材仓</div>
          <div v-if="scope.row.store_type==2">化学仓</div>
        </template>
      </el-table-column>
      <el-table-column
        prop="store_volume"
        header-align="center"
        align="center"
        label="仓库容量">
      </el-table-column>
      <el-table-column
        prop="store_addr"
        header-align="center"
        align="center"
        label="仓库位置">
      </el-table-column>
      <el-table-column
        prop="duty_name"
        header-align="center"
        align="center"
        label="仓库负责人">
      </el-table-column>
      <el-table-column
        prop="duty_user"
        header-align="center"
        align="center"
        label="负责人工号">
      </el-table-column>
      <el-table-column
        prop="phone"
        header-align="center"
        align="center"
        label="负责人电话">
      </el-table-column>
      <el-table-column
        prop="set_time"
        header-align="center"
        align="center"
        label="创建时间">
      </el-table-column>
      <el-table-column
        prop="modify_time"
        header-align="center"
        align="center"
        label="修改时间">
      </el-table-column>
      <el-table-column
        fixed="right"
        header-align="center"
        align="center"
        width="150"
        label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="addOrUpdateHandle(scope.row.store_id)">修改</el-button>
          <el-button type="text" size="small" @click="deleteHandle(scope.row.store_id)">删除</el-button>
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
  import AddOrUpdate from './store-add-or-update'
  export default {
    data () {
      return {
        dataForm: {
          store_name: ''
        },
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
      AddOrUpdate
    },
    activated () {
      this.getDataList()
    },
    methods: {
      // 获取数据列表
      getDataList () {
        this.dataListLoading = true
        this.$http({
          url: this.$http.adornUrl('/store/store/findStore'),
          method: 'get',
          params: this.$http.adornParams({
            'page': this.pageIndex,
            'limit': this.pageSize,
            'store_name': this.dataForm.store_name
          })
        }).then(({data}) => {
          if (data && data.code === 0) {
          this.dataList = data.storeData.list
          this.totalPage = data.storeData.total
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
      // 新增 / 修改
      addOrUpdateHandle (id) {
        this.addOrUpdateVisible = true
        this.$nextTick(() => {
          this.$refs.addOrUpdate.init(id)
      })
      },
      // 删除
      deleteHandle (id) {
        var ids = id ? [id] : this.dataListSelections.map(item => {
          return item.storeId
        })
        this.$confirm(`确定删除?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http({
          url: this.$http.adornUrl('/store/store/delete'),
          method: 'post',
          data: this.$http.adornData(ids, false)
        }).then(({data}) => {
          if (data && data.code === 0) {
          this.getDataList()
          this.$message({
            message: '操作成功',
            type: 'success' })
        } else {
          this.$message.error("删除失败！")
        }
      })
      })
      }
    }
  }
</script>
