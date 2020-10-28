<template>
  <div class="mod-config">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
      <el-form-item>
        <el-input v-model="dataForm.key" placeholder="参数名" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="getDataList()">查询</el-button>
        <el-button v-if="isAuth('store:goods:save')" type="primary" @click="addOrUpdateHandle()">新增</el-button>
        <!--<el-button v-if="isAuth('store:goods:save')"  type="warning" @click="">excel导入</el-button>-->
        <el-upload
          :show-file-list="false"
          accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
          action=""
          :on-success="fileUploadSuccess"
          :on-error="fileUploadError" :disabled="fileUploadBtnText=='正在导入'"
          :before-upload="beforeFileUpload" style="display: inline">
          <el-button  type="success" :loading="fileUploadBtnText=='正在导入'"><i class="fa fa-lg fa-level-up"
                                                                                        style="margin-right: 5px"></i>{{fileUploadBtnText}}
          </el-button>
        </el-upload>
        <el-button v-if="isAuth('store:goods:delete')" type="danger" @click="deleteHandle()" :disabled="dataListSelections.length <= 0">批量删除</el-button>
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
        prop="goodsId"
        header-align="center"
        align="center"
        label="商品ID">
      </el-table-column>
      <el-table-column
        prop="goodsName"
        header-align="center"
        align="center"
        label="商品名称">
      </el-table-column>
      <el-table-column
        prop="goodsMaterial"
        header-align="center"
        align="center"
        label="物料号">
      </el-table-column>
      <el-table-column
        prop="manufacturer"
        header-align="center"
        align="center"
        label="厂商">
      </el-table-column>
      <el-table-column
        prop="price"
        header-align="center"
        align="center"
        label="单价">
      </el-table-column>
      <el-table-column
        prop="specs"
        header-align="center"
        align="center"
        label="规格">
      </el-table-column>
      <!--<el-table-column-->
        <!--prop="materialQuality"-->
        <!--header-align="center"-->
        <!--align="center"-->
        <!--label="材质">-->
      <!--</el-table-column>-->
      <!--<el-table-column-->
        <!--prop="life"-->
        <!--header-align="center"-->
        <!--align="center"-->
        <!--label="寿命分类">-->
        <!--<template scope="scope">-->
          <!--<div v-if="scope.row.life==1">有寿命</div>-->
          <!--<div v-if="scope.row.life==2">无寿命</div>-->
          <!--<div v-if="scope.row.life==''">暂无数据</div>-->
        <!--</template>-->
      <!--</el-table-column>-->
      <el-table-column
        prop="type"
        header-align="center"
        align="center"
        label="类型">
        <template scope="scope">
          <div v-if="scope.row.type==1">普通</div>
          <div v-if="scope.row.type==2">刀具类</div>
          <div v-if="scope.row.type==3">穿戴类</div>
          <div v-if="scope.row.type==4">化学品</div>
        </template>
      </el-table-column>
      <el-table-column
        prop="createtime"
        header-align="center"
        align="center"
        label="创建时间">
      </el-table-column>
      <el-table-column
        prop="updatetime"
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
          <el-button type="text" size="small" @click="addOrUpdateHandle(scope.row.goodsId)">修改</el-button>
          <el-button type="text" size="small" @click="deleteHandle(scope.row.goodsId)">删除</el-button>
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
  import AddOrUpdate from './goods-add-or-update'
  export default {
    data () {
      return {
        dataForm: {
          key: ''
        },
        fileUploadBtnText: '导入数据',
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
      fileUploadSuccess (response, file, fileList) {
        if (response) {
          this.$message({type: response.status, message: response.msg})
        }
        // this.loadEmps()
        this.fileUploadBtnText = '导入数据'
      },
      fileUploadError (err, file, fileList) {
        this.fileUploadBtnText = '导入数据'
      },
      beforeFileUpload (file) {
        this.fileUploadBtnText = '正在导入'
        let formData = new FormData()
        formData.append('file', file)
        this.$http.post(this.$http.adornUrl('/store/goods/import'), formData)
          .then(({data}) => {
        if (data.msg === '导入成功!') {
          this.getDataList()
        } else {
          this.$message.error(data.msg)
        }
        this.fileUploadBtnText = '导入数据'
      })
      },
      // 获取数据列表
      getDataList () {
        this.dataListLoading = true
        this.$http({
          url: this.$http.adornUrl('/store/goods/list'),
          method: 'get',
          params: this.$http.adornParams({
            'page': this.pageIndex,
            'limit': this.pageSize,
            'goodsName': this.dataForm.key
          })
        }).then(({data}) => {
          if (data && data.code === 0) {
            console.log(data.page.list)
            this.dataList = data.page.list
            this.totalPage = data.page.totalCount
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
          return item.goodsId
        })
        this.$confirm(`确定对[id=${ids.join(',')}]进行[${id ? '删除' : '批量删除'}]操作?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http({
            url: this.$http.adornUrl('/store/goods/delete'),
            method: 'post',
            data: this.$http.adornData(ids, false)
          }).then(({data}) => {
            if (data && data.code === 0) {
              this.$message({
                message: '操作成功',
                type: 'success',
                duration: 1500,
                onClose: () => {
                  this.getDataList()
                }
              })
            } else {
              this.$message.error(data.msg)
            }
          })
        })
      }
    }
  }
</script>
