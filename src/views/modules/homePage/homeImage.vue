<template>
  <div class="mod-config">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
      <el-form-item>
        <el-input v-model="cacheData.job_no" placeholder="工号" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="cacheData.create_user" placeholder="姓名" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-date-picker
          v-model="cacheData.keytime"
          unlink-panels
          type="daterange"
          value-format="yyyy-MM-dd"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button @click="getDataList()">查询</el-button>
        <el-upload
          :show-file-list="false"
          accept=".bmp,.jpg,.png,.tif,.gif,.pcx,.tga,.exif,.fpx,.svg,.psd,.cdr,.pcd,.dxf,.ufo,.eps,.ai,.raw,.WMF,.webp"
          action=""
          multiple
          v-if="isAuth('image:import')"
          :on-success="fileUploadSuccess"
          :on-error="fileUploadError" :disabled="fileUploadBtnText=='正在上传'"
          :before-upload="beforeFileUpload" style="display: inline">
          <el-button  type="success" :loading="fileUploadBtnText=='正在上传'"><i class="fa fa-lg fa-level-up"
                                                                             style="margin-right: 5px"></i>{{fileUploadBtnText}}
          </el-button>
        </el-upload>
        <el-button v-if="isAuth('image:active')" type="danger" @click="setActHandle()" :disabled="dataListSelections.length <= 0">激活</el-button>
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
        width="30">
      </el-table-column>
      <el-table-column
        prop="id"
        header-align="center"
        align="center"
        width="70"
        label="ID">
      </el-table-column>
      <el-table-column
        prop="create_user"
        header-align="center"
        align="center"
        label="创建人">
      </el-table-column>
      <el-table-column
        prop="job_no"
        header-align="center"
        align="center"
        label="工号">
      </el-table-column>
      <el-table-column
        prop="create_time"
        header-align="center"
        align="center"
        label="创建时间">
      </el-table-column>
      <el-table-column
        prop="url"
        header-align="center"
        align="center"
        label="预览">
        <template slot-scope="scope">
          <el-popover
            placement="left"
            width="700"
            top="200px"
            left="600px">
            <div style="text-align: center; margin: 0">
              <img  :src="requsUrl" style="width: 658px;height:567px;"/>
            </div>
            <el-button slot="reference" @click="seeQR(scope.row.url)">查看</el-button>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column
        prop="active"
        header-align="center"
        align="center"
        label="配置">
        <template slot-scope="scope">
            <el-button v-if="scope.row.active == 0" slot="reference" @click="setAct(scope.row.id , 1)">激活</el-button>
            <el-button v-if="scope.row.active == 1" slot="reference" @click="setAct(scope.row.id , 0)">关闭</el-button>
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
  </div>
</template>

<script>
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
        cacheData: {
          job_no: '',
          create_user: '',
          keytime: ''
        },
        requsUrl: '',
        fileUploadBtnText: '上传',
        dataList: [],
        skilList: [],
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
      this.getDataList()
    },
    methods: {
      fileUploadSuccess (response, file, fileList) {
        if (response) {
          this.$message({type: response.status, message: response.msg})
        }
        // this.loadEmps()
        this.fileUploadBtnText = '上传数据'
      },
      fileUploadError (err, file, fileList) {
        this.fileUploadBtnText = '上传数据'
      },
      beforeFileUpload (fileList) {
        this.fileUploadBtnText = '正在上传'
        let formData = new FormData()
        formData.append('fileItem', fileList)
        this.$http.post(this.$http.adornUrl('/image/import'), formData)
          .then(({data}) => {
          if (data && data.code === 0) {
            this.$message({
              message: '上传成功！',
              type: 'success'
            })
            this.getDataList()
          } else {
            this.$message.error(data.msg)
          }
          this.fileUploadBtnText = '上传数据'
      })
      },
      // 导出模板
      formatJson (filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => v[j]))
      },
      seeQR (data) {
        var baseUrl = window.SITE_CONFIG.baseUrl
        this.requsUrl = baseUrl + data
      },
      setAct (id , active) {
        this.$http({
          url: this.$http.adornUrl('/image/setAct'),
          method: 'post',
          params: this.$http.adornParams({
            'ids': id,
            'active': active
          })
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.getDataList()
          } else {
            this.$message.error(data.msg)
          }
      })
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
          url: this.$http.adornUrl('/image/query'),
          method: 'get',
          params: this.$http.adornParams({
            'page': this.pageIndex,
            'rows': this.pageSize,
            'job_no': this.cacheData.job_no,
            'create_user': this.cacheData.create_user,
            'keytime': this.cacheData.keytime+ ''
          })
        }).then(({data}) => {
          if (data && data.code === 0) {
          this.dataList = data.data.list
          this.totalPage = data.data.total
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
      // 激活
      setActHandle () {
        var ids = ''
        for (var len in this.dataListSelections) {
          ids += this.dataListSelections[len].id + ','
        }
        this.$confirm(`确定激活?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http({
          url: this.$http.adornUrl('/image/setAct'),
          method: 'post',
          params: this.$http.adornParams({
            'ids': ids,
            'active': 1
          })
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
