<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
      <el-form-item label="仓库名称" prop="storename">
        <el-input v-model="dataForm.storename" placeholder="仓库名称"></el-input>
      </el-form-item>
      <el-form-item label="仓库容量" prop="storevolume">
        <el-input v-model="dataForm.storevolume" placeholder="仓库容量"></el-input>
      </el-form-item>
      <el-form-item label="仓库位置" prop="storeaddr">
        <el-input v-model="dataForm.storeaddr" placeholder="仓库位置"></el-input>
      </el-form-item>
      <el-form-item label="仓库负责人" prop="storeaddr">
        <el-input v-model="dataForm.dutyPerson" placeholder="仓库负责人"></el-input>
      </el-form-item>
      <el-form-item label="类型" prop="type">
        <el-select  v-model="dataForm.type" placeholder="请选择类型">
          <el-option v-for="(item,index) in typeArr" :key="index" :label="item.value" :value="item.id" >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="负责人工号" prop="storeaddr">
        <el-input v-model="dataForm.personNo" placeholder="负责人工号"></el-input>
      </el-form-item>
      <el-form-item label="负责人电话" prop="storeaddr">
        <el-input v-model="dataForm.personTel" placeholder="负责人电话"></el-input>
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
        typeArr: [{id: 0, value: '其他'}, {id: 1, value: '耗材'}, {id: 2, value: '化学'}],
        visible: false,
        dataForm: {
          storeId: 0,
          storename: '',
          storevolume: '',
          storeaddr: '',
          dutyPerson: '',
          personNo: '',
          personTel: '',
          type: ''
        },
        dataRule: {
          storename: [
            { required: true, message: '仓库名称', trigger: 'blur' }
          ],
          storevolume: [
            { required: true, message: '介绍不能为空', trigger: 'blur' }
          ],
          storeaddr: [
            { required: true, message: '仓库位置不能为空', trigger: 'blur' }
          ],
          type: [
            { required: true, message: '仓库类型不能为空', trigger: 'blur' }
          ],
          dutyPerson: [
            { required: true, message: '仓库负责人不能为空', trigger: 'blur' }
          ],
          personNo: [
            { required: true, message: '负责人工号不能为空', trigger: 'blur' }
          ],
          personTel: [
            { required: true, message: '负责人电话不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      init (id) {
        this.dataForm.storeId = id || 0
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
        if (this.dataForm.storeId) {
          this.$http({
            url: this.$http.adornUrl(`/store/stores/info/${this.dataForm.storeId}`),
            method: 'get',
            params: this.$http.adornParams()
          }).then(({data}) => {
            if (data && data.code === 0) {
            this.dataForm.storename = data.store.storename
            this.dataForm.storevolume = data.store.storevolume
            this.dataForm.storeaddr = data.store.storeaddr
            this.dataForm.dutyPerson = data.store.dutyPerson
            this.dataForm.personNo = data.store.personNo
            this.dataForm.personTel = data.store.personTel
            this.dataForm.type = data.store.type
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
              url: this.$http.adornUrl(`/store/stores/${!this.dataForm.storeId ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'storeId': this.dataForm.storeId || undefined,
                'storename': this.dataForm.storename,
                'storevolume': this.dataForm.storevolume,
                'storeaddr': this.dataForm.storeaddr,
                'dutyPerson': this.dataForm.dutyPerson,
                'type': this.dataForm.type,
                'personNo': this.dataForm.personNo,
                'personTel': this.dataForm.personTel
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
