<template>
  <el-dialog
    :title="'出库'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="商品名称" prop="goodsName">
      <el-input v-model="dataForm.goodsName" placeholder="商品名称" readonly></el-input>
    </el-form-item>
    <el-form-item label="物料号" prop="goodsMaterial">
      <el-input v-model="dataForm.goodsMaterial" placeholder="物料号" readonly></el-input>
    </el-form-item>
      <el-form-item label="厂商" prop="manufacturer">
        <el-input v-model="dataForm.manufacturer" placeholder="厂商" readonly></el-input>
      </el-form-item>
      <el-form-item label="单价" prop="price">
        <el-input v-model="dataForm.price" type="number" placeholder="单价" readonly></el-input>
      </el-form-item>
      <el-form-item label="规格" prop="specs">
        <el-input v-model="dataForm.specs" placeholder="规格" readonly></el-input>
      </el-form-item>
    <!--<el-form-item label="材质" prop="materialQuality">-->
      <!--<el-input v-model="dataForm.materialQuality" placeholder="材质" readonly></el-input>-->
    <!--</el-form-item>-->
      <!--<el-form-item label="寿命分类" prop="life">-->
        <!--<el-select  v-model="dataForm.life" placeholder="请选择寿命分类">-->
          <!--<el-option v-for="(item,index) in specialArr" :key="index" :label="item.value" :value="item.id" >-->
          <!--</el-option>-->
        <!--</el-select>-->
      <!--</el-form-item>-->
      <el-form-item label="类型" prop="type">
        <el-select  v-model="dataForm.type" placeholder="请选择类型" readonly>
          <el-option v-for="(item,index) in typeArr" :key="index" :label="item.value" :value="item.id" >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="出库数量" prop="num">
        <el-input v-model="dataForm.num" placeholder="数量"  type="number" ></el-input>
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
  import {isDecimal} from '../../../../utils/validate'
  export default {
    data () {
      return {
        typeArr: [{id: '1', value: '普通'}, {id: '2', value: '刀具类'}, {id: '3', value: '衣裤鞋子类'}, {id: '4', value: '化学品'}],
        specialArr: [{id: '1', value: '有寿命'}, {id: '2', value: '无寿命'}],
        visible: false,
        dataForm: {
          goodsId: 0,
          goodsName: '',
          goodsMaterial: '',
          price: '',
          specs: '',
          materialQuality: '',
          manufacturer: '',
          life: '',
          type: '',
          isFullscreen: false,
          storeId: '',
          num: '',
          goodsType: ''
        },
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
          ],
          num: [
            { required: true, message: '数量不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      init (id, storeId, num, type) {
        console.log(12)
        this.dataForm.storeId = storeId
        this.dataForm.goodsType = type
        this.dataForm.goodsId = id || 0
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.goodsId) {
            this.$http({
              url: this.$http.adornUrl(`/store/goods/info/${this.dataForm.goodsId}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                console.log(data)
              this.dataForm.goodsName = data.goods.goodsName
                this.dataForm.manufacturer = data.goods.manufacturer
            this.dataForm.price = data.goods.price
                this.dataForm.specs = data.goods.specs
              this.dataForm.type = data.goods.type
              this.dataForm.materialQuality = data.goods.materialQuality
              this.dataForm.goodsMaterial = data.goods.goodsMaterial
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
              url: this.$http.adornUrl('/stock/stockmanage/article_out'),
              method: 'get',
              params: this.$http.adornParams({
                'goods_id': this.dataForm.goodsId,
                'store_id': this.dataForm.storeId,
                'num': this.dataForm.num,
                'type': this.dataForm.goodsType
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
      }
    }
  }
</script>
