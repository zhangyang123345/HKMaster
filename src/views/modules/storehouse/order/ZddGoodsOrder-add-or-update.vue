<template>
  <el-dialog
    :title="!dataForm.orderId ? '新增' : '修改'"
    :close-on-click-modal="false"
    append-to-body
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
      <el-form-item label="商品名" prop="goodsName" clearable>
        <!--<el-input  v-model="dataForm.goodsName" placeholder="商品名" clearable></el-input>-->
        <el-autocomplete
          v-model="dataForm.goodsName"
          :fetch-suggestions="querySearchAsync"
          placeholder="商品名"
          @select="handleSelect"
        ></el-autocomplete>
      </el-form-item>
      <el-form-item label="厂商" prop="manufacturer">
        <el-input v-model="dataForm.manufacturer" placeholder="厂商" readonly></el-input>
      </el-form-item >
      <el-form-item label="单价" prop="price">
        <el-input v-model="dataForm.price" type="number" placeholder="单价" readonly></el-input>
      </el-form-item>
      <el-form-item label="规格" prop="specs">
        <el-input v-model="dataForm.specs" placeholder="规格" readonly></el-input>
      </el-form-item >
      <el-form-item label="类型"  prop="type">
        <el-input v-model="dataForm.typeName" placeholder="类型" readonly></el-input>
      </el-form-item>
    <el-form-item label="数量"  prop="num">
      <el-input v-model="dataForm.num" placeholder="请输入数量"></el-input>
    </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  export default {
    data () {
      return {
        visible: false,
        dataForm: {
          goodsId: '',
          name: '',
          price: '',
          goodsName: '',
          specs: '',
          manufacturer: '',
          num: '',
          orderId: '',
          zddType: '',
          typeName: ''
        },
        newrestaurants: [],
        dataRule: {
          goodsName: [
            { required: true, message: '商品名称不能为空', trigger: 'blur' }
          ],
          num: [
            { required: true, message: '数量不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      querySearchAsync(queryString, cb) {
        // var restaurants = this.restaurants;
        this.$http({

          url: this.$http.adornUrl("/store/goods/goodsInfo"),

          method: "post",

          params: this.$http.adornParams({

            goods_name:queryString

          })

        }).then(({data}) => {
          this.newrestaurants = data.list
        console.log(this.newrestaurants)

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
      handleSelect(item) {
        this.dataForm.goodsId = item.goodsId
        this.dataForm.goodsName = item.goodsName
        this.dataForm.price = item.price
        this.dataForm.specs = item.specs
        this.dataForm.manufacturer = item.manufacturer
        this.dataForm.zddType = item.type
        this.dataForm.typeName = item.typeName
      },
      init (id) {
        this.dataForm.orderId = id || ''
        this.visible = true
        // this.$nextTick(() => {
        //   this.$refs['dataForm'].resetFields()
        //   // if (this.dataForm.goodsId) {
        //   //   this.$http({
        //   //     url: this.$http.adornUrl(`/generator/tbgoods3/info/${this.dataForm.goodsId}`),
        //   //     method: 'get',
        //   //     params: this.$http.adornParams()
        //   //   }).then(({data}) => {
        //   //     if (data && data.code === 0) {
        //   //       this.dataForm.name = data.tbGoods3.name
        //   //       this.dataForm.intro = data.tbGoods3.intro
        //   //       this.dataForm.price = data.tbGoods3.price
        //   //       this.dataForm.num = data.tbGoods3.num
        //   //     }
        //   //   })
        //   // }
        // })
      },
      // 表单提交
      dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.$http({
              url: this.$http.adornUrl(`/order/zddGoodsOrder/${!this.dataForm.zddOrderId ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'orderId': this.dataForm.orderId || undefined,
                'goodsId': this.dataForm.goodsId || undefined,
                'zddType': this.dataForm.zddType,
                'num': this.dataForm.num,
                'price': this.dataForm.price
              })
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.$message({
                  message: '操作成功',
                  type: 'success',
                  duration: 1500,
                  onClose: () => {
                  Object.assign(this.$data, this.$options.data())
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
      }
    }
  }
</script>
