<template>
  <div class="mod-config">
    <el-form :inline="true" :model="dataForm"  ref="dataForm" >
        <!--<el-input v-model="dataForm.storename" placeholder="仓库名" @click.native="select()"></el-input>-->
        <el-form-item prop="storeId">
          <el-select  v-model="dataForm.index" placeholder="请选择仓库" @change="currentSel">
            <el-option v-for="(item,index) in columeTypeArr" :key="index" :label="item.storename" :value="index" >
            </el-option>
          </el-select>
        </el-form-item>
      <el-form-item>
        <!--<el-button @click="getDataList()">查询</el-button>-->
        <el-button v-if="isAuth('storemanage:handinput:add')" type="primary" @click="returnDataList()">返回</el-button>
        <!--<el-button v-if="isAuth('storemanage:handinput:delete')" type="danger" @click="deleteHandle()" :disabled="dataListSelections.length <= 0">批量删除</el-button>-->
      </el-form-item>
    </el-form>
    <el-table
      :data="dataListShow"
      border
      v-loading="dataListLoading"
      @selection-change="selectionChangeHandle"
      style="width: 100%;">
      <el-table-column
        prop="storename"
        header-align="center"
        align="center"
        label="仓库名">
      </el-table-column>
      <!--<el-table-column-->
        <!--prop="goodsId"-->
        <!--header-align="center"-->
        <!--align="center"-->
        <!--label="商品ID">-->
      <!--</el-table-column>-->

      <el-table-column
        v-if="status==0"
        key="articleNo"
        prop="articleId"
        header-align="center"
        align="center"
        label="物件号">
      </el-table-column>
      <el-table-column
        prop="goods_name"
        header-align="center"
        align="center"
        label="商品名称">
      </el-table-column>
      <el-table-column
        prop="goods_material"
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
        prop="msgType"
        header-align="center"
        align="center"
        label="类型">
        <template scope="scope">
          <div v-show="scope.row.msgType==1">普通</div>
          <div v-show="scope.row.msgType==2">刀具类</div>
          <div v-show="scope.row.msgType==3">衣裤鞋子类</div>
        </template>
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
      <el-table-column
        prop="material_quality"
        header-align="center"
        align="center"
        label="材质">
      </el-table-column>
      <el-table-column
        v-if="status==1"
        key="goods"
        prop="num"
        header-align="center"
        align="center"
        label="数量">
      </el-table-column>
      <el-table-column
        v-if="status==0"
        key="articleNo"
        header-align="center"
        align="center"
        label="专案">
        <template scope="scope">
          <div v-show="scope.row.special==1">Alaska</div>
          <div v-show="scope.row.special==2">Boston</div>
          <div v-show="scope.row.special==2">Toronto</div>
        </template>
      </el-table-column>
      <el-table-column
        v-if="status==0"
        key="articleNo"
        prop="inTime"
        header-align="center"
        align="center"
        label="入库时间">
      </el-table-column>
      <!--<el-table-column-->
        <!--prop="createtime"-->
        <!--header-align="center"-->
        <!--align="center"-->
        <!--label="创建时间">-->
      <!--</el-table-column>-->
      <!--<el-table-column-->
        <!--prop="updatetime"-->
        <!--header-align="center"-->
        <!--align="center"-->
        <!--label="修改时间">-->
      <!--</el-table-column>-->
      <el-table-column
        v-if="status==0"
        key="articleNo"
        fixed="right"
        header-align="center"
        align="center"
        width="150"
        label="操作">
        <template slot-scope="scope">
          <!--<el-button type="text" size="small" @click="addOrUpdateHandle(scope.row.goodsId)">修改</el-button>-->
          <el-button  type="text" size="small" @click="updateArticle(scope.row.msgId,1)">取消</el-button>
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
    <span slot="footer" class="dialog-footer">
      <el-button v-if="status==0" type="primary" @click=" dataFormSubmit1()">确认</el-button>
       <el-button v-if="status==1" type="primary" @click="select()">提交</el-button>
    </span>
    <!-- 弹窗 -->
    <add-or-update v-if="OrderVisible" ref="OrderOrUpdate" @refreshDataList="articleIdHandle"></add-or-update>
    <add-or-update v-if="addOrUpdateVisible" ref="AddOrUpdate" @refreshDataList="articleIdHandle"></add-or-update>
  </div>
</template>
<script>
  // import OrderOrUpdate from './OrderGoodsOrder-add-or-update'
  import AddOrUpdate from './OrderGoodsOrder-add-or-update'
  export default {
    data () {
      return {
        restaurants: [],
        newrestaurants: [],
        state: '',
        timeout: null,
        status: 0,
        fileUploadBtnText: '导入数据',
        dataForm: {
          storeId: '',
          storename: '',
          isFullscreen: false
        },
        addOrUpdateVisible: false,
        OrderVisible: false,
        dataList: [],
        dataListShow: [],
        dataListX: [],
        pageIndex: 1,
        pageSize: 10,
        totalPage: 0,
        dataListLoading: false,
        dataListSelections: [],
        columeTypeArr: []
        // addOrUpdateVisible: false
      }
    },
    components: {
      AddOrUpdate,
      // OrderOrUpdate
    },
    activated () {
      // this.select()
      this.init()
    },
    methods: {
      // 获取数据列表
      init () {
        this.visible = true
        this.$http({
          url: this.$http.adornUrl('/store/stores/list'),
          method: 'get',
          data: this.$http.adornData(this.dataList, false)
        }).then(({data}) => {
          if (data && data.code === 0) {
          this.columeTypeArr = data.page.list
        } else {
        }
      })
      },
      currentSel (selVal) {
        this.dataForm.storeId = this.columeTypeArr[selVal].storeId
        this.dataForm.storename = this.columeTypeArr[selVal].storename
        this.articleIdHandle()
      },
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
      },
      select () {
          this.status = 0
          var msg = {}
          msg.dataList = this.dataList
          msg.dataListX = this.dataListX
        this.addOrUpdateVisible = true
        this.$nextTick(() => {
          this.$refs.AddOrUpdate.init(msg)
      })
      },
      //最终确认
      dataFormSubmit1 () {
        if (this.dataListX.length==0){
          this.$message.error('请先添加物件')
          return
        }
        this.dataList = []
       this.status = 1
        for (var j = 0; j < this.dataListX.length; j++){
          var tt = 0
        for (var i = 0; i < this.dataList.length; i++){
            if (this.dataList[i].goods_name == this.dataListX[j].goods_name){
              if (this.dataList[i].manufacturer == this.dataListX[j].manufacturer){
                if (this.dataList[i].goods_material == this.dataListX[j].goods_material){
                  if (this.dataList[i].price == this.dataListX[j].price) {
                    if (this.dataList[i].specs == this.dataListX[j].specs) {
                      if (this.dataList[i].material_quality == this.dataListX[j].material_quality) {
                        var new_num = Number(this.dataList[i].num) + 1
                        this.dataList[i].num = new_num
                        tt=1
                        break;
                      }
                    }
                  }
              }
            }
          }
        }
        if(tt==0){
          this.dataListX[j].num = 1
          this.dataList.push(this.dataListX[j])
        }
        }
        this.dataListShow = this.dataList
      },
      //提交核对
      // dataFormSubmit () {
      //   this.status = 0
      //   var msg = {}
      //   msg.dataList = this.dataList
      //   msg.dataListX = this.dataListX
      //   this.dataListShow = []
      //   this.OrderVisible = true
      //   this.$nextTick(() => {
      //     this.$refs.addOrUpdate.init(1)
      // })
      // },
      // 获取数据列表
      articleIdHandle () {
        // if(map != 0){
        //   this.dataForm.storeId = map.storeId
        //   this.dataForm.storename = map.storename
        // }
        this.totalPage = 0
        this.dataListLoading = true
        this.$http({
          url: this.$http.adornUrl('/stock/stockmanage/list_article'),
          method: 'get',
          params: this.$http.adornParams({
            'page': this.pageIndex,
            'limit': this.pageSize,
            'store_id': this.dataForm.storeId,
            'type': 2
          })
        }).then(({data}) => {
          if (data && data.code === 0) {
            console.log(data)
          this.dataListX = data.list
          this.totalPage = data.list.length
          this.dataListShow = this.dataListX
        } else {
          this.dataListX = []
          this.dataListShow = []
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
      //返回
      returnDataList () {
        this.status = 0
        this.dataListShow = this.dataListX
      }
    }
  }
</script>
