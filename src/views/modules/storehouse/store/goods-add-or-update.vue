<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="商品名称" prop="goodsName">
      <el-input v-model="dataForm.goodsName" placeholder="商品名称"></el-input>
    </el-form-item>
    <el-form-item label="物料号" prop="goodsMaterial">
      <el-input v-model="dataForm.goodsMaterial" placeholder="物料号"></el-input>
    </el-form-item>
      <el-form-item label="厂商" prop="manufacturer">
        <el-input v-model="dataForm.manufacturer" placeholder="厂商"></el-input>
      </el-form-item>
      <el-form-item label="单价" prop="price">
        <el-input v-model="dataForm.price" type="number" placeholder="单价"></el-input>
      </el-form-item>
      <el-form-item label="规格" prop="specs">
        <el-input v-model="dataForm.specs" placeholder="规格"></el-input>
      </el-form-item>
    <!--<el-form-item label="材质" prop="materialQuality">-->
      <!--<el-input v-model="dataForm.materialQuality" placeholder="材质"></el-input>-->
    <!--</el-form-item>-->
      <!--<el-form-item label="寿命分类" prop="life">-->
        <!--<el-select  v-model="dataForm.life" placeholder="请选择寿命分类">-->
          <!--<el-option v-for="(item,index) in specialArr" :key="index" :label="item.value" :value="item.id" >-->
          <!--</el-option>-->
        <!--</el-select>-->
      <!--</el-form-item>-->
      <el-form-item label="类型" prop="type">
        <el-select  v-model="dataForm.type" placeholder="请选择类型">
          <el-option v-for="(item,index) in typeArr" :key="index" :label="item.value" :value="item.id" >
          </el-option>
        </el-select>
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
          isFullscreen: false
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
          ]
        }
      }
    },
    methods: {
      init (id) {
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
              this.dataForm.goodsName = data.goods.goodsName
                this.dataForm.manufacturer = data.goods.manufacturer
                this.dataForm.price = data.goods.price
                this.dataForm.specs = data.goods.specs
              this.dataForm.life = data.goods.life
              this.dataForm.type = data.goods.type
              // this.dataForm.materialQuality = data.goods.materialQuality
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
              url: this.$http.adornUrl(`/store/goods/${!this.dataForm.goodsId ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'goodsId': this.dataForm.goodsId || undefined,
                'goodsName': this.dataForm.goodsName,
                'manufacturer': this.dataForm.manufacturer,
                'price': this.dataForm.price,
                'specs': this.dataForm.specs,
                'life': this.dataForm.life,
                'type': this.dataForm.type,
                // 'materialQuality': this.dataForm.materialQuality,
                'goodsMaterial': this.dataForm.goodsMaterial
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
