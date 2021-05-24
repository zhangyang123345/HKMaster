<template>
  <div class="mod-config">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
      <el-form-item>
        <el-input v-model="cacheData.job_no" placeholder="工号" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="cacheData.name" placeholder="姓名" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="cacheData.position" placeholder="职别" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="cacheData.department" placeholder="部门" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="cacheData.director"  placeholder="主管" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="cacheData.station"   placeholder="工站" clearable></el-input>
      </el-form-item>
        <!--<el-form-item >-->
          <!--<el-select v-model="cacheData.position" placeholder="职别" @change="getDataList">-->
            <!--<el-option v-for="(item,index) in dataForm.position" :key="index" :label="item.label" :value="item.value" >-->
            <!--</el-option>-->
          <!--</el-select>-->
        <!--</el-form-item>-->
        <!--<el-form-item >-->
          <!--<el-select v-model="cacheData.department" placeholder="部门" @change="getDataList">-->
            <!--<el-option v-for="(item,index) in dataForm.permiss" :key="index" :label="item.label" :value="item.value" >-->
            <!--</el-option>-->
          <!--</el-select>-->
        <!--</el-form-item>-->
        <!--<el-form-item >-->
          <!--<el-select v-model="cacheData.director"  placeholder="主管" @change="getDataList">-->
            <!--<el-option v-for="(item,index) in dataForm.director" :key="index" :label="item.label" :value="item.value" >-->
            <!--</el-option>-->
          <!--</el-select>-->
        <!--</el-form-item>-->
        <!--<el-form-item >-->
          <!--<el-select v-model="cacheData.station" multiple collapse-tags  placeholder="工站" @change="getDataList">-->
            <!--<el-option v-for="(item,index) in report.kinSet" :key="index" :label="item" :value="item" >-->
            <!--</el-option>-->
          <!--</el-select>-->
        <!--</el-form-item>-->
      <el-form-item>
        <el-button @click="getDataList()">查询</el-button>
        <!--<el-button v-if="isAuth('store:goods:save')"  type="warning" @click="">excel导入</el-button>-->
        <el-upload
          :show-file-list="false"
          accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
          action=""
          v-if="isAuth('cotalent:import')"
          :on-success="fileUploadSuccess"
          :on-error="fileUploadError" :disabled="fileUploadBtnText=='正在导入'"
          :before-upload="beforeFileUpload" style="display: inline">
          <el-button  type="success" :loading="fileUploadBtnText=='正在导入'"><i class="fa fa-lg fa-level-up"
                                                                             style="margin-right: 5px"></i>{{fileUploadBtnText}}
          </el-button>
        </el-upload>
        <el-button v-if="isAuth('cotalent:report')" type="primary" @click="exportArt()">导出信息</el-button>
        <el-button v-if="isAuth('cotalent:delete')" type="danger" @click="deleteHandle()" :disabled="dataListSelections.length <= 0">删除</el-button>
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
        prop="name"
        header-align="center"
        align="center"
        width="70"
        label="姓名">
      </el-table-column>
      <el-table-column
        prop="job_no"
        header-align="center"
        align="center"
        label="工号">
      </el-table-column>
      <el-table-column
        prop="sex"
        header-align="center"
        align="center"
        width="60"
        label="性别">
      </el-table-column>
      <el-table-column
        prop="barth"
        header-align="center"
        align="center"
        label="出生日期">
      </el-table-column>
      <el-table-column
        prop="education"
        header-align="center"
        align="center"
        label="学历">
      </el-table-column>
      <el-table-column
        prop="major"
        header-align="center"
        align="center"
        label="专业">
      </el-table-column>
      <el-table-column
        prop="director"
        header-align="center"
        align="center"
        label="主管">
      </el-table-column>
      <el-table-column
        prop="position"
        header-align="center"
        align="center"
        label="职称">
      </el-table-column>
      <el-table-column
        prop="line_type"
        header-align="center"
        align="center"
        label="线别">
      </el-table-column>
      <el-table-column
        prop="station"
        header-align="center"
        align="center"
        label="工站">
        <template slot-scope="scope">
          <el-popover
            placement="left"
            width="220">
            <div style="text-align: center; margin: 0">
                <div style="float:left;margin:3px;width:90px;color:white;border-radius: 17px;height: 35px;line-height: 33px;" v-for="(item,index) in skilList" :key="index" :style="item.color">{{item.name}}</div>
            </div>
            <el-button slot="reference" @click="seeQR(scope.row.station)">查看</el-button>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column
        prop="skill"
        header-align="center"
        align="center"
        label="技能">
      </el-table-column>
      <el-table-column
        prop="hobby"
        header-align="center"
        align="center"
        label="爱好">
      </el-table-column>
      <el-table-column
        prop="entry_date"
        header-align="center"
        align="center"
        label="入职日期">
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
          name: '',
          director: '',
          department: '',
          position: '',
          station: ''
        },
        fileUploadBtnText: '导入数据',
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
        this.fileUploadBtnText = '导入数据'
      },
      fileUploadError (err, file, fileList) {
        this.fileUploadBtnText = '导入数据'
      },
      beforeFileUpload (file) {
        this.fileUploadBtnText = '正在导入'
        let formData = new FormData()
        formData.append('file', file)
        this.$http.post(this.$http.adornUrl('/cotalent/import'), formData)
          .then(({data}) => {
          if (data && data.code === 0) {
          this.$message({
            message: "导入成功！",
            type: 'success'
          });
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
      seeQR (data) {
        var list = []
        var objec = JSON.parse(data)

        for (var key in objec) {
          var  st = new Object()
          st.name = key
          if (objec[key].indexOf('入') >= 0) {
            st.color = 'background:rgb(2, 159, 252);'
          } else if (objec[key].indexOf('掌') >= 0) {
            st.color = 'background:rgb(67, 57, 242);'
          } else if (objec[key].indexOf('熟') >= 0) {
            st.color = 'background:rgb(255, 182, 15);'
          } else if (objec[key].indexOf('精') >= 0) {
            st.color = 'background:red;'
          }
          list.push(st)
        }
        console.log(list)
        this.skilList = list
      },
      //导出数据
      exportArt () {
        this.$http({
          url: this.$http.adornUrl('/cotalent/search'),
          method: 'get',
          params: this.$http.adornParams({
            'searchReport': 1,
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
          console.log('---------------------------------------')
          console.log(data)
          if (data && data.code === 0) {
          var cacheData = data.cotalent.list
          require.ensure([], () => {
            const { export_json_to_excel } = require('@/vendor/Export2Excel')

            const tHeader = ['工号', '姓名', '电话', '性别', '部门', '职称', '成本别', '线别', '入职日期', '出生日期', '主管', '学历', '专业', '技能', '能力掌握']
            // 上面设置Excel的表格第一行的标题
            const filterVal = ['job_no', 'name', 'phone', 'sex', 'department', 'position', 'cost_category', 'line_type', 'entry_date', 'barth', 'director', 'education', 'major', 'skill', 'station']
            const data = this.formatJson(filterVal, cacheData)
            export_json_to_excel(tHeader, data, '人才信息')
        })
        } else {
          this.$message.error(data.msg)
        }
      })
      },
      // 获取数据列表
      getDataList () {
        this.dataListLoading = true
        // var stage = ''
        // for (var x in this.cacheData.station) {
        //   stage += this.cacheData.station[x] + ','
        // }
        //stage = stage.substring(0, stage.length - 1)
        this.$http({
          url: this.$http.adornUrl('/cotalent/search'),
          method: 'get',
          params: this.$http.adornParams({
            'page': this.pageIndex,
            'rows': this.pageSize,
            'job_no': this.cacheData.job_no,
            'name': this.cacheData.name,
            'director': this.cacheData.director,
            'department': this.cacheData.department,
            'position': this.cacheData.position,
            'station': this.cacheData.station
          })
        }).then(({data}) => {
          if (data && data.code === 0) {
          this.dataList = data.cotalent.list
          this.totalPage = data.cotalent.total
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
          url: this.$http.adornUrl('/cotalent/delete'),
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
