<template>
  <div class="mod-config">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
      <!--<el-form-item>-->
        <!--<el-input v-model="dataForm.articleId" placeholder="物件号" clearable></el-input>-->
      <!--</el-form-item>-->
      <el-form-item>
        <el-autocomplete
          v-model="dataForm.article_name"
          :fetch-suggestions="querySearchAsync"
          placeholder="商品名"
          @select="handleSelect"
        ></el-autocomplete>
      </el-form-item>
      <el-form-item>
        <el-select  v-model="dataForm.store_id" placeholder="请选择仓库" clearable>
          <el-option v-for="(item,index) in storeArr" :key="index" :label="item.store_name" :value="item.store_id" >
          </el-option>
        </el-select>
      </el-form-item>
      <!--<el-form-item>-->
        <!--<el-input v-model="dataForm.department" placeholder="需求部门" clearable ></el-input>-->
      <!--</el-form-item>-->
      <el-form-item>
        <el-select  v-model="dataForm.msg_type" placeholder="请选择类型" clearable>
          <el-option v-for="(item,index) in msgtypes" :key="index" :label="item.value" :value="item.id" >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-date-picker
          v-model="dataForm.keytwo"
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
        <!--<el-button v-if="isAuth('generator:tbgoods3:save')" type="primary" @click="addOrUpdateHandle()">新增</el-button>-->
        <!--<el-button v-if="isAuth('generator:tbgoods3:delete')" type="danger" @click="deleteHandle()" :disabled="dataListSelections.length <= 0">批量删除</el-button>-->
      </el-form-item>
      <!--<el-button slot="reference" type="primary" size="mini" style="margin-left: 5px"-->
                 <!--@click="showAdvanceSearchView"><i-->
        <!--class="fa fa-lg" v-bind:class="[advanceSearchViewVisible ? faangledoubleup:faangledoubledown]"-->
        <!--style="margin-right: 5px"></i>高级搜索-->
      <!--</el-button>-->
    </el-form>
    <el-table
      :data="msg_dataList"
      border
      v-loading="dataListLoading"
      @selection-change="selectionChangeHandle"
      style="width: 100%;">
      <!--<el-table-column-->
        <!--prop="msg_id"-->
        <!--header-align="center"-->
        <!--align="center"-->
        <!--label="信息ID">-->
      <!--</el-table-column>-->
      <el-table-column
        prop="store_name"
        header-align="center"
        align="center"
        label="所属仓库">
      </el-table-column>
      <el-table-column
        prop="article_name"
        header-align="center"
        align="center"
        label="商品名称">
      </el-table-column>
      <!--<el-table-column-->
        <!--prop="articleId"-->
        <!--header-align="center"-->
        <!--align="center"-->
        <!--label="物件号">-->
        <!--<template scope="scope">-->
          <!--<div v-if="scope.row.articleId!=null" v-text="scope.row.articleId"></div>-->
          <!--<div v-else="">暂无数据</div>-->
        <!--</template>-->
      <!--</el-table-column>-->
      <el-table-column
        prop="manufacturer_name"
        header-align="center"
        align="center"
        label="厂商">
      </el-table-column>
      <el-table-column
        prop="specs_name"
        header-align="center"
        align="center"
        label="规格">
      </el-table-column>
      <el-table-column
        prop="unit_name"
        header-align="center"
        align="center"
        label="单位">
      </el-table-column>
      <el-table-column
        prop="price"
        header-align="center"
        align="center"
        label="单价">
      </el-table-column>
      <el-table-column
        prop="qunatity"
        header-align="center"
        align="center"
        label="数量">
      </el-table-column>
      <el-table-column
        prop="amount"
        header-align="center"
        align="center"
        label="总金额">
      </el-table-column>
      <!--<el-table-column-->
        <!--prop="num"-->
        <!--header-align="center"-->
        <!--align="center"-->
        <!--label="需求部门">-->
        <!--<template scope="scope">-->
          <!--<div v-if="scope.row.num!=null"></div>-->
          <!--<div v-else="">暂无数据</div>-->
        <!--</template>-->
      <!--</el-table-column>-->
      <el-table-column
        prop="msg_type"
        header-align="center"
        align="center"
        label="类型">
        <template scope="scope">
          <div v-if="scope.row.msg_type==1">入库</div>
          <!--<div v-if="scope.row.msgType==2">待出库</div>-->
          <div v-if="scope.row.msg_type==2">出库</div>
          <div v-if="scope.row.msg_type==3">报废</div>
        </template>
      </el-table-column>
      <!--<el-table-column-->
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
      <el-table-column
        prop="recipient_name"
        header-align="center"
        align="center"
        label="领用人">
      </el-table-column>
      <el-table-column
        prop="username"
        header-align="center"
        align="center"
        label="操作人员">
      </el-table-column>
      <!--<el-table-column-->
        <!--prop="username2"-->
        <!--header-align="center"-->
        <!--align="center"-->
        <!--label="出库操作人员">-->
        <!--<template scope="scope">-->
          <!--<div v-if="scope.row.username2!=null" v-text="scope.row.username2"></div>-->
          <!--<div v-else="scope.row.username2==null">暂无数据</div>-->
        <!--</template>-->
      <!--</el-table-column>-->
      <el-table-column
        prop="msg_time"
        header-align="center"
        align="center"
        label="时间">
      </el-table-column>
      <!--<el-table-column-->
        <!--prop="outTime"-->
        <!--header-align="center"-->
        <!--align="center"-->
        <!--label="出库时间">-->
      <!--</el-table-column>-->
      <!--<el-table-column-->
        <!--fixed="right"-->
        <!--header-align="center"-->
        <!--align="center"-->
        <!--width="150"-->
        <!--label="操作">-->
        <!--<template slot-scope="scope">-->
          <!--<el-button type="text" size="small" @click="addOrUpdateHandle(scope.row.goodsId)">查看订单信息</el-button>-->
          <!--&lt;!&ndash;<el-button type="text" size="small" @click="deleteHandle(scope.row.goodsId)">删除</el-button>&ndash;&gt;-->
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
  // import AddOrUpdate from './tbgoods3-add-or-update'
  export default {
    data () {
      return {
        dataForm: {
          key: '',
          keytwo: '',
          article_name: '',
          goods_name: '',
          store_id: '',
          department: '',
          msg_type: 2
        },
        // faangledoubleup: 'fa-angle-double-up',
        // faangledoubledown: 'fa-angle-double-down',
        // advanceSearchViewVisible: false,
        dataList: [],
        msg_dataList: [],
        storeArr: [],
        msgtypes: [{id: 1, value: '入库'}, {id: 2, value: '出库'}, {id: 3, value: '报废'}],
        pageIndex: 1,
        pageSize: 10,
        totalPage: 0,
        dataListLoading: false,
        dataListSelections: [],
        addOrUpdateVisible: false
      }
    },
    components: {
      // AddOrUpdate
    },
    activated () {
      this.getDataList()
      this.init()
    },
    methods: {
      // //高级搜索按钮
      // showAdvanceSearchView () {
      //   this.advanceSearchViewVisible = !this.advanceSearchViewVisible
      //   this.keywords = ''
      //   if (!this.advanceSearchViewVisible) {
      //     this.emptyEmpData()
      //     this.beginDateScope = ''
      //     // this.loadEmps()
      //   }
      // },

      init () {
          this.$http({
            url: this.$http.adornUrl('/store/store/list'),
            method: 'get'
          }).then(({data}) => {
            if (data && data.code === 0) {
            this.storeArr = data.storeData.list
          }
        })
      },
      // 获取数据列表
      getDataList () {
        this.dataListLoading = true
        this.$http({
          url: this.$http.adornUrl('/inoutmsg/queryMsg'),
          method: 'get',
          params: this.$http.adornParams({
            'page': this.pageIndex,
            'keytime': this.dataForm.keytwo + '',
            'rows': this.pageSize,
            'article_name': this.dataForm.article_name,
            'goods_no': this.dataForm.goods_no,
            'store_id': this.dataForm.store_id,
            'msg_type': this.dataForm.msg_type,
            'department': this.dataForm.department
          })
        }).then(({data}) => {
          if (data && data.code === 0) {
          this.msg_dataList = data.msgData.list
          this.totalPage = data.msgData.total
        } else {
          this.msg_dataList = []
          this.totalPage = 0
        }
      })
        this.dataListLoading = false
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
      querySearchAsync(queryString, cb) {
        // var restaurants = this.restaurants;
        if (queryString === 'undefined') {
          this.dataForm.article_name = ''
        } else {
          this.$http({
            url: this.$http.adornUrl("/code/queryArtic"),
            method: "get",
            params: this.$http.adornParams({
              "goods_name": queryString
            })
          }).then(({data}) => {
            this.newrestaurants = data.article.list

          for (var i = 0; i < data.article.list.length; i++) {

            this.newrestaurants[i].value = this.newrestaurants[i].article_name;

          }
          clearTimeout(this.timeout);
          this.timeout = setTimeout(() => {
            cb(this.newrestaurants
          )
          },
            100 * Math.random()
          )
          })
        }
      },
      handleSelect(item) {
        this.dataForm.article_name = item.article_name
      }
      // 新增 / 修改
      // addOrUpdateHandle (id) {
      //   this.addOrUpdateVisible = true
      //   this.$nextTick(() => {
      //     this.$refs.addOrUpdate.init(id)
      //   })
      // },
    }
  }
</script>
