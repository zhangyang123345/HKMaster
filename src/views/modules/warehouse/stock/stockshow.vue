<template>
  <div class="mod-config">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
      <el-form-item>
        <el-input v-model="dataForm.material_no" placeholder="料号" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="dataForm.article_name" placeholder="物品名" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="getDataList()">查询</el-button>
        <el-button v-if="isAuth('store:goods:save')" type="primary" @click="back()">返回</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="dataList"
      border
      v-loading="dataListLoading"
      @selection-change="selectionChangeHandle"
      style="width: 100%;">
      <!--<el-table-column-->
        <!--type="selection"-->
        <!--header-align="center"-->
        <!--align="center"-->
        <!--width="50">-->
      <!--</el-table-column>-->
      <el-table-column
        v-if="status==0"
        key="storeshow"
        prop="store_id"
        header-align="center"
        align="center"
        label="仓库ID">
      </el-table-column>
      <el-table-column
        prop="store_name"
        header-align="center"
        align="center"
        label="仓库名">
      </el-table-column>
      <el-table-column
        v-if="status==1"
        key="articleshow"
        width="250"
        prop="material_no"
        header-align="center"
        align="center"
        label="物料号">
      </el-table-column>
      <el-table-column
        v-if="status==1||status==2"
        prop="article_name"
        header-align="center"
        align="center"
        label="物品名">
      </el-table-column>
      <!--<el-table-column-->
        <!--v-if="status==1||status==2"-->
        <!--prop="goods_no"-->
        <!--header-align="center"-->
        <!--align="center"-->
        <!--label="物料号">-->
      <!--</el-table-column>-->
      <el-table-column
        v-if="status==1||status==2"
        prop="specs_name"
        header-align="center"
        align="center"
        label="规格">
      </el-table-column>
      <el-table-column
        v-if="status==1||status==2"
        prop="manufacturer_name"
        header-align="center"
        align="center"
        label="厂商">
      </el-table-column>
      <el-table-column
        v-if="status==1||status==2"
        prop="unit_name"
        header-align="center"
        align="center"
        label="单位">
      </el-table-column>
      <el-table-column
        v-if="status==1||status==2"
        prop="price"
        header-align="center"
        align="center"
        label="单价">
      </el-table-column>
      <el-table-column
        prop="goods_num"
        header-align="center"
        key="goods_num"
        align="center"
        label="库存">
      </el-table-column>
      <el-table-column
        prop="duty_name"
        key="duty_person"
        header-align="center"
        align="center"
        label="仓库负责人">
      </el-table-column>
      <el-table-column
        v-if="status==0"
        key="store_addr"
        prop="store_addr"
        header-align="center"
        align="center"
        label="仓库地址">
      </el-table-column>
      <!--<el-table-column-->
        <!--prop="new_time"-->
        <!--header-align="center"-->
        <!--align="center"-->
        <!--label="最新入库时间">-->
      <!--</el-table-column>-->
      <!--<el-table-column-->
        <!--v-if="status==2"-->
        <!--key="articleshow"-->
        <!--prop="inTime"-->
        <!--header-align="center"-->
        <!--align="center"-->
        <!--label="入库时间">-->
      <!--</el-table-column>-->
      <!--<el-table-column-->
        <!--v-if="status==2"-->
        <!--key="articleshow"-->
        <!--prop="special"-->
        <!--header-align="center"-->
        <!--align="center"-->
        <!--label="专案">-->
        <!--<template scope="scope">-->
          <!--<div v-show="scope.row.special==1">Alaska</div>-->
          <!--<div v-show="scope.row.special==2">Boston</div>-->
          <!--<div v-show="scope.row.special==2">Toronto</div>-->
        <!--</template>-->
      <!--</el-table-column>-->
      <!--<el-table-column-->
        <!--v-if="status==2"-->
        <!--key="articleshow"-->
        <!--prop="msgType"-->
        <!--header-align="center"-->
        <!--align="center"-->
        <!--label="状态">-->
        <!--<template scope="scope">-->
          <!--<div v-show="scope.row.msgType==1">已入库</div>-->
          <!--<div v-show="scope.row.msgType==2">待出库</div>-->
        <!--</template>-->
      <!--</el-table-column>-->
      <el-table-column
        fixed="right"
        v-if="status == 0"
        key="storeConcle"
        header-align="center"
        align="center"
        width="150"
        label="操作">
        <template slot-scope="scope">
          <el-button   type="text" size="small" @click="addOrUpdateHandle(scope.row.store_id)">进入</el-button>
          <!--<el-button  v-if="status==1" type="text" size="small" @click="storeOut(scope.row.store_id,scope.row.goods_id,scope.row.goods_num,3)">出库</el-button>
          <el-button  v-if="status==1" type="text" size="small" @click="storeOut(scope.row.store_id,scope.row.goods_id,scope.row.goods_num,4)">报废</el-button>-->
          <!--<el-button  v-if="status==2&&scope.row.msgType==1" type="text" size="small" @click="updateArticle(scope.row.msgId,2)">出库</el-button>-->
          <!--<el-button  v-if="status==2&&scope.row.msgType==2" type="text" size="small" @click="updateArticle(scope.row.msgId,1)">取消</el-button>-->
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
    <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="addOrUpdateHandle"></add-or-update>
  </div>
</template>

<script>
   import AddOrUpdate from './storeOut'
  export default {
    data () {
      return {
        dataForm: {
          key: '',
          article_no: '',
          material_no: '',
          article_name: '',
          store_id: '',
          goods_id: ''
        },
        type: 0,
        status: 0,
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
      //返回
      back(){
        this.pageIndex = 1
        this.dataForm.article_no = ''
        this.dataForm.article_name = ''
        this.dataForm.store_id = ''
        this.status = 0
        this.getDataList()
      },
      // 获取数据列表
      getDataList () {
        this.type = 0
        this.dataList = []
        this.dataListLoading = true
        this.$http({
          url: this.$http.adornUrl('/store/storesSave/queryStore'),
          method: 'get',
          params: this.$http.adornParams({
            'page': this.pageIndex,
            'limit': this.pageSize,
            'article_name': this.dataForm.article_name,
            'article_no': this.dataForm.article_no,
            'material_no': this.dataForm.material_no,
            'store_id' : this.dataForm.store_id
          })
        }).then(({data}) => {
          if (data && data.code === 0) {
          this.dataList = data.store.list
          this.totalPage = data.store.total
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
        if (this.status == 0) {
          this.getDataList()
        } else if (this.status == 1){
          this.addOrUpdateHandle(this.dataForm.store_id)
        }
      },
      // 当前页
      currentChangeHandle (val) {
        this.pageIndex = val
        if (this.status == 0) {
          this.getDataList()
        } else if (this.status == 1){
          this.addOrUpdateHandle(this.dataForm.store_id)
        }
      },
      // 多选
      selectionChangeHandle (val) {
        this.dataListSelections = val
      },
      // 物品库存
      addOrUpdateHandle (id) {
        if (id != '0') {
          this.dataForm.key = ''
        }
        if (id == undefined || id == '') {
          id = this.dataForm.store_id
        }
        // if (this.dataForm.articleId!=''){
        //   this.articleIdHandle(0)
        //   return
        // }
        this.type = 0
        this.dataForm.store_id = id
        this.status = 1
        this.dataList = []
        // this.totalPage = 0
        this.dataListLoading = true
        this.getDataList()
      },
      //弹框出库
      storeOut (storeId, id, num, type){
        this.addOrUpdateVisible = true
        this.$nextTick(() => {
          this.$refs.addOrUpdate.init(id, storeId, num, type)
      })
      },
      // 物件库存
      articleIdHandle (id) {
        if(id != 0){
          this.dataForm.goods_id = id
          this.type = 1
        }
        this.status = 1
        this.dataList = []
        this.totalPage = 0
        this.dataListLoading = true
        this.$http({
          url: this.$http.adornUrl('/stock/stockmanage/list_article'),
          method: 'get',
          params: this.$http.adornParams({
            'page': this.pageIndex,
            'limit': this.pageSize,
            'goods_id': this.dataForm.goods_id,
            'store_id': this.dataForm.store_id,
            'articleId': this.dataForm.articleId,
            'type': 1
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
      // 待出库列表
      updateArticle (id, type) {
        this.$http({
          url: this.$http.adornUrl('/stock/stockmanage/article_outing'),
          method: 'get',
          params: this.$http.adornParams({
            'msgId': id,
            'msgType': type
          })
        }).then(({data}) => {
          if (data && data.code === 0) {
          this.$message({
            message: '操作成功',
            type: 'success',
            duration: 1500,
            onClose: () => {
            this.articleIdHandle(0)
        }
        })
        } else {
          this.$message.error(data.msg)
        }
      })
      }
    }
  }
</script>
