<template>
  <div class="mod-config">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
      <el-form-item>
        <el-input v-model="dataForm.key" placeholder="商品名称" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="dataForm.manufacturer" placeholder="厂商" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="dataForm.specs" placeholder="规格" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="dataForm.unit" placeholder="单位" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="dataForm.kind" placeholder="二类" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="dataForm.class" placeholder="三类" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="getDataList()">查询</el-button>
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
        <el-button v-if="isAuth('store:goods:save')" type="primary" @click="template()">导出模板</el-button>
        <el-button v-if="isAuth('store:goods:save')" type="primary" @click="exportArt()">导出信息</el-button>
        <el-button v-if="isAuth('store:goods:delete')" type="danger" @click="deleteHandle()" :disabled="dataListSelections.length <= 0">删除</el-button>
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
        prop="article_no"
        header-align="center"
        align="center"
        width="250"
        label="商品编码">
      </el-table-column>
      <el-table-column
        prop="article_name"
        header-align="center"
        align="center"
        label="商品名称">
      </el-table-column>
      <el-table-column
        prop="manufacturer_name"
        header-align="center"
        align="center"
        label="厂商">
      </el-table-column>
      <el-table-column
      prop="fam_name"
      header-align="center"
      align="center"
      label="大类">
      </el-table-column>
      <el-table-column
      prop="kin_name"
      header-align="center"
      align="center"
      label="二类">
      </el-table-column>
      <el-table-column
      prop="clas_name"
      header-align="center"
      align="center"
      label="三类">
      </el-table-column>
      <el-table-column
        prop="price"
        header-align="center"
        align="center"
        label="单价">
      </el-table-column>
      <el-table-column
        prop="unit_name"
        header-align="center"
        align="center"
        label="单位">
      </el-table-column>
      <el-table-column
        prop="specs_name"
        header-align="center"
        align="center"
        label="规格">
      </el-table-column>
      <el-table-column
        prop="life"
        header-align="center"
        align="center"
        label="寿命(天)">
      </el-table-column>
      <!--<el-table-column-->
        <!--prop="type_no"-->
        <!--header-align="center"-->
        <!--align="center"-->
        <!--label="类型">-->
        <!--<template scope="scope">-->
          <!--<div v-if="scope.row.type_no==1">普通</div>-->
          <!--<div v-if="scope.row.type_no==2">刀具类</div>-->
          <!--<div v-if="scope.row.type_no==3">穿戴类</div>-->
          <!--<div v-if="scope.row.type_no==4">化学品</div>-->
        <!--</template>-->
      <!--</el-table-column>-->
      <el-table-column
        prop="create_time"
        header-align="center"
        align="center"
        label="创建时间">
      </el-table-column>
      <!--<el-table-column-->
        <!--fixed="right"-->
        <!--header-align="center"-->
        <!--align="center"-->
        <!--width="80"-->
        <!--label="操作">-->
        <!--<template slot-scope="scope">-->
          <!--<el-button type="text" size="small" @click="addOrUpdateHandle(scope.row.article_no,scope.row.article_id)">修改</el-button>-->
         <!--&lt;!&ndash; <el-button type="text" size="small" @click="deleteHandle(scope.row.goodsId)">删除</el-button>&ndash;&gt;-->
        <!--</template>-->
      <!--</el-table-column>-->
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
          key: '',
          manufacturer: '',
          specs: '',
          unit: '',
          class: '',
          kind: ''
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
        this.$http.post(this.$http.adornUrl('/code/import'), formData)
          .then(({data}) => {
        if (data.msg === '导入成功!') {
          this.getDataList()
        } else {
          this.$message.error(data.msg)
        }
        this.fileUploadBtnText = '导入数据'
      })
      },
      // 导出模板
      formatJson (filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => v[j]))
      },
      //导出数据
      exportArt () {
        this.$http({
          url: this.$http.adornUrl('/code/export'),
          method: 'post',
          params: this.$http.adornParams({
            'page': this.pageIndex,
            'rows': this.pageSize,
            'goods_name': this.dataForm.key,
            'manufacturer_name':this.dataForm.manufacturer,
            'specs_name':this.dataForm.specs,
            'unit_naem':this.dataForm.unit,
            'kind_naem':this.dataForm.kind,
            'classification_name':this.dataForm.class
          })
        }).then(({data}) => {
          if (data && data.code === 0) {
            var cacheData = data.list
              require.ensure([], () => {
                const { export_json_to_excel } = require('@/vendor/Export2Excel')
                const tHeader = ['物品编码', '品名', '厂商代码', '厂商', '保质期', '单价', '规格', '单位', '一类', '二类', '三类']
                // 上面设置Excel的表格第一行的标题
                const filterVal = ['article_no', 'article_name', 'manufacturer_no', 'manufacturer_name', 'life', 'price', 'specs_name', 'unit_name', 'fam_name', 'kin_name', 'clas_name']
                const data = this.formatJson(filterVal, cacheData)
                export_json_to_excel(tHeader, data, '物品详细信息')
            })
          } else {
            this.$message.error(data.msg)
          }
      })
      },
      template () {
        require.ensure([], () => {
          const { export_json_to_excel } = require('@/vendor/Export2Excel')
          const tHeader = ['料号', '品名', '厂商代码', '厂商', '保质期', '单价', '规格', '单位', '一类', '二类', '三类']
          // 上面设置Excel的表格第一行的标题
          const filterVal = ['article_no', 'article_name', 'manufacturer_no', 'manufacturer_name', 'life', 'price', 'specs', 'unit', 'family', 'kind', 'class']
          const list = [{'article_no':'CCUN07616', 'article_name':'大美工刀', 'manufacturer_no':'19501028', 'manufacturer_name':'震坤行', 'life':'', 'price':'2.59', 'specs':'1把/包', 'unit':'把', 'family':'耗材', 'kind':'刀具', 'class':'美工刀'},
                         {'article_no':'CLND04138', 'article_name':'无铁劳保鞋 牛刚王 009', 'manufacturer_no':'250651', 'manufacturer_name':'兴百汇', 'life':'', 'price':'86.182', 'specs':'10双/箱', 'unit':'双', 'family':'耗材', 'kind':'鞋子', 'class':'劳保鞋'},
            {'article_no':'CLND04139', 'article_name':'无尘服', 'manufacturer_no':'250651', 'manufacturer_name':'兴百汇', 'life':'', 'price':'86.182', 'specs':'50件/箱', 'unit':'件', 'family':'耗材', 'kind':'衣服', 'class':'无尘服'}]
          const data = this.formatJson(filterVal, list)
          export_json_to_excel(tHeader, data, '物品信息模板')
      })
      },
      // 获取数据列表
      getDataList () {
        this.dataListLoading = true
        this.$http({
          url: this.$http.adornUrl('/code/queryArtic'),
          method: 'get',
          params: this.$http.adornParams({
            'page': this.pageIndex,
            'rows': this.pageSize,
            'goods_name': this.dataForm.key,
            'manufacturer_name':this.dataForm.manufacturer,
            'specs_name':this.dataForm.specs,
            'unit_name':this.dataForm.unit,
            'kind_name':this.dataForm.kind,
            'classification_name':this.dataForm.class
          })
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.dataList = data.article.list
            this.totalPage = data.article.total
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
      addOrUpdateHandle (article_no,article_id) {
        this.addOrUpdateVisible = true
        this.$nextTick(() => {
          this.$refs.addOrUpdate.init(article_no,article_id)
        })
      },
      // 删除
      deleteHandle () {
        var ids = ''
        for (var len in this.dataListSelections) {
          ids += this.dataListSelections[len].article_id + ','
        }
        this.$confirm(`确定删除?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http({
            url: this.$http.adornUrl('/code/deletArtic'),
            method: 'post',
            params: this.$http.adornParams({"ids" : ids})
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
