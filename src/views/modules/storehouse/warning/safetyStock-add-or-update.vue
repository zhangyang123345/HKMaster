<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
      <el-form-item prop="storeId" label="仓库名">
        <el-select  v-model="dataForm.storeId" placeholder="请选择仓库">
          <el-option v-for="(item,index) in columeTypeArr" :key="index" :label="item.storename" :value="item.storeId" >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item  prop="goodsName" label="商品名">
        <!--<el-input  v-model="dataForm.goodsName" placeholder="商品名" clearable></el-input>-->
        <el-autocomplete
          v-model="dataForm.goodsName"
          :fetch-suggestions="querySearchAsync"
          placeholder="商品名"
          @select="handleSelect"
        ></el-autocomplete>
      </el-form-item>
    <el-form-item label="极小值" prop="smallValue">
      <el-input v-model="dataForm.smallValue" placeholder="极小值"></el-input>
    </el-form-item>
      <el-form-item label="极大值" prop="bigValue">
        <el-input v-model="dataForm.bigValue" placeholder="极大值"></el-input>
      </el-form-item>
      <!--<el-form-item label="寿命类型" prop="type">-->
        <!--<el-select  v-model="dataForm.type" placeholder="请选择寿命类型">-->
          <!--<el-option v-for="(item,index) in typeArr" :key="index" :label="item.value" :value="index" >-->
          <!--</el-option>-->
        <!--</el-select>-->
      <!--</el-form-item>-->
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import screenfull from 'screenfull'
  export default {
    data () {
      return {
        visible: false,
        dataForm: {
          smallValue: '',
          bigValue: '',
          goodsId: 0,
          goodsName: '',
          storeId: '',
          msgId: '',
          isFullscreen: false
        },
        columeTypeArr: [],
        dataRule: {
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
          materialQuality: [
            { required: true, message: '材质不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      getStoreId () {
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
      init (id) {
        this.getStoreId()
        this.dataForm.msgId = id || 0
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.msgId) {
            this.$http({
              url: this.$http.adornUrl(`/warning/safetystock/info/${this.dataForm.msgId}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
              this.dataForm.goodsId = data.safetyStockEntity.goodsId
              this.dataForm.storeId = data.safetyStockEntity.storeId
              this.dataForm.goodsName = data.safetyStockEntity.goodsName
              this.dataForm.smallValue = data.safetyStockEntity.smallValue
              this.dataForm.bigValue = data.safetyStockEntity.bigValue
              }
            })
          }
        })
      },
      // 表单提交
      dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.$http({
              url: this.$http.adornUrl(`/warning/safetystock/${!this.dataForm.msgId ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'msgId': this.dataForm.msgId || undefined,
                'goodsId': this.dataForm.goodsId || undefined,
                'storeId': this.dataForm.storeId,
                'smallValue': this.dataForm.smallValue,
                'bigValue': this.dataForm.bigValue
              })
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.$message({
                  message: '操作成功',
                  type: 'success',
                  duration: 1500,
                  onClose: () => {
                    this.visible = false
                    this.$emit('refreshDataList')
                  }
                })
              } else {
                this.$message.error(data.msg)
              }
            })
          }
        })
      },
      querySearchAsync(queryString, cb) {
        // var restaurants = this.restaurants;
        this.$http({

          url: this.$http.adornUrl("/store/goods/goodsInfo"),

          method: "post",

          params: this.$http.adornParams({

            goods_name:queryString

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
      handleSelect (item) {
        this.dataForm.goodsId = item.goodsId
        this.dataForm.goodsName = item.goodsName
        // this.dataForm.type = item.type
      }
    }
  }
</script>
