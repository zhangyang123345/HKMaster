<template>
  <div class="mod-config">
    <el-form :inline="true" :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="addOrUpdateHandle()">
      <el-form-item prop="storeId">
        <el-select  v-model="dataForm.storeId" placeholder="请选择仓库">
          <el-option v-for="(item,index) in columeTypeArr" :key="index" :label="item.storename" :value="index" >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item  prop="goodsName">
        <!--<el-input  v-model="dataForm.goodsName" placeholder="商品名" clearable></el-input>-->
        <el-autocomplete
          v-model="dataForm.goodsName"
          :fetch-suggestions="querySearchAsync"
          placeholder="商品名"
          @select="handleSelect"
        ></el-autocomplete>
      </el-form-item>
      <el-form-item  prop="goodsMaterial">
        <el-input v-model="dataForm.goodsMaterial" placeholder="物料号" clearable></el-input>
      </el-form-item>
      <!--<el-form-item prop="articleNo">-->
        <!--<el-input v-model="dataForm.articleNo" placeholder="物件号" clearable></el-input>-->
      <!--</el-form-item >-->
      <el-form-item prop="manufacturer">
        <el-input v-model="dataForm.manufacturer" placeholder="厂商" clearable></el-input>
      </el-form-item >
      <el-form-item prop="price">
      <el-input v-model="dataForm.price" type="number" placeholder="单价" clearable></el-input>
    </el-form-item>
      <el-form-item prop="specs">
        <el-input v-model="dataForm.specs" placeholder="规格" clearable></el-input>
      </el-form-item >
      <!--<el-form-item prop="materialQuality">-->
        <!--<el-input v-model="dataForm.materialQuality" placeholder="材质" clearable></el-input>-->
      <!--</el-form-item>-->
      <!--<el-form-item prop="life">-->
        <!--<el-select  v-model="dataForm.life" placeholder="请选择寿命分类">-->
          <!--<el-option v-for="(item,index) in lifeArr" :key="index" :label="item.value" :value="item.id" >-->
          <!--</el-option>-->
        <!--</el-select>-->
      <!--</el-form-item>-->
      <el-form-item prop="type">
        <el-select  v-model="dataForm.type" placeholder="请选择类型">
          <el-option v-for="(item,index) in typeArr" :key="index" :label="item.value" :value="item.id" >
          </el-option>
        </el-select>
      </el-form-item>
        <el-form-item prop="num">
          <el-input v-model="dataForm.num" placeholder="请输入数量" clearable></el-input>
        </el-form-item>
      <!--</el-form-item>-->
      <!--<el-form-item prop="special">-->
        <!--<el-select  v-model="dataForm.special" placeholder="请选择专案">-->
          <!--<el-option v-for="(item,index) in specialArr" :key="index" :label="item.value" :value="item.id" >-->
          <!--</el-option>-->
        <!--</el-select>-->
      <!--</el-form-item>-->
      <el-form-item>
        <!--<el-button @click="getDataList()">查询</el-button>-->
        <el-button   type="primary" @click="addOrUpdateHandle()">添加</el-button>
        </el-form-item>
      <el-form-item>
        <el-button  type="primary" @click="returnDataList()">返回</el-button>
        </el-form-item>
        <el-form-item>
        <el-upload
          :show-file-list="false"
          accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
          action="#"
          :on-success="fileUploadSuccess"
          :on-error="fileUploadError" :disabled="fileUploadBtnText=='正在导入'"
          :before-upload="beforeFileUpload" style="display: inline">
          <el-button  type="success" :loading="fileUploadBtnText=='正在导入'"><i class="fa fa-lg fa-level-up"
                                                                             style="margin-right: 5px"></i>{{fileUploadBtnText}}
          </el-button>
        </el-upload>
        </el-form-item>
      <el-form-item>
        <!--<el-button v-if="isAuth('storemanage:handinput:delete')" type="danger" @click="deleteHandle()" :disabled="dataListSelections.length <= 0">批量删除</el-button>-->
        <el-button type="success"  @click="export2Exce()"><i></i>导出模板
        </el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="dataListShow"
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
        v-if="false"
      prop="storeId"
      header-align="center"
      align="center"
      label="仓库ID">
      </el-table-column>
      <el-table-column
        prop="storeName"
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
      <!--<el-table-column-->
        <!--v-if="status==0"-->
        <!--key="goods"-->
        <!--prop="articleNo"-->
        <!--header-align="center"-->
        <!--align="center"-->
        <!--label="物件号">-->
      <!--</el-table-column>-->
      <el-table-column
        prop="manufacturer"
        header-align="center"
        align="center"
        label="厂商">
      </el-table-column>
      <!--<el-table-column-->
        <!--prop="life"-->
        <!--header-align="center"-->
        <!--align="center"-->
        <!--label="寿命分类">-->
        <!--<template scope="scope">-->
          <!--<div v-show="scope.row.life==1">有寿命</div>-->
          <!--<div v-show="scope.row.life==2">无寿命</div>-->
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
        <!--v-if="status==0"-->
        <!--key="goods"-->
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
        prop="num"
        header-align="center"
        align="center"
        label="数量">
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
        key="goods"
        fixed="right"
        header-align="center"
        align="center"
        width="150"
        label="操作">
        <template slot-scope="scope">
          <!--<el-button type="text" size="small" @click="addOrUpdateHandle(scope.row.goodsId)">修改</el-button>-->
          <el-button  type="text" size="small" @click="deleteHandle(scope.$index)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-paginatio>
    </el-paginatio>
    <span slot="footer" class="dialog-footer">
      <el-button v-if="status==0" type="primary" @click="dataFormSubmit1()">确认</el-button>
       <el-button v-if="status==1" type="primary" @click="dataFormSubmit()">提交</el-button>
    </span>
    <!-- 弹窗, 新增 / 修改 -->
    <!--<add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList"></add-or-update>-->
  </div>
</template>

<script>
  // import AddOrUpdate from './goods-add-or-update'
  export default {
    data () {
      return {
        restaurants: [],
        newrestaurants: [],
        typeArr: [{id: 1, value: '普通'}, {id: 2, value: '刀具类'}, {id: 3, value: '衣裤鞋子类'}, {id: 4, value: '化学品'}],
        specialArr: [{id: 1, value: 'Alaska'}, {id: 2, value: 'Boston'}, {id: 3, value: 'Toronto'}],
        lifeArr: [{id: 1, value: '有寿命'}, {id: 2, value: '无寿命'}],
        state: '',
        timeout: null,
        status: 0,
        fileUploadBtnText: '导入数据',
        dataForm: {
          storeId: '',
          storeType: '',
          goodsId: '',
          goodsName: '',
          goodsMaterial: '',
          price: '',
          specs: '',
          materialQuality: '',
          manufacturer: '',
          num: '',
          articleNo: '',
          life: '',
          type: '',
          special: ''
        },
        dataRule: {
          // num: [
          //   { required: true, message: '请输入数量', trigger: 'blur' }
          // ],
          storeId: [
            { required: true, message: '请选择仓库', trigger: 'blur' }
          ],
          goodsName: [
            { required: true, message: '商品名称不能为空', trigger: 'blur' }
          ],
          manufacturer: [
            { required: true, message: '厂商不能为空', trigger: 'blur' }
          ],
          price: [
            { required: true, message: '单价不能为空', trigger: 'blur' }
          ],
          specs: [
            { required: true, message: '规格不能为空', trigger: 'blur' }
          ],
          // life: [
          //   { required: true, message: '寿命分类不能为空', trigger: 'change' }
          // ],
          type: [
            { required: true, message: '类型不能为空', trigger: 'blur' }
          ],
          num: [
            { required: true, message: '数量不能为', trigger: 'blur' }
          ]
          // materialQuality: [
          //   { required: true, message: '材质不能为空', trigger: 'blur' }
          // ]
        },
        dataList: [],
        dataListShow: [],
        dataListX: [],
        pageIndex: 1,
        pageSize: 10,
        totalPage: 0,
        storIdsave: '',
        dataListLoading: false,
        dataListSelections: [],
        columeTypeArr: []
        // addOrUpdateVisible: false
      }
    },
    // components: {
    //   AddOrUpdate
    // },
    activated () {
      this.getDataList()
    },
    methods: {
      export2Exce () {
        require.ensure([], () => {
          const { export_json_to_excel } = require('../../../../vendor/Export2Excel')
          const tHeader = ['仓库ID', '物品名', '单价', '厂商', '物件料号', '规格', '类型', '数量', '仓库名']
          // 上面设置Excel的表格第一行的标题
          const filterVal = ['storeId', 'goodsName', 'price', 'manufacturer', 'goodsMaterial', 'specs', 'type', 'num', 'storeName']
          const list = [{storeId: '系统显示的仓库ID', goodsName: '物品名称', price: '物品单价', manufacturer: '物品厂商', goodsMaterial: '物料号', specs: '物品规格', type: '(1.普通;2.刀具类;3.穿戴类;4.化学品)', num: '存入的物品数量', storeName: '仓库的名称'}]
          const data = this.formatJson(filterVal, list)
          export_json_to_excel(tHeader, data, '仓库物品导入模板')
      })
      },
      formatJson (filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => v[j]))
      },
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
        this.status = 0
        this.importf(file)
      //   return
      //   this.fileUploadBtnText = '正在导入'
      //   let formData = new FormData()
      //   formData.append('file', file)
      //   this.$http.post(this.$http.adornUrl('/store/goods/import'), formData)
      //     .then(({data}) => {
      //     if (data.msg === '导入成功!') {
      //     this.getDataList()
      //   } else {
      //     this.$message.error(data.msg)
      //   }
      //   this.fileUploadBtnText = '导入数据'
      // })
      },
      //最终确认
      dataFormSubmit1 () {
        if (this.dataListX.length==0){
          this.$message.error('没有带出库物件')
          return
        }
        this.dataList = []
       this.status = 1
        for (var j = 0; j < this.dataListX.length; j++){
          var tt = 0
        for (var i = 0; i < this.dataList.length; i++){
          if (this.dataList[i].storeId == this.dataListX[j].storeId){
            if (this.dataList[i].goodsName == this.dataListX[j].goodsName){
              if (this.dataList[i].manufacturer == this.dataListX[j].manufacturer){
                if (this.dataList[i].goodsMaterial == this.dataListX[j].goodsMaterial){
                  if (this.dataList[i].price == this.dataListX[j].price) {
                    if (this.dataList[i].specs == this.dataListX[j].specs) {
                      // if (this.dataList[i].materialQuality == this.dataListX[j].materialQuality) {
                        var newNum = Number(this.dataListX[i].num) + Number(this.dataList[i].num)
                        this.dataList[i].num = newNum
                        tt=1
                        break;
                      // }
                    }
                  }
                }
              }
            }
          }
        }
        if(tt==0){
          this.dataList.push(this.dataListX[j])
        }
        }
        this.dataListShow = this.dataList
      },
      //提交入库
      dataFormSubmit () {
        // var msg = this.dataList + ';' + this.dataListX
        var msg = {}
        msg.dataList = this.dataList
        msg.dataListX = this.dataListX
            this.$http({
              url: this.$http.adornUrl('/stock/stockmanage/save'),
              method: 'post',
              data: this.$http.adornData(msg, false)
            }).then(({data}) => {
              if (data && data.code === 0) {
              this.$message({
                message: '操作成功',
                type: 'success',
                duration: 1500,
                onClose: () => {
            }
            })
          this.dataList = []
          this.dataListX = []
          this.dataListShow = []
            } else {
              this.$message.error(data.msg)
            }
          })
      },
      //规则，只能输入数字
      proving () {
        this.dataForm.num = this.dataForm.num.replace(/[^\.\d]/g,'')
        this.dataForm.num = this.dataForm.num.replace('.','')
      },
      // 获取数据列表
      getDataList () {
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
      // 每页数
      sizeChangeHandle (val) {
        this.pageSize = val
        this.pageIndex = 1
        this.setCurrentPageData()
      },
      // 当前页
      currentChangeHandle (val) {
        this.pageIndex = val
        this.setCurrentPageData()
      },
      // 多选
      selectionChangeHandle (val) {
        this.dataListSelections = val
      },
      //返回
      returnDataList () {
        this.status = 0
        this.dataListShow = this.dataListX
      },
      //添加
      addOrUpdateHandle (id) {
        this.status = 0
        this.$refs['dataForm'].validate((valid) => {
          var map = {}
          map.storeName = this.columeTypeArr[this.dataForm.storeId].storename
        // map.storeName = this.dataForm.storeId
        map.goodsId = this.dataForm.goodsId
        map.storeId = this.columeTypeArr[this.dataForm.storeId].storeId
        map.goodsName = this.dataForm.goodsName
        map.manufacturer = this.dataForm.manufacturer
        map.price = this.dataForm.price
        map.specs = this.dataForm.specs
        // map.materialQuality = this.dataForm.materialQuality
        map.num = this.dataForm.num
        map.articleNo = this.dataForm.articleNo
        map.type = this.dataForm.type
        map.life = this.dataForm.life
        // map.special = this.dataForm.special
        map.goodsMaterial = this.dataForm.goodsMaterial
        this.dataListX.push(map)
        this.dataListShow = this.dataListX
        this.storIdsave = this.dataForm.storeId
            this.$refs.dataForm.resetFields()
         this.dataForm.storeId = this.storIdsave
      //   this.addOrUpdateVisible = true
      //   this.$nextTick(() => {
      //     this.$refs.addOrUpdate.init(id)
      //   })
        })
      },
      // 删除
      deleteHandle (index) {
        this.dataListX.splice(index, 1)
        this.dataListShow = this.dataListX
      //   var ids = id ? [id] : this.dataListSelections.map(item => {
      //     return item.goodsId
      //   })
      //   this.$confirm(`确定对[id=${ids.join(',')}]进行[${id ? '删除' : '批量删除'}]操作?`, '提示', {
      //     confirmButtonText: '确定',
      //     cancelButtonText: '取消',
      //     type: 'warning'
      //   }).then(() => {
      //     this.$http({
      //       url: this.$http.adornUrl('/store/goods/delete'),
      //       method: 'post',
      //       data: this.$http.adornData(ids, false)
      //     }).then(({data}) => {
      //       if (data && data.code === 0) {
      //         this.$message({
      //           message: '操作成功',
      //           type: 'success',
      //           duration: 1500,
      //           onClose: () => {
      //             this.getDataList()
      //           }
      //         })
      //       } else {
      //         this.$message.error(data.msg)
      //       }
      //     })
      //   })
      },
      querySearchAsync(queryString, cb) {
        // var restaurants = this.restaurants;
        this.$http({

          url: this.$http.adornUrl("/store/goods/goodsInfo"),

          method: "post",

          params: this.$http.adornParams({

            goods_name: queryString,
            storeType: this.columeTypeArr[this.dataForm.storeId].type

          })

        }).then(({ data }) => {
          this.newrestaurants = data.list

          for(var i=0;i<data.list.length;i++){

            this.newrestaurants[i].value = this.newrestaurants[i].goodsName;

        }
        // console.log("this.newrestaurants="+JSON.stringify(this.newrestaurants))
        // var results = queryString ? data.page.list.filter(this.createStateFilter(queryString)) : data.page.list;

        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          cb(this.newrestaurants);
      }, 100 * Math.random());
      });
      },
      createStateFilter(queryString) {
        return (state) => {
          return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      handleSelect(item) {
        this.dataForm.goodsId = item.goodsId
          this.dataForm.goodsName = item.goodsName
          this.dataForm.goodsMaterial = item.goodsMaterial
          this.dataForm.price = item.price
          this.dataForm.specs = item.specs
        this.dataForm.type = item.type
        // this.dataForm.life = item.life
        //   this.dataForm.materialQuality = item.materialQuality
          this.dataForm.manufacturer = item.manufacturer
        // this.dataForm.type = item.type
      },
      // 设置当前页面数据，对数组操作的截取规则为[0~10],[10~20]...,
      setCurrentPageData() {
        this.totalPage = this.dataListX.length
        // this.totalPage = Math.ceil(this.dataListShow.length / this.pageSize);
        // console.log(this.totalPage)
        // // 计算得0时设置为1
        // this.totalPage = this.totalPage == 0 ? 1 : this.totalPage;
        // console.log(this.totalPage)
        let begin = (this.pageIndex - 1) * this.pageSize;
        let end = this.pageIndex * this.pageSize;
        this.dataListShow = this.dataListX.slice(
          begin,
          end
        );
      },
      importf(files) {
        let _this = this;
        let inputDOM = this.$refs.inputer;   // 通过DOM取文件数据
        // this.file = event.currentTarget.files[0];
        var rABS = false; //是否将文件读取为二进制字符串
        var f = files;
        var reader = new FileReader();
        //if (!FileReader.prototype.readAsBinaryString) {
        FileReader.prototype.readAsBinaryString = function(f) {
          var binary = "";
          var rABS = false; //是否将文件读取为二进制字符串
          var pt = this;
          var wb; //读取完成的数据
          var outdata;
          var reader = new FileReader();
          reader.onload = function(e) {
            var bytes = new Uint8Array(reader.result);
            var length = bytes.byteLength;
            for(var i = 0; i < length; i++) {
              binary += String.fromCharCode(bytes[i]);
            }
            var XLSX = require('xlsx');
            if(rABS) {
              wb = XLSX.read(btoa(fixdata(binary)), { //手动转化
                type: 'base64'
              });
            } else {
              wb = XLSX.read(binary, {
                type: 'binary'
              });
            }
            // outdata就是你想要的东西 excel导入的数据
            outdata = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);
            // excel 数据再处理
            let arr = []
            outdata.map(v => {
              let obj = {}
              obj.storeId = v.仓库ID
            obj.goodsName = v.物品名
            // obj.articleNo = v.物件号
            obj.price = v.单价
            obj.manufacturer = v.厂商
            obj.goodsMaterial = v.物件料号
            obj.specs = v.规格
            // obj.materialQuality = v.材质
            // obj.life = v.寿命分类
            // obj.special = v.专案
            obj.type = v.类型
            obj.num = v.数量
            obj.storeName = v.仓库名
            arr.push(obj)
          })
            _this.dataListX = [...arr]
            _this.dataListShow = _this.dataListX
            _this.totalPage = _this.dataListShow.length
          } // _this.setCurrentPageData()
          reader.readAsArrayBuffer(f);
        }
        if(rABS) {
          reader.readAsArrayBuffer(f);
        } else {
          reader.readAsBinaryString(f);
        }
      }
    }
  }
</script>
